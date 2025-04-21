import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function PtReg() {
  const navigate = useNavigate();
  const [ptId] = useState(``); // Example patient ID
  const [patientAge, setPatientAge] = useState(0);

  const initialValues = {
    lastname: '',
    firstname: '',
    middlename: '',
    bday: '',
    age: patientAge,
    gender: '',
    address: '',
    phone: '',
    idenno: '',
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
    values.age = patientAge;

    try {
      const response = await axios.post('http://localhost:5000/patient/create', values, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if(response.data.errormessage) {
        alert(response.data.errormessage);
      } else {
        // console.log(response.data)
        navigate(`/pt-add-order/${response.data.patient._id}`);
      }
    } catch (error) {
      alert('Failed to register patient. Please try again.');
    }
    // Add your form submission logic here
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
                value={ptId}
                disabled={true}
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
                value={patientAge}
                disabled={true}
              />
            </div>

            <div className="col-md-2">
              <label htmlFor="gender">Gender:</label>
              <Field id="form-field" as="select" className="form-select" name="gender">
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

          <button className="btn btn-success col-md-2 my-3" type="submit">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}