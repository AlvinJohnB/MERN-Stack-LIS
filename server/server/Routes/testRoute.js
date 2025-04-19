import express from 'express';
import Model from '../Models/Model.js';


const TestRouter = express.Router();

// Route to fetch all tests
TestRouter.get('/all', async (req, res) => {
    try {
      const tests = await Model.TestModel.find(); // Fetch all tests from the database
      res.json(tests);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching tests' });
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
  
      // Map valid tests to include only necessary fields
   
  
      // Create the package
      const newPackage = new Model.PackageModel({
        name,
        tests: validTests.map((test) => ({ _id: test._id })), // Include the mapped test details
      });
  
      const savedPackage = await newPackage.save();
      res.status(201).json({ message: 'Package created successfully.', package: savedPackage });
    } catch (error) {
      console.error('Error creating package:', error);
      res.status(500).json({ error: 'Error creating package.' });
    }
  });

  
  TestRouter.get('/package/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the package by ID and populate the tests field
      const packageData = await Model.PackageModel.findById(id).populate('tests');
  
      if (!packageData) {
        return res.status(404).json({ message: 'Package not found.' });
      }
  
      res.status(200).json({ message: 'Package fetched successfully.', package: packageData });
    } catch (error) {
      console.error('Error fetching package:', error);
      res.status(500).json({ error: 'Error fetching package.' });
    }
  });



export default TestRouter;
