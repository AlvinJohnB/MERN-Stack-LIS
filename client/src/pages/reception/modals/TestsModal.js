import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

function TestsModal({ modalShown, handleTestModal, tests, handleAddTest }) {

  const [filter, setFilter] = useState('');




  const filteredTests = tests.filter((test) =>
    test.testName.toLowerCase().includes(filter.toLowerCase()) ||
    test.testCode.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <Modal
        show={modalShown}
        onHide={handleTestModal}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Test</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="search" className="form-label">
              Search Test:
            </label>
            <input
              type="text"
              className="form-control border-secondary"
              placeholder="Search tests..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <div style={{height: '300px', overflowY: 'auto'}}>

          <Table striped bordered hover>
            <thead>
                <tr>
                <th style={{ width: '20%' }}>Test Code</th>
                <th style={{ width: '60%' }}>Test Name</th> {/* Wider column */}
                <th style={{ width: '10%' }}>Action</th>
              </tr>
            </thead>
            <tbody>
                {Array.isArray(tests) && tests.length > 0 ? filteredTests.map((test) => (
                <tr key={test.id}>

                  <td>{test.testCode}</td>
                  <td>{test.testName}</td>
                  <td>
                    <Button variant="success" size='sm' onClick={() => handleAddTest(test)}>Select</Button>
                  </td>
                </tr>
              )) : null }
              
            </tbody>
          </Table>

          </div>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleTestModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TestsModal;