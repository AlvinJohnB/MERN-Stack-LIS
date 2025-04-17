import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import TestsModal from './modals/TestsModal';
import Spinner from 'react-bootstrap/Spinner';


export default function PtAddOrder() {
  const [ptData, setPtData] = useState(null); // Initialize as null
  const [testmodalShown, setTestModalShown] = useState(false);
  const [tests, setTests] = useState([]);
  const [testsCart, setTestsCart] = useState([]);
  const [remarks, setRemarks] = useState('');
  const [totalCost, setTotalCost] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Loading state


  const { pId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      // Simulate fetching patient data
      setTimeout(() => {
        setTests([
          {
            "id": 1,
            "testCode": "CBC",
            "testName": "Complete Blood Count",
            "cost": 500,
            "section": "Hematology"
          },
          {
            "id": 2,
            "testCode": "FBS",
            "testName": "Fasting Blood Sugar",
            "cost": 300,
            "section": "Chemistry"
          },
          {
            "id": 3,
            "testCode": "LFT",
            "testName": "Liver Function Test",
            "cost": 700,
            "section": "Chemistry"
          },
          {
            "id": 4,
            "testCode": "KFT",
            "testName": "Kidney Function Test",
            "cost": 800,
            "section": "Chemistry"
          },
          {
            "id": 5,
            "testCode": "LIP",
            "testName": "Lipid Profile",
            "cost": 600,
            "section": "Chemistry"
          },
          {
            "id": 6,
            "testCode": "TSH",
            "testName": "Thyroid Stimulating Hormone",
            "cost": 400,
            "section": "Endocrinology"
          },
          {
            "id": 7,
            "testCode": "CRP",
            "testName": "C-Reactive Protein",
            "cost": 450,
            "section": "Immunology"
          },
          {
            "id": 8,
            "testCode": "D-DIMER",
            "testName": "D-Dimer Test",
            "cost": 1000,
            "section": "Coagulation"
          },
          {
            "id": 9,
            "testCode": "PT",
            "testName": "Prothrombin Time",
            "cost": 550,
            "section": "Coagulation"
          },
          {
            "id": 10,
            "testCode": "ESR",
            "testName": "Erythrocyte Sedimentation Rate",
            "cost": 350,
            "section": "Hematology"
          }
        ]);
        setPtData({
          branchid: 'PT12345',
          lastname: 'Doe',
          firstname: 'John',
          middlename: 'A.',
          gender: 'Male',
          age: 30,
        });
        
        setIsLoading(false); // Set loading to false after data is fetched
        
      }, 1000); // Simulate a 1-second delay
      
    };

    fetchData();
  }, [pId]);

  const initialValues = {
    reqDr: '',
    ptType: '',
    testsRequested: testsCart,
    remarks: '',
  };

  const validationSchema = Yup.object().shape({
    reqDr: Yup.string().required('Requesting Physician is required'),
    ptType: Yup.string().required('Patient Type is required'),
  });

  const handleAddTest = (test) => {
    if (!testsCart.some((t) => t.id === test.id)) {
      setTestsCart([...testsCart, test]);
      setTestModalShown(false); // Close the modal after adding the test
    }else{
      alert('Test already added!');
    }
  };

  // Autocompute total cost whenever testsCart changes
  useEffect(() => {
    const computeTotalCost = () => {
      const total = testsCart.reduce((sum, test) => sum + test.cost, 0);
      setTotalCost(total);
    };

    computeTotalCost();
  }, [testsCart]);

  const onSubmit = (values) => {
    const formData = {
      ...values,
      testsRequested: testsCart.map((test) => test.testName).join(', '),
      remarks: remarks,
    };
    console.log('Form Data:', formData);
    // Add your form submission logic here
  };

  const handleTestModal = () => {
    setTestModalShown(!testmodalShown);
  };

  if (isLoading) {
    // Show a loading spinner or message while data is being fetched
    return (
    <div className="text-center mt-5">
      <Spinner animation="border" variant="success" size='lg' />
      <h5>Loading...</h5>
    </div>);
  }

  return (
    <div className="container-fluid my-4">
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        <Form>
          <h3>Add Patient Order</h3>
          <strong>Patient Information</strong>
          <div className="row">
            <div className="col-md-4">
              <label>Patient ID:</label>
              <input type="text" className="form-control" value={ptData.branchid} disabled />
            </div>
            <div className="col-md-4">
              <label>Lastname:</label>
              <input type="text" className="form-control" value={ptData.lastname} disabled />
            </div>
            <div className="col-md-4">
              <label>Firstname:</label>
              <input type="text" className="form-control" value={ptData.firstname} disabled />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-4">
              <label>Middlename:</label>
              <input type="text" className="form-control" value={ptData.middlename} disabled />
            </div>
            <div className="col-md-2">
              <label>Gender:</label>
              <input type="text" className="form-control" value={ptData.gender} disabled />
            </div>
            <div className="col-md-2">
              <label>Age:</label>
              <input type="text" className="form-control" value={ptData.age} disabled />
            </div>
          </div>

          <strong>Request Information</strong>
          <div className="row">
            <div className="col-md-4">
              <label>Requesting Physician:</label>
              <Field
                name="reqDr"
                className="form-control"
                placeholder="Requesting Physician"
              />
              <ErrorMessage name="reqDr" component="span" className="badge text-bg-warning" />
            </div>
            <div className="col-md-4">
              <label>Patient Type:</label>
              <Field
                name="ptType"
                className="form-control border"
                placeholder="OPD / Room No."
              />
              <ErrorMessage name="ptType" component="span" className="badge text-bg-warning" />
            </div>
          </div>

          <strong>Remarks</strong>
          <div className="row">
            <div className="col-md-6">
              <textarea
                className="form-control"
                placeholder="Remarks (e.g., Last Meal, Diagnosis)"
                onBlur={(e) => setRemarks(e.target.value)}
              />
            </div>
          </div>

          <div className="d-flex justify-content-center mt-4">
            <table className="table table-sm table-hover">
              <thead className="table-secondary">
                <tr>
                  <th className='text-center' style={{width: '65%'}}>Requested Test/s</th>
                  <th style={{width: '30%'}} >Cost</th>
                  <th className='text-center'>Action</th>
                </tr>
              </thead>
              <tbody>
                {testsCart.map((test, index) => (
                  <tr key={index}>
                    <td>{test.testName}</td>
                    <td>PHP {test.cost}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => setTestsCart(testsCart.filter((_, i) => i !== index))}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td style={{ cursor: 'pointer' }} onClick={() => handleTestModal()}>
                    Click here to add Test
                  </td>
                  <td><strong>Total: PHP {totalCost}</strong> </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

          <button type="submit" className="btn btn-success">
            Submit Order
          </button>
        </Form>
      </Formik>

      <TestsModal
        modalShown={testmodalShown}
        handleTestModal={handleTestModal}
        tests={tests}
        setTests={setTests}
        handleAddTest={handleAddTest}
      />
    </div>
  );
}