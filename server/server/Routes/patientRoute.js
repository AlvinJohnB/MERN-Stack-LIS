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
                res.json({ message: 'Patient created successfully', patient: newPatient });
            } catch (error) {
                next(error);
            }
                    
                
        }catch (error) {
            res.status(500).json({ error: 'Error creating patient' });
        }
        });


    PatientRouter.post('/search', async (req, res) => {
        const { lastname, firstname } = req.body;
      
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

    PatientRouter.get('/details/:id', async (req, res) => {
        const { id } = req.params;
    
        try {
        const patient = await Model.PatientModel.findOne({ _id: id });
    
        if (!patient) {
            return res.json({ message: 'Patient not found' });
        }
    
        res.json(patient);
        } catch (error) {
        res.status(500).json({ error: 'Error fetching patient details' });
        }
    });

    PatientRouter.put('/edit/:id', async (req, res) => {
        const { id } = req.params;
        const { lastname, firstname, middlename, bday, age, gender, address, phone, idenno } = req.body;
      
        try {
          // Find the existing patient
          const existingPatient = await Model.PatientModel.findById(id);
      
          if (!existingPatient) {
            return res.json({ errormessage: 'Patient not found' });
          }
      
          // Check if there are changes
          const isChanged =
            existingPatient.lastname !== lastname ||
            existingPatient.firstname !== firstname ||
            existingPatient.middlename !== middlename ||
            existingPatient.bday !== bday ||
            existingPatient.age !== age ||
            existingPatient.gender !== gender ||
            existingPatient.address !== address ||
            existingPatient.phone !== phone ||
            existingPatient.idenno !== idenno;
      
          if (!isChanged) {
            return res.json({ message: 'No changes detected, proceeding' });
          }
      
          // Update the patient if changes are detected
          const updatedPatient = await Model.PatientModel.findByIdAndUpdate(
            id,
            { lastname, firstname, middlename, bday, age, gender, address, phone, idenno },
            { new: true } // Return the updated document
          );
      
          res.json({ message: 'Patient updated successfully', patient: updatedPatient });
        } catch (error) {
          res.status(500).json({ error: 'Error updating patient details' });
        }
      });
    
    
    // AuthRouter.post('/add-multiple-products', addMultipleProducts);
    // AuthRouter.get('/fetch-products', fetchProducts);
    // AuthRouter.post('/add-category', addCategory);
    // AuthRouter.get('/fetch-category', fetchCategories);

    


export default PatientRouter;
