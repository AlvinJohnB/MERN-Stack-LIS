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
import moment from 'moment';


export default function Orders() {

  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [orders, setOrders] = useState([]);
  const [detailModalShown, setDetailModalShown] = useState(false)
  const [orderDetails, setOrderDetails] = useState({})


  const fetchOrders = async () => {
    try{
      await axios.get('http://localhost:5000/order/all-orders')
        .then((response) => {
          setOrders(response.data.orders)
        })
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  }

  useEffect(() => {

    fetchOrders();

    setTimeout(() => {
      setIsLoading(false);
      console.log(orders)
    }, 500); // Simulate a delay for loading state

  }, [orders])

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

  const displayOrders = orders.length > 0 ? orders
    .slice(pagesVisited, pagesVisited + ordersPerPage)
    .map((order, index) => (
      <tr key={index}>
        <td className="">{order.labnumber}</td>
        <td className="">{`${order.patient.lastname}, ${order.patient.firstname}, ${order.patient.middlename}`}</td>
        <td className="">{order.tests.map(t => t.test.testcode).join(', ')}</td>
        <td className="text-center">{order.status === "PENDING" ? <ProgressBar animated striped variant="primary" now={40} /> : <ProgressBar striped variant="success" now={100} />}</td>
        <td className="text-center">{moment(order.createdAt).format('MMMM DD, YYYY')}</td>
        <td className="text-center">
          <Button onClick={() => { handleDetail(order); }} variant="success" size="sm">
            View
          </Button>
        </td>
      </tr>
    )): null;

    


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
            <th className="">Lab Number</th>
            <th className="">Patient Name</th>
            <th className="">Test/s Requested</th>
            <th className="mob text-center">Progress</th>
            <th className="mob text-center">Date Encoded</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>{orders.length > 0 && displayOrders}</tbody>
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

      {/* {orders && <OrderDetailsModal orderDetails={orderDetails} detailModalShown={detailModalShown} handleDetailModal={handleDetailModal} />} */}
    </div>
  );
}