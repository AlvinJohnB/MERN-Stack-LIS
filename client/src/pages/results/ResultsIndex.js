import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { PDFViewer } from '@react-pdf/renderer';
import ResultForm from './ResultForm';
import ResultFormHalf from './ResultFormHalf';

export default function ResultsIndex() {
  const { id } = useParams(); // Get the patient ID from the URL parameters
  const navigate = useNavigate(); // Initialize the history function
  const [order, setOrder] = useState({});
  const [sectionOrders, setSectionOrders] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  const [isLoading, setIsLoading] = useState(true); // Loading state

  const fetchSectionOrders = async () => {
    try {
      setIsLoading(true);
      await axios.get(`${apiUrl}/order/s-order/${id}`).then((response) => {
        if (response.data.errormessage) {
          alert(response.data.errormessage);
        } else {
          setSectionOrders(response.data);
          console.log('sectionorder:', response.data);
        }
        setIsLoading(false);
      });
    } catch (error) {
      alert('Failed to fetch patient details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPtData = async () => {
    try {
      setIsLoading(true);
      await axios.get(`${apiUrl}/order/${id}`).then((response) => {
        if (response.data.errormessage) {
          alert(response.data.errormessage);
        } else {
          setOrder(response.data.order);
          console.log('ptdata:', response.data.order);
        }
      });
    } catch (error) {
      alert('Failed to fetch patient details. Please try again.');
    } finally {
      fetchSectionOrders();
    }
  };

  useEffect(() => {
    fetchPtData();
  }, [id]);

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
      <h3 align="center" className="text-decoration-underline fw-bold">
        Results
      </h3>

      {/* header */}
      <div className="mb-4">
        {/* <h4 className= 'p-0 m-0'>Section: {order.section}</h4> */}
        <p className="p-0 m-0">
          <strong>Lab Number:</strong> {order.labnumber}
        </p>
        {order.status === 'PENDING' ? (
          <span className="badge text-bg-warning">Pending</span>
        ) : (
          <span className="badge text-bg-success">Released</span>
        )}
      </div>

      {/* section */}
      <div className="d-inline-block col-md-6">
        <h5 className="p-0 m-0 fw-bold text-decoration-underline">Patient Details</h5>
        <p className="p-0 m-0">
          <strong>PID:</strong> {order.patient.pid}
        </p>
        <p className="p-0 m-0">
          <strong>Patient:</strong> {order.patient.firstname} {order.patient.middlename}{' '}
          {order.patient.lastname}
        </p>
        <p className="p-0 m-0">
          <strong>Age/Gender:</strong> {order.patient.age} {order.patient.gender}
        </p>
      </div>

      <div className="d-inline-block col-md-6 mb-5">
        <h5 className="p-0 m-0 fw-bold text-decoration-underline">Request Information</h5>
        <p className="p-0 m-0">
          <strong>Order Date:</strong> {moment(order.createdAt).format('MMMM DD YYYY, h:mm a')}
        </p>
        <p className="p-0 m-0">
          <strong>Requesting Physician:</strong> {order.requesting_physician}
        </p>
        <p className="p-0 m-0">
          <strong>Patient Type:</strong> {order.patient_type}
        </p>
      </div>

      <Accordion defaultActiveKey={[0]} alwaysOpen className="mb-4">
        {sectionOrders.map((sorder, index) => (
          <Accordion.Item key={index} eventKey={index + 1}>
            <Accordion.Header>{sorder.section}</Accordion.Header>
            <Accordion.Body>
              <Table size="sm" hover responsive>
                <thead className="table-secondary">
                  <tr>
                    <th className="col-md-5">Test Name</th>
                    <th className="col-md-2 text-center">Result</th>
                    <th className="col-md-1 text-center">Unit</th>
                    <th className="col-md-2 text-center">Reference</th>
                  </tr>
                </thead>
                <tbody>
                  {sorder.tests.length > 0 &&
                    sorder.tests.map((test, index) =>
                      test.test.package === true ? (
                        <tr key={index}>
                          <td colSpan={5}>
                            <strong>{test.test.name}</strong>
                          </td>
                        </tr>
                      ) : (
                        <tr key={index}>
                          <td>{test.test.name}</td>
                          {test.test.options === '' || 'None' ? (
                            <td>
                              <input
                                disabled={true}
                                type="text"
                                className="form-control m-0 p-1 text-center"
                                defaultValue={test?.result === '' ? 'PENDING' : test.result}
                              />
                            </td>
                          ) : (
                            <td>
                              <div className="form-group">
                                <select
                                  disabled={true}
                                  className="form-select"
                                  name="section"
                                  id="section"
                                  defaultValue={test?.result === '' ? 'PENDING' : test.result}
                                >
                                  <option disabled>Select one</option>
                                  {test.test.options.split(',').map((option, index) => {
                                    return (
                                      <option value={option.trim()} key={index}>
                                        {option.trim()}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                            </td>
                          )}

                          <td className="text-center">{test.test.unit}</td>
                          <td className="text-center">
                            {order.patient.gender === 'Male'
                              ? test.test.reference_value_male
                              : test.test.reference_value_female}
                          </td>
                        </tr>
                      )
                    )}
                </tbody>
              </Table>

              <PDFViewer width={'100%'} height={600}>
                <ResultFormHalf order={sectionOrders[index]} />
              </PDFViewer>

              <Button
                variant={order.status === 'Released' ? 'success' : 'danger'}
                size={'sm'}
                disabled={order.status === 'Released' ? false : true}
              >
                Generate Result
              </Button>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <Button
        variant={order.status === 'Released' ? 'success' : 'danger'}
        size={'sm'}
        disabled={order.status === 'Released' ? false : true}
      >
        Generate Full Results
      </Button>
    </div>
  );
}
