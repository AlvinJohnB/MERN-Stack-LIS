import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import TestsModal from './modals/TestsModal';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


export default function PtAddOrder() {

  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const [user, setUser] = useState({});
  const [ptData, setPtData] = useState(null); // Initialize as null
  const [testmodalShown, setTestModalShown] = useState(false);
  const [tests, setTests] = useState([]);
  const [testsCart, setTestsCart] = useState([]);
  const [remarks, setRemarks] = useState('');
  const [totalCost, setTotalCost] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isDiscounted, setIsDiscounted] = useState(false);



  useEffect(() => {
    const token = Cookies.get('session'); // Retrieve the session cookie
    if (token) {
      const decoded = jwtDecode(token); // Decode the JWT token
      setUser(decoded);
    }
  },[])


  const { id } = useParams();

  useEffect(() => {

  
    const fetchData = async () => {
      
    // API Call PtData       
    try{
        await axios.get(`${apiUrl}/patient/details/${id}`) // Use id instead of pId
        .then((response) => {
            if(response.data.errormessage) {
                alert(response.data.errormessage);
            } else {
              if(response.data.idenno){
                setIsDiscounted(true);
              }
                
                setPtData(response.data);
            }
            // setIsLoading(false);
        });
    } catch (error) {
        alert('Failed to fetch patient details. Please try again.');
    }

    try{
        axios.get(`${apiUrl}/test/all`) // Use id instead of pId
        .then((response) => {
            if(response.data) {
              setTests(response.data);
            }
        });
    } catch (error) {
        alert('Failed to fetch tests. Please try again.');
    }
              
     
      // Simulate fetching patient data
      setTimeout(() => {
        
        setIsLoading(false); // Set loading to false after data is fetched
        
      }, 1000); // Simulate a 1-second delay
      
    };

    fetchData();
  }, [id]);

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
    if (!testsCart.some((t) => t._id === test._id)) {
      setTestsCart([...testsCart, test]);
      setTestModalShown(false); // Close the modal after adding the test
    }else{
      alert('Test already added!');
    }
  };

  // Autocompute total cost whenever testsCart changes
  useEffect(() => {
    const computeTotalCost = () => {
      if(isDiscounted){
        const total = testsCart.reduce((sum, test) => sum + test.discounted_price, 0);
        setTotalCost(total);
      }else{
        const total = testsCart.reduce((sum, test) => sum + test.price, 0);
        setTotalCost(total);
      }
    };
    computeTotalCost();
  }, [testsCart]);

  const onSubmit = async (values) => {

    setIsLoading(true); // Set loading to true when submitting the form

    const formData = {
      ...values,
      testsRequested: testsCart,
      // testsRequested: testsCart.map((test) => test.testName).join(', '),
      remarks: remarks,
    };
    console.log('Form Data:', formData);
    // Add your form submission logic here
    try{
      
      await axios.post(`${apiUrl}/order/add-order/${id}/${isDiscounted}/${user._id}`, formData)
      .then((response) => {
        if(response.data.errormessage) {
          alert(response.data.errormessage);
        } else {

          setTimeout(() => {
        
            setIsLoading(false); // Set loading to false after data is fetched
            navigate(`/orders`); // Redirect to the order page after submission

          }, 2000); // Simulate a 2-second delay
         
        }
      });
    } catch (error) {
      alert('Failed to submit order. Please try again.');
    }
    
      
   
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
              <input type="text" className="form-control" value={ptData.pid} disabled />
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
                    <td>{test.name}</td>
                    <td>PHP {isDiscounted ? test.discounted_price : test.price}</td>
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