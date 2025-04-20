import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';



export default function SectionTab() {

  const { section } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [orders, setOrders] = useState([]);
  const [detailModalShown, setDetailModalShown] = useState(false)



  const fetchOrders = async () => {
    setIsLoading(true);
    try{
      await axios.get(`http://localhost:5000/order/section-orders/${section}`)
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
    }, 500); // Simulate a delay for loading state

  }, [section])

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

  const handleDetail = (order, section) => {
    console.log(order._id, section);
    navigate(`/lab/${section}/${order._id}`)
  }

  const displayOrders = orders.length > 0 ? orders
    .slice(pagesVisited, pagesVisited + ordersPerPage)
    .map((order, index) => (
      <tr key={index}>
        <td className="">{order.labnumber.labnumber}</td>
        <td className="">{`${order.patient.lastname}, ${order.patient.firstname}, ${order.patient.middlename}`}</td>
        <td className="">{order.labnumber.tests.filter(t => t.test.section === section).map(t => t.test.testcode).join(', ')}</td>
        <td className="text-center">{moment(order.createdAt).format('MMMM DD, YYYY')}</td>
        <td className="text-center">
          <Button onClick={() => { handleDetail(order, section); }} variant="primary" size="sm">
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
        <Spinner animation="border" variant="primary" size="lg" />
        <h5>Loading...</h5>
      </div>
    );
  }

  return (
    <div className="container-fluid my-3">
      <h3>{section}</h3>
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
                <Button variant="primary" className="my-auto mx-1" type="submit">
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

    </div>
  );
}
