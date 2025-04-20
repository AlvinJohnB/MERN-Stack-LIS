import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import moment from 'moment';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';


export default function SectionOrder() {

    const { orderid, section } = useParams();
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const [order, setOrder] = useState({});

    const fetchOrder = async () => {
        setIsLoading(true);
        try{
          await axios.get(`http://localhost:5000/order/section-orders/${orderid}/${section}`)
            .then((response) => {
              setOrder(response.data.orders)
            })
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      }

      useEffect(() => {
        fetchOrder();
        
        setTimeout(() => {
          setIsLoading(false);
        }, 500); // Simulate a delay for loading state
    
      }, [section, orderid])


if (isLoading) {
    return (
    <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" size="lg" />
        <h5>Loading...</h5>
    </div>
    );
}

  return (
    <div className="container-fluid mt-4">
      {order && 
      <>
      <h4>Section: {order.section}</h4>
        <p><strong>Lab Number:</strong> {order.labnumber.labnumber}</p>
       
        <h5>Patient Details</h5>
        <p><strong>PID:</strong> {order.patient.pid}</p>
        <p><strong>Patient:</strong> {order.patient.firstname} {order.patient.middlename} {order.patient.lastname}</p>
        <p><strong>Age/Gender:</strong> {order.patient.age} {order.patient.gender}</p>
        <p>Clinical Info</p>
        <h5>Request Information</h5>
        <p><strong>Order Date:</strong> {moment(order.labnumber.createdAt).format('MMMM DD YYYY, h:mm a')}</p>
        <p><strong>Requesting Physician:</strong> {order.labnumber.requesting_physician}</p>
        <p><strong>Patient Type:</strong> {order.labnumber.patient_type}</p>
        <p>Clinical Information / Remarks:</p>

        <Table size='sm' hover responsive>
        <thead className="table-secondary">
          <tr>
            <th className="">Test Name</th>
            <th className="">Result</th>
            <th className="">Unit</th>
            <th className="mob text-center">Reference</th>
            <th className="mob text-center">Comment</th>
          </tr>
        </thead>
        <tbody>

        {order.tests.length > 0 &&
            order.tests.map((test, index) =>
                test.test.package === true ? (
                <tr key={index}>
                    <td colSpan={5}><strong>{test.test.name}</strong></td>
                </tr>
                ) : (
                <tr key={index}>
                    <td>{test.test.name}</td>
                    <td>___</td>
                    <td>{test.test.unit}</td>
                    <td className="text-center">
                    {order.patient.gender === "Male"
                        ? test.test.reference_value_male
                        : test.test.reference_value_female}
                    </td>
                    <td className="text-center">
                    <Button variant="primary" size="sm">View</Button>
                    </td>
                </tr>
                )
            )}

        </tbody>
      </Table>
        <Button variant="primary">Release Result</Button>

      </>
    }
    </div>
    
  )
}
