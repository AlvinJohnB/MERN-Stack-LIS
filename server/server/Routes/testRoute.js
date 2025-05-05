import express from 'express';
import Model from '../Models/Model.js';
import mongoose from 'mongoose';

const TestRouter = express.Router();

// Route to fetch all tests
TestRouter.get('/all', async (req, res) => {
    try {
      const tests = await Model.TestModel.find(); // Fetch all tests from the database
      res.json(tests);
    } catch (error) {
      res.json({ error: 'Error fetching tests' });
    }
  });

// Route to fetch all tests
TestRouter.post('/get-test/:id', async (req, res) => {
  const { id } = req.params
  console.log(id)
  try {
    const test = await Model.TestModel.findOne({ _id: id }); // Fetch all tests from the database
    res.json(test);
  } catch (error) {
    res.json({ error: 'Error fetching tests' });
  }
});


  // Route to add a new test
TestRouter.post('/add-test', async (req, res) => {
  const { testcode, name, price, discounted_price, options, isprofile, show, reference_value_male, reference_value_female, unit, section } = req.body;

  try {
      // Check if a test with the same testcode already exists
      const existingTest = await Model.TestModel.findOne({ testcode, name: name });
      if (existingTest) {
          return res.json({ errormessage: 'Test with this code already exists.' });
      }

      // Create a new test
      const newTest = new Model.TestModel({
          testcode,
          name: name,
          price,
          discounted_price,
          options,
          show: show === null ? false : true,
          package: isprofile === null ? false : true,
          reference_value_male,
          reference_value_female,
          unit,
          section,
          isquali: options? true : false
      });

      const savedTest = await newTest.save();
      res.json({ message: 'Test added successfully.', test: savedTest });
  } catch (error) {
      console.error('Error adding test:', error);
      res.status(500).json({ errormessage: 'Error adding test.' });
  }
});

// Route to update a test
TestRouter.put('/update-test/:id', async (req, res) => {
  const { id } = req.params;
  const {
    testcode,
    name,
    price,
    discounted_price,
    isprofile,
    options,
    show,
    reference_value_male,
    reference_value_female,
    unit,
    section,
  } = req.body;

  console.log(show)

  try {
    // Find the test by ID
    const existingTest = await Model.TestModel.findById(id);

    if (!existingTest) {
      return res.json({ errormessage: 'Test not found.' });
    }

    // Update the test fields
    existingTest.testcode = testcode || existingTest.testcode;
    existingTest.name = name || existingTest.name;
    existingTest.price = price || existingTest.price;
    existingTest.discounted_price = discounted_price || existingTest.discounted_price;
    existingTest.options = options || existingTest.options;
    existingTest.show = !show ? false : true,
    existingTest.package = !isprofile ? false : true,
    existingTest.reference_value_male = reference_value_male || existingTest.reference_value_male;
    existingTest.reference_value_female = reference_value_female || existingTest.reference_value_female;
    existingTest.unit = unit || existingTest.unit;
    existingTest.section = section || existingTest.section;
    existingTest.isquali = options ? true : false;

    // Save the updated test
    const updatedTest = await existingTest.save();
    res.status(200).json({ message: 'Test updated successfully.', test: updatedTest });
  } catch (error) {
    console.error('Error updating test:', error);
    res.status(500).json({ error: 'Error updating test.' });
  }
});




  TestRouter.post('/create-package', async (req, res) => {
    const { name, tests } = req.body;
  
    // Validate required fields
    if (!name || !tests || tests.length === 0) {
      return res.status(400).json({ message: 'Name and tests are required.' });
    }
  
    try {
      // Extract test codes from the request
      const testcodes = tests.map((test) => test.testcode);
  
      // Find tests in the database using the test codes
      const validTests = await Model.TestModel.find({ testcode: { $in: testcodes } });
  
      // Check if all test codes are valid
      if (validTests.length !== tests.length) {
        return res.status(400).json({ message: 'Some tests are invalid or not found.' });
      }
  
      // Sort validTests to match the order of testcodes in the request
      const sortedTests = testcodes.map((testcode) =>
        validTests.find((test) => test.testcode === testcode)
      );
  
      // Create the package
      const newPackage = new Model.PackageModel({
        name,
        tests: sortedTests.map((test) => ({test: test._id})), // Include the mapped test details
      });
  
      const savedPackage = await newPackage.save();
      res.status(201).json({ message: 'Package created successfully.', package: savedPackage });
    } catch (error) {
      console.error('Error creating package:', error);
      res.status(500).json({ error: 'Error creating package.' });
    }
  });

  
  // Route to fetch all packages
TestRouter.get('/packages/fetch-all', async (req, res) => {
  try {
    const packages = await Model.PackageModel.find().populate('tests.test'); // Fetch all tests from the database
    res.json(packages);
  } catch (error) {
    res.json({ error: 'Error fetching packages' });
  }
});
  
  TestRouter.get('/package/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the package by ID and populate the tests field
      const packageData = await Model.PackageModel.findById(id).populate('tests.test');
  
      if (!packageData) {
        return res.json({ errormessage: 'Package not found.' });
      }
  
      res.json({ message: 'Package fetched successfully.', package: packageData });
    } catch (error) {
      console.error('Error fetching package:', error);
      res.json({ errormessage: 'Error fetching package.' });
    }
  });




  // Results
  TestRouter.put('/update-test-result/', async (req, res) => {
    const {id, result} = req.body;
   
    const newResult = result;
    const nestedID = new mongoose.Types.ObjectId(id);
  
    try {
      // Find the test by ID
      const existingTest = await Model.SectionOrderModel.findOne({'tests._id': nestedID });
      if (!existingTest) {
        return res.json({ errormessage: 'Test result not found.' });
      }

      const updatedResult = await Model.SectionOrderModel.updateOne( 
        {'tests._id': nestedID },
        { $set: { 'tests.$[elem].result': newResult } },
        { arrayFilters: [{ 'elem._id': nestedID }] }
      )
    
      res.json(updatedResult)

    } catch (error) {
      console.error('Error updating result:', error);
      res.status(500).json({ error: 'Error updating test.' });
    }
  });

  TestRouter.put('/update-test-comment/', async (req, res) => {
    const {id, comment} = req.body;
   
    const newComment = comment;
    const nestedID = new mongoose.Types.ObjectId(id);
  
    try {
      // Find the test by ID
      const existingTest = await Model.SectionOrderModel.findOne({'tests._id': nestedID });
      if (!existingTest) {
        return res.json({ errormessage: 'Test result not found.' });
      }

      const updateComment = await Model.SectionOrderModel.updateOne( 
        {'tests._id': nestedID },
        { $set: { 'tests.$[elem].test_comment': newComment } },
        { arrayFilters: [{ 'elem._id': nestedID }] }
      )
    
      res.json(updateComment)

    } catch (error) {
      console.error('Error updating result:', error);
      res.status(500).json({ error: 'Error updating test.' });
    }
  });


  // Comment List

// Create comment
TestRouter.post('/create-comment', async (req, res) => {
  const { comment_code, comment } = req.body;

  if (!comment_code || !comment) {
    return res.json({ errormessage: 'Comment code and actual comment is required' });
  }

  try {
    const existingComment = await Model.CommentListModel.findOne({ comment_code });
    if (existingComment) {
      return res.json({ errormessage: 'Comment code exists' });
    }

    const newComment = new Model.CommentListModel({ comment_code, comment });
    const savedComment = await newComment.save();
    res.json({ message: 'Comment created successfully.', comment: savedComment });
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Error creating comment.' });
  }
});

// Fetch all comments
TestRouter.get('/comments/fetch-all', async (req, res) => {
  try {
    const comments = await Model.CommentListModel.find();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching comments.' });
  }
});

// Update comment by ID
TestRouter.put('/comment/update/:id', async (req, res) => {
  const { comment_code, comment } = req.body;

  try {
    const updated = await Model.CommentListModel.findByIdAndUpdate(
      req.params.id,
      { comment_code, comment },
      { new: true }
    );

    if (!updated) {
      return res.json({ errormessage: 'Comment not found.' });
    }

    res.json({ message: 'Comment updated successfully.', comment: updated });
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ error: 'Error updating comment.' });
  }
});

// Delete comment by ID
TestRouter.delete('/comment/delete/:id', async (req, res) => {
  try {
    const deleted = await Model.CommentListModel.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ errormessage: 'Comment not found.' });
    }

    res.json({ message: 'Comment deleted successfully.' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ error: 'Error deleting comment.' });
  }
});
    

  




export default TestRouter;
