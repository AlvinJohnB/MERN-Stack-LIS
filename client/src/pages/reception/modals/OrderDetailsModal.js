import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

function OrderDetailsModal({ orderDetails, handleDetailModal, detailModalShown }) {

    useEffect(() => {
        if (detailModalShown) {
          console.log('Modal is now shown');
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
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Lab Number</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
        </div>

          
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