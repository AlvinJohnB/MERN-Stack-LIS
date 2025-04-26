import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';

export default function PatientDetails() {
  const { id } = useParams(); // Get the patient ID from the URL parameters
  const navigate = useNavigate(); // Initialize the history function
  const apiUrl = process.env.REACT_APP_API_URL;

  const [ptData, setPtData] = useState({}); // Initialize as null
  const [patientAge, setPatientAge] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Loading state


  useEffect(() => {
    const fetchPtData = async () => {
        try{
            setIsLoading(true);
            await axios.get(`${apiUrl}/patient/details/${id}`)
            .then((response) => {
                if(response.data.errormessage) {
                    alert(response.data.errormessage);
                } else {
                    setPtData(response.data);
                    setPatientAge(response.data.age); // Set the age from the fetched data
                    console.log(ptData)
                }
                setIsLoading(false);
            });
        } catch (error) {
            alert('Failed to fetch patient details. Please try again.');
        }
    };
    fetchPtData();
  }, [id])

  const initialValues = {
    branchid: ptData.pid, // Use the fetched patient ID
    lastname: ptData.lastname, // Use the fetched data or empty string
    firstname: ptData.firstname,
    middlename: ptData.middlename,
    bday: moment(ptData.bday).format('YYYY-MM-DD'), // Format the date to YYYY-MM-DD for the input field
    age: patientAge,
    gender: ptData.gender,
    address: ptData.address,
    phone: ptData.phone,
    idenno: ptData.idenno || '', // Use the fetched data or empty string
  };

  const validationSchema = Yup.object().shape({
    lastname: Yup.string().required('Lastname is required'),
    firstname: Yup.string().required('Firstname is required'),
    middlename: Yup.string(),
    bday: Yup.date().required('Birthdate is required'),
    gender: Yup.string().required('Gender is required'),
    address: Yup.string().required('Address is required'),
    phone: Yup.string().required('Phone number is required'),
    idenno: Yup.string(),
  });

  const onSubmit = async (values) => {
    // Set the age in the values object before sending it to the server
    computeAge();
    values.age = patientAge;

    try {
      const response = await axios.put(`${apiUrl}/patient/edit/${id}`, values, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if(response.data.errormessage) {
        alert(response.data.errormessage);
      } else {
        navigate(`/pt-add-order/${id}`); // Navigate to the orders page after successful registration
      }
    } catch (error) {
      alert('Failed to register patient. Please try again.');
    }


  };

  const computeAge = () => {
    const birthDate = new Date(ptData.bday);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      setPatientAge(age - 1);
    } else {
      setPatientAge(age);
    }
  };

  const getAge = (e) => {
    const birthDate = new Date(e.target.value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      setPatientAge(age - 1);
    } else {
      setPatientAge(age);
    }
  };

  useEffect(() => {
    getAge({ target: { value: initialValues.bday } });
  }, [initialValues.bday])

  const handlePrevButton = () => {
    navigate('/orders'); // Navigate to the previous page
  }

  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="success" size="lg" />
        <h5>Loading...</h5>
      </div>
    );
  }
  
  return (
    <div className="container-fluid mt-4">
      <Formik className='p-0 m-0' initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form>
          <h3>Patient Registration</h3>

          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="branchid">Patient ID:</label>
              <ErrorMessage name="branchid" component="span" />
              <Field
                name="branchid"
                id="form-field"
                type="text"
                className="form-control"
                value={ptData.pid} // Use the fetched patient ID
                disabled={true}
                required
              />
            </div>
          </div>

          <strong>Personal Information</strong>
          <div className="row mb-2">
            <div className="col-md-4">
              <label htmlFor="lastname">Lastname:</label>
              <Field
                autoComplete="off"
                id="form-field"
                name="lastname"
                placeholder="Lastname"
                className="form-control"
                required
               
              />
              <ErrorMessage name="lastname" component="span" className="badge text-bg-warning" />
            </div>

            <div className="col-md-4">
              <label htmlFor="firstname">Firstname:</label>
              <Field
                autoComplete="off"
                id="form-field"
                name="firstname"
                placeholder="Firstname"
                className="form-control"
                
              />
              <ErrorMessage name="firstname" component="span" className="badge text-bg-warning" />
            </div>

            <div className="col-md-4">
              <label htmlFor="middlename">Middlename:</label>
              <Field
                autoComplete="off"
                id="form-field"
                name="middlename"
                placeholder="Middlename"
                className="form-control"
              />
              <ErrorMessage name="middlename" component="span" className="badge text-bg-warning" />
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-md-4">
              <label htmlFor="bday">Birthdate:</label>
              <Field
                autoComplete="off"
                id="form-field"
                type="date"
                className="form-control"
                onBlur={getAge}
                name="bday"
                
              />
              <ErrorMessage name="bday" component="span" className="badge text-bg-warning" />
            </div>

            <div className="col-md-2">
              <label name="age">Age:</label>
              <Field
                id="form-field"
                className="form-control"
                name="age"
                type="number"
                disabled={true}
              />
            </div>

            <div className="col-md-2">
              <label htmlFor="gender">Gender:</label>
              <Field 
                id="form-field"
                as="select"
                className="form-select"
                name="gender"
                required
                >
                <option value="invalid">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Field> 
              <ErrorMessage name="gender" component="span" className="badge text-bg-warning" />
            </div>
          </div>

          <strong>Contact and Other Information</strong>
          <div className="row mb-2">
            <div className="col-md-4">
              <label htmlFor="address">Address:</label>
              <Field
                autoComplete="off"
                name="address"
                id="form-field"
                className="form-control"
                type="text"
                placeholder="Address"
                required
              />
              <ErrorMessage name="address" component="span" className="badge text-bg-warning" />
            </div>

            <div className="col-md-4">
              <label htmlFor="phone">Phone Number:</label>
              <Field
                autoComplete="off"
                id="form-field"
                name="phone"
                type="tel"
                placeholder="Phone number"
                className="form-control"
                required
              />
              <ErrorMessage name="phone" component="span" className="badge text-bg-warning"/>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <label htmlFor="idenno">Discount Identification Card No. (SC, PWD, etc.):</label>
              <Field
                autoComplete="off"
                id="form-field"
                name="idenno"
                className="form-control"
                placeholder="ID Number"
              />
            </div>
          </div>

          <button className="btn btn-sm btn-success col-md-3 my-3 mx-2" type="submit">
            Update and Proceed
          </button>


          <button type="button" onClick={handlePrevButton} className="btn btn-primary btn-sm col-md-3 my-3 mx-2">
            Show Previous Transactions
           </button>

          
        </Form>
      </Formik>

     

    </div>
  );
}