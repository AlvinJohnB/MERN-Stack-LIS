import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import axios from 'axios';
import { useParams } from 'react-router-dom';


export default function PtAddOrder() {

    const [isLoading, setIsLoading] = useState(true);
    const [ptData, setPtData] = useState({});
    const [tests, setTests] = useState([]);
    const [labTestInput, setLabTestInput] = useState('');
    const [remarks, setRemarks] = useState('');
    const [show, setShow] = useState(false);
    const [totalCost, setTotalCost] = useState(0);
    const [isDiscounted, setIsDiscounted] = useState(false);

    const { pId } = useParams();

    const initialValues = {
        reqDr: '',
        ptType: '',
        testsRequested: labTestInput,
        remarks: '',
      };
    
    const validationSchema = Yup.object().shape({
    reqDr: Yup.string().required('Requesting Physician is required'),
    ptType: Yup.string().required('Patient Type is required'),
    });

    const onSubmit = (values) => {
        const formData = {
            ...values,
            testsRequested: tests.map(test => test.testName).join(', '),
            remarks: remarks,
        };
        console.log('Form Data:', formData);
        // Add your form submission logic here
    };

  return (
    <div className="container-fluid mt-4">
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
              <Field name="reqDr" className="form-control" placeholder="Requesting Physician" />
              <ErrorMessage name="reqDr" component="span" className="badge text-bg-warning" />
            </div>
            <div className="col-md-4">
              <label>Patient Type:</label>
              <Field name="ptType" className="form-control" placeholder="OPD / Room No." />
              <ErrorMessage name="ptType" component="span"  className="badge text-bg-warning" />
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
            <table className="table">
              <thead>
                <tr>
                  <th>Requested Test/s</th>
                  <th>Cost</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* {tests.map((test, index) => (
                  <Testrow key={index} test={test} tests={tests} setTests={setTests} />
                ))} */}
                <tr>
                  <td  style={{ cursor: 'pointer' }}>
                    Click here to add Test
                  </td>
                  <td>Total: PHP {totalCost}</td>
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

        {/* <Addordermodal
            show={show}
            setShow={setShow}
            tests={tests}
            setTests={setTests}
            setLabTestInput={setLabTestInput}
            setTotalCost={setTotalCost}
        /> */}
    </div>
  )
}
