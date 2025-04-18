import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import Connect from './connection/connect.js'; // Import the Connect function
import Router from './Routes/Router.js';
import setupSwagger from './swaggerConfig.js';
import path from 'path'; // Import path module

const app = express();
// Setup Swagger documentation
setupSwagger(app);
// Initialize MongoDB connection
Connect();

app.use(morgan('combined'));
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/auth', Router.SigninRouter); 
app.use('/patient', Router.PatientRouter);
app.use('/test', Router.TestRouter);
app.use('/order', Router.OrderRouter);

app.use('/uploads', express.static(path.resolve('uploads')));

export default app; 
