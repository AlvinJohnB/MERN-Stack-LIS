import express from 'express';
import multer from 'multer';

import userSignUp from '../controller/SignUp.js';
import userSignIn from '../controller/userSignin.js';

const AuthRouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage,
});

AuthRouter.post('/', userSignIn);
AuthRouter.post('/signup', userSignUp);

export default AuthRouter;
