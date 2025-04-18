import express from 'express';
import Model from '../Models/Model.js';


const PatientRouter = express.Router();

    PatientRouter.post('/create', async (req, res, next) => {
        const { lastname, firstname, middlename, bday, age, gender, address, phone, idenno } = req.body;
        try {

            try {
                const existingPatient = await Model.PatientModel.findOne({ lastname: lastname, firstname: firstname, middlename: middlename, bday: bday, age: age });
                if (existingPatient) {
                    return res.json({ errormessage: 'Patient with the same details already exists.' });
                }
                // create PatientID
                const prefix = `LAB-`;
                const lastPatient = await Model.PatientModel.findOne({ pid: { $regex: `^${prefix}` } }).sort({ createdAt: -1 });
                let patientID = `${prefix}0001`;
                if (lastPatient && lastPatient.pid) {
                    const lastPatientNumber = parseInt(lastPatient.pid.slice(4), 10);
                    patientID = `${prefix}${(lastPatientNumber + 1).toString().padStart(4, '0')}`;
                }
                // Create a new patient
                const newPatient = new Model.PatientModel({
                    pid: patientID,
                    lastname,
                    firstname,
                    middlename,
                    bday,
                    age,
                    gender,
                    address,
                    phone,
                    idenno,
                });

                await newPatient.save();
                res.status(201).json({ message: 'Patient created successfully' });
            } catch (error) {
                next(error);
            }
                    
                
        }catch (error) {
            res.status(500).json({ error: 'Error creating patient' });
        }
        });


    PatientRouter.get('/search', async (req, res) => {
        const { lastname, firstname } = req.query;
      
        try {
          const patients = await Model.PatientModel.find({
            lastname: { $regex: new RegExp(lastname, 'i') }, // Case-insensitive search
            firstname: { $regex: new RegExp(firstname, 'i') }, // Case-insensitive search
          });
      
          if (patients.length === 0) {
            return res.json({ errormessage: 'No patients found with the given details.' });
          }
      
          res.json(patients);
        } catch (error) {
          res.status(500).json({ error: 'Error searching for patients' });
        }
      });

    
    
    // AuthRouter.post('/add-multiple-products', addMultipleProducts);

    // AuthRouter.get('/fetch-products', fetchProducts);
    // AuthRouter.post('/add-category', addCategory);
    // AuthRouter.get('/fetch-category', fetchCategories);

    


export default PatientRouter;
