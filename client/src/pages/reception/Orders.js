import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar';
import OrderDetailsModal from './modals/OrderDetailsModal';

export default function Orders() {

  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [orders, setOrders] = useState([
    {
      "labNumber": "LAB001",
      "patientName": "John Doe",
      "testsRequested": "Complete Blood Count, Lipid Profile",
      "progress": "In Progress",
      "dateEncoded": "2023-10-01"
    },
    {
      "labNumber": "LAB002",
      "patientName": "Jane Smith",
      "testsRequested": "Fasting Blood Sugar, Liver Function Test",
      "progress": "Completed",
      "dateEncoded": "2023-10-02"
    },
    {
      "labNumber": "LAB003",
      "patientName": "Alice Johnson",
      "testsRequested": "Kidney Function Test",
      "progress": "Pending",
      "dateEncoded": "2023-10-03"
    },
    {
      "labNumber": "LAB004",
      "patientName": "Bob Brown",
      "testsRequested": "Thyroid Stimulating Hormone",
      "progress": "In Progress",
      "dateEncoded": "2023-10-04"
    },
    {
      "labNumber": "LAB005",
      "patientName": "Charlie Davis",
      "testsRequested": "C-Reactive Protein, Prothrombin Time",
      "progress": "Completed",
      "dateEncoded": "2023-10-05"
    },
    {
      "labNumber": "LAB006",
      "patientName": "Emily White",
      "testsRequested": "Erythrocyte Sedimentation Rate",
      "progress": "Pending",
      "dateEncoded": "2023-10-06"
    },
    {
      "labNumber": "LAB007",
      "patientName": "Frank Green",
      "testsRequested": "Liver Function Test",
      "progress": "In Progress",
      "dateEncoded": "2023-10-07"
    },
    {
      "labNumber": "LAB008",
      "patientName": "Grace Black",
      "testsRequested": "Kidney Function Test, Lipid Profile",
      "progress": "Completed",
      "dateEncoded": "2023-10-08"
    },
    {
      "labNumber": "LAB009",
      "patientName": "Henry Blue",
      "testsRequested": "Complete Blood Count",
      "progress": "Pending",
      "dateEncoded": "2023-10-09"
    },
    {
      "labNumber": "LAB010",
      "patientName": "Ivy Brown",
      "testsRequested": "Thyroid Stimulating Hormone",
      "progress": "In Progress",
      "dateEncoded": "2023-10-10"
    },
    {
      "labNumber": "LAB011",
      "patientName": "Jack Yellow",
      "testsRequested": "Fasting Blood Sugar",
      "progress": "Completed",
      "dateEncoded": "2023-10-11"
    },
    {
      "labNumber": "LAB012",
      "patientName": "Karen Gray",
      "testsRequested": "C-Reactive Protein",
      "progress": "Pending",
      "dateEncoded": "2023-10-12"
    },
    {
      "labNumber": "LAB013",
      "patientName": "Leo White",
      "testsRequested": "Prothrombin Time",
      "progress": "In Progress",
      "dateEncoded": "2023-10-13"
    },
    {
      "labNumber": "LAB014",
      "patientName": "Mia Red",
      "testsRequested": "Erythrocyte Sedimentation Rate",
      "progress": "Completed",
      "dateEncoded": "2023-10-14"
    },
    {
      "labNumber": "LAB015",
      "patientName": "Noah Purple",
      "testsRequested": "Liver Function Test",
      "progress": "Pending",
      "dateEncoded": "2023-10-15"
    },
    {
      "labNumber": "LAB016",
      "patientName": "Olivia Orange",
      "testsRequested": "Kidney Function Test",
      "progress": "In Progress",
      "dateEncoded": "2023-10-16"
    },
    {
      "labNumber": "LAB017",
      "patientName": "Paul Cyan",
      "testsRequested": "Complete Blood Count",
      "progress": "Completed",
      "dateEncoded": "2023-10-17"
    },
    {
      "labNumber": "LAB018",
      "patientName": "Quinn Magenta",
      "testsRequested": "Thyroid Stimulating Hormone",
      "progress": "Pending",
      "dateEncoded": "2023-10-18"
    },
    {
      "labNumber": "LAB019",
      "patientName": "Ruby Pink",
      "testsRequested": "Fasting Blood Sugar",
      "progress": "In Progress",
      "dateEncoded": "2023-10-19"
    },
    {
      "labNumber": "LAB020",
      "patientName": "Sam Gold",
      "testsRequested": "C-Reactive Protein, Prothrombin Time",
      "progress": "Completed",
      "dateEncoded": "2023-10-20"
    }
  ]); // Orders data
  
  const [detailModalShown, setDetailModalShown] = useState(false)
  const [orderDetails, setOrderDetails] = useState({})

  const handleDetailModal = () => {
    setDetailModalShown(!detailModalShown);
    
  }

  const [pageNumber, setPageNumber] = useState(0);
  


  const ordersPerPage = 10;
  const pagesVisited = pageNumber * ordersPerPage;
  const pageCount = Math.ceil(orders.length / ordersPerPage);
  

  const initialValues = {
    labNumber: '',
  };

  const validationSchema = Yup.object().shape({
    labNumber: Yup.string().required('This field is required!'),
  });

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleDetail = (order) => {
    setDetailModalShown(true)
    setOrderDetails(order)
  }

  const displayOrders = orders
    .slice(pagesVisited, pagesVisited + ordersPerPage)
    .map((order, index) => (
      <tr key={index}>
        <td className="">{order.labNumber}</td>
        <td className="">{order.patientName}</td>
        <td className="">{order.testsRequested}</td>
        <td className="text-center"><ProgressBar animated striped variant="success" now={40} /></td>
        <td className="text-center">{order.dateEncoded}</td>
        <td className="text-center">
          <Button onClick={() => { handleDetail(order); }} variant="success" size="sm">
            View
          </Button>
        </td>
      </tr>
    ));

    

//   useEffect(() => {
//     const fetchOrders = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get('http://localhost:5000/orders'); // Replace with your API endpoint
//         setOrders(response.data);
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/orders/filter', data); // Replace with your API endpoint
      if (response.data.length === 0) {
        alert('Lab number not found!');
      } else {
        setOrders(response.data);
      }
    } catch (error) {
      console.error('Error filtering orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="success" size="lg" />
        <h5>Loading...</h5>
      </div>
    );
  }

  return (
    <div className="container-fluid my-3">
      <h3>Orders</h3>
      <div className="row">
        <div className="col-md-3 mb-5">
          <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            <Form>
              <label>Search lab number:</label>
              <div className="d-flex">
                <Field
                  name="labNumber"
                  id="form-field"
                  type="text"
                  placeholder="Enter lab no..."
                  className="form-control col-md-3"
                />
                <Button variant="success" className="my-auto mx-1" type="submit">
                  Search
                </Button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
      <Table size='sm' hover responsive>
        <thead className="table-secondary">
          <tr>
            <th className="text-center">Lab Number</th>
            <th className="text-center">Patient Name</th>
            <th className="text-center">Test/s Requested</th>
            <th className="mob text-center">Progress</th>
            <th className="mob text-center">Date Encoded</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>{displayOrders}</tbody>
      </Table>
      <br />
      {pageCount > 1 && (
        <ReactPaginate

          pageCount={pageCount}
          onPageChange={changePage}
          previousLabel="«"
          nextLabel="»"
          breakLabel="..."
          containerClassName="pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          activeClassName="active"
          disabledClassName="disabled"
        />
      )}

      <OrderDetailsModal orderDetails={orderDetails} detailModalShown={detailModalShown} handleDetailModal={handleDetailModal} />
    </div>
  );
}