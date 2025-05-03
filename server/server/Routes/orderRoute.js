import express from 'express';
import Model from '../Models/Model.js'; // Assuming you have an OrderModel and ProductModel in your Models


const OrderRouter = express.Router();

// Add order
OrderRouter.post('/add-order/:pid/:isDisc/:encoder/', async (req, res, next) => {
  const { testsRequested, reqDr, remarks, ptType } = req.body;
  const { pid, isDisc, encoder } = req.params;


  
  if (!testsRequested || testsRequested.length === 0) {
    return res.status(400).json({ message: 'No items in the order.' });
  }

  try {
    // Validate product IDs and check stock
    const testIds = testsRequested.map((item) => item._id);
    const tests = await Model.TestModel.find({ _id: { $in: testIds } });

    if (tests.length !== testsRequested.length) {
      return res.status(400).json({ message: 'Some products are invalid or not found.' });
    }

    // Generate a unique order ID starting from 0001
    const currentYear = new Date().getFullYear();
    const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, '0');
    const prefix = `${currentYear}${currentMonth}`;

    const lastOrder = await Model.OrderModel.findOne({ labnumber: { $regex: `^${prefix}` } }).sort({ createdAt: -1 });
    let orderID = `${prefix}0001`;
    if (lastOrder && lastOrder.labnumber) {
      const lastOrderNumber = parseInt(lastOrder.labnumber.slice(6), 10);
      orderID = `${prefix}${(lastOrderNumber + 1).toString().padStart(4, '0')}`;
    }

    // Compute Total Per Section
    const computeSectionTotals = (testsRequested, isDiscounted) => {
      const sectionTotals = {
        Chemistry: 0,
        Hematology: 0,
        Serology: 0,
        CM: 0,
      };
    console.log(isDiscounted)
      testsRequested.forEach((test) => {
        const price = isDiscounted === true ? test.discounted_price : test.price;
        if (sectionTotals.hasOwnProperty(test.section)) {
          sectionTotals[test.section] += price;
        }
      });
    
      return sectionTotals;
    };

    const sectionTotals = computeSectionTotals(testsRequested, isDisc);

    // Group tests by section
    const groupTestsBySection = async (testsRequested) => {
      const sections = {};

      for (const test of testsRequested) {

        if (!sections[test.section]) {
          sections[test.section] = [];
        }

        if (test.package) {
          // find in packages schema
          const profile = await Model.PackageModel.findOne({ name: test.testcode }).populate('tests.test');
 
          if (profile && profile.tests.length > 0) {
            profile.tests.forEach((test) => {
              if (!sections[test.test.section]) {
                sections[test.test.section] = [];
              }
              sections[test.test.section].push({
                test: test.test._id,
              });
            });
          }
        }else{
          sections[test.section].push({
            test: test._id,
          });

        }
        
      }
      
      return sections;
    };

    const groupedSections = await groupTestsBySection(testsRequested);
    
    // console.log('Grouped Sections:', groupedSections);
    
    


    // Create a new order
    const newOrder = new Model.OrderModel({
      labnumber: orderID,
      tests: testsRequested.map((item) => ({
        test: item._id,
      })),
      patient: pid,
      patient_type: ptType,
      requesting_physician: reqDr,
      isDiscounted: isDisc,
      total: Object.values(sectionTotals).reduce((sum, value) => sum + value, 0), // Total cost
      encoded_by: encoder,
      status: 'PENDING',
      cm_total: sectionTotals.CM,
      sero_total: sectionTotals.Serology,
      chemistry_total: sectionTotals.Chemistry,
      hematology_total: sectionTotals.Hematology,
      createdAt: new Date(),
    });
    

    const savedOrder = await newOrder.save();

    // Create Section Orders
    for (const [section, tests] of Object.entries(groupedSections)) {
      const newSectionOrder = new Model.SectionOrderModel({
        labnumber: savedOrder._id,
        patient: pid,
        section,
        tests: tests,
      });

      await newSectionOrder.save();
    }
    
    // Save order notes
    if (remarks) {
      const newOrderNote = new Model.OrderNoteModel({
        order: savedOrder._id,
        note: remarks,
        createdBy: encoder, // Assuming encoder is the user ID
      });

      await newOrderNote.save();
    }

    res.status(201).json({ message: 'Order added successfully.', order: savedOrder });

  } catch (error) {
    console.error('Error adding order to queue:', error);
    next(error);
  }
});

// Route to fetch all orders
OrderRouter.get('/all-orders', async (req, res) => {
  try {
    // Fetch all orders and optionally populate related fields
    const orders = await Model.OrderModel.find()
      .populate('tests.test') // Populate test details
      .populate('patient', 'firstname lastname middlename pid') // Populate patient details
      .sort({ createdAt: -1 }); // Sort by creation date (most recent first)

    res.json({ message: 'Orders fetched successfully.', orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.json({ error: 'Error fetching orders.' });
  }
});

//fetch section orders
OrderRouter.get('/section-orders/:section', async (req, res) => {
  const { section } = req.params;
  if (!section) {
    return res.status(400).json({ message: 'Section is required.' });
  }
  try {
    // Fetch all orders and optionally populate related fields
    const orders = await Model.SectionOrderModel.find({ section })
      .populate('tests') // Populate test details
      .populate('tests.test', 'testcode testname show options unit reference_value_male reference_value_female') // Populate test details
      .populate('patient', 'firstname lastname middlename pid') // Populate patient details
      .populate({
        path: 'labnumber',
        populate: {
          path: 'tests.test',
          select: 'testcode testname section', // Populate labnumber.tests.test details
        },
      }) // Populate labnumber and its tests
      .sort({ createdAt: -1 }); // Sort by creation date (most recent first)

    res.json({ message: 'Section orders fetched successfully.', orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.json({ error: 'Error fetching orders.' });
  }
});


// fetch section orders by id
OrderRouter.get('/section-orders/:section_orderid/:section', async (req, res) => {
  const { section, section_orderid } = req.params;
  if (!section) {
    return res.status(400).json({ message: 'Section is required.' });
  }
  if (!section_orderid) {
    return res.status(400).json({ message: 'Section order ID is required.' });
  }
  try {
    // Fetch all orders and optionally populate related fields
    const orders = await Model.SectionOrderModel.findOne({ _id: section_orderid, section: section })
      .populate('tests') // Populate test details
      .populate('tests.test', 'testcode name show package options unit reference_value_male reference_value_female') // Populate test details
      .populate('patient', 'firstname lastname middlename pid age gender') // Populate patient details
      .populate({
        path: 'labnumber',
        populate: {
          path: 'tests.test',
          select: 'testcode testname section', // Populate labnumber.tests.test details
        },
      }) // Populate labnumber and its tests
      .sort({ createdAt: -1 }); // Sort by creation date (most recent first)

    res.json({ message: 'Section orders fetched successfully.', orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.json({ error: 'Error fetching orders.' });
  }
});


OrderRouter.get('/get-order-notes/:orderid', async (req, res) => {
  const { orderid } = req.params;
  if (!orderid) {
    return res.status(400).json({ message: 'Order ID is required.' });
  }
  try {
    // Fetch all orders and optionally populate related fields
    const notes = await Model.OrderNoteModel.find({ order: orderid })
      .populate('created_by') // Populate user details
      .sort({ createdAt: -1 }); // Sort by creation date (most recent first)

    res.json({ message: 'Order notes fetched successfully.', notes });
  } catch (error) {
    console.error('Error fetching order notes:', error);
    res.json({ error: 'Error fetching order notes.' });
  }

})






// Edit section-order
  OrderRouter.put('/edit-order/:id/:status', async (req, res) => {
      const { id, status } = req.params;
      const { global_comments, performed_by, released_by, pathologist} = req.body;
    
      try {
        // Find the existing order
        const existingOrder = await Model.SectionOrderModel.findById(id);
    
        if (!existingOrder) {
          return res.json({ errormessage: 'Order not found' });
        }
    
        // Check if there are changes
        const isChanged =
          existingOrder.global_comments !== global_comments ||
          existingOrder.performed_by !== performed_by ||
          existingOrder.released_by !== released_by ||
          existingOrder.pathologist !== pathologist ||
          existingOrder.status !== status;
    
        if (!isChanged) {
          return res.json({ message: 'No changes detected, proceeding' });
        }

        const updateData = {
          global_comments,
          released_by,
          pathologist,
          status,
        };

        // Handle performed_by: delete the field if it's an empty string
        if (performed_by === '' || performed_by === undefined) {
          updateData.$unset = { performed_by: '' }; // Use $unset to remove the field
        } else {
          updateData.performed_by = performed_by;
        }

        // Handle released_by: delete the field if it's an empty string
        if (released_by === '' || released_by === undefined) {
          updateData.$unset = { released_by: '' }; // Use $unset to remove the field
        } else {
          updateData.released_by = released_by;
        }
    
        if (pathologist === '' || pathologist === undefined) {
          updateData.$unset = { pathologist: '' };
        } else {
          updateData.pathologist = pathologist;
        }
    
        // Update the order if changes are detected
        const updatedOrder = await Model.SectionOrderModel.findByIdAndUpdate(
          id,
          updateData,
          { new: true } // Return the updated document
        );
    
        res.json({ message: 'Test updated successfully', order: updatedOrder });
      } catch (error) {
        console.error('Error updating order details:', error);
        res.json({ error: 'Error updating order details' });
      }
    });


export default OrderRouter;