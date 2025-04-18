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


export default TestRouter;
