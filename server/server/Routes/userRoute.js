import express from 'express';
import multer from 'multer';
import Model from '../Models/Model.js'; // Assuming you have a UserModel in your Models
import userSignUp from '../controller/SignUp.js';
import userSignIn from '../controller/userSignin.js';

const AuthRouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage,
});

AuthRouter.post('/', userSignIn);
AuthRouter.post('/signup', userSignUp);

// Get all users
AuthRouter.get('/get-all-users', async (req, res) => {
  try {
    const users = await Model.UserModel.find({});
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.json({ message: 'Internal server error' });
  }
});

export default AuthRouter;
