import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import moment from 'moment';

function OrderDetailsModal({ orderDetails, handleDetailModal, detailModalShown }) {

    useEffect(() => {
        if (detailModalShown) {
          // Add your custom logic here, e.g., fetching additional details
          console.log(orderDetails)
        }
      }, [detailModalShown, orderDetails]);

  return (
    <>
      <Modal
        show={detailModalShown}
        onHide={handleDetailModal}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        size="md"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Details for {orderDetails.labnumber}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h5>Patient Information</h5>
            <p><strong>Patient ID:</strong> {orderDetails.patient.pid ? orderDetails.patient.pid : 'N/A'}</p>
            <p><strong>Patient Name:</strong> {orderDetails.patient.firstname} {orderDetails.patient.lastname}</p>
            
            <h5>Test Information</h5>
            <p><strong>Order Date:</strong> {moment(orderDetails.createdAt).format('MMMM DD, YYYY')}</p>
            <p><strong>Requesting Physician:</strong> {orderDetails.requesting_physician}</p>
            <p><strong>Order Status:</strong> {orderDetails.status}</p>
            <p><strong>Tests:</strong> {orderDetails.tests.map(t => t.test.testcode).join(', ')}</p>
            <p><strong>Order Remarks:</strong> {orderDetails.remarks}</p>

            <h5>Order Statement</h5>
            {/* <Table size='sm' hover responsive>
            <thead className="table-secondary">
              <tr>
                <th className="">Test</th>
                <th className="">Cost</th>
              </tr>
            </thead>
            <tbody>{orderDetails.tests.length > 0 && orderDetails.tests.map(test => (
              <tr key={test.test.id}>
                <td>{test.test.testcode}</td>
                <td>{test.test.price}</td>
              </tr>
            ))}</tbody>
          </Table> */}
          </div>

          <Button variant="primary">
            Print Charge Slip
          </Button>
          <Button variant="success" className="ms-2">
            Print Results
          </Button>

          
        </Modal.Body>
        <Modal.Footer>
         

          <Button variant="secondary" onClick={handleDetailModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default OrderDetailsModal;