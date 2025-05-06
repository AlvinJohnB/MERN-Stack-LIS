import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function Commentsmodal({handleCommentListModal, updateComment, handleModal, order, modalShown, testSelected }) {

  const [comment, setComment] = useState(testSelected?.key !== undefined && order.tests[testSelected.key]?.test_comment || '')

  const handleComment = (e) => {
    setComment(e.target.value)
  }

  return (
    <>
      <Modal
        show={modalShown}
        onHide={handleModal}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        size="md"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className='fw-bold text-decoration-underline'>Comment for {testSelected.testname}:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
              
                <textarea defaultValue={testSelected?.key !== undefined && order.tests[testSelected.key]?.test_comment || ''} onChange={(e) => {handleComment(e)}} className='form-control' rows={3}></textarea>
            </div>
            <span onClick={handleCommentListModal} className='text-decoration-underline badge text-bg-warning' style={{cursor: 'pointer'}}>Show pre-made comments</span>
          
        </Modal.Body>
        <Modal.Footer>
         
        <Button onClick={()=> {updateComment(testSelected.key, testSelected.testid, comment)}} variant="primary">
            Add Comment
          </Button>

          <Button variant="secondary" onClick={()=> {updateComment(testSelected.key, testSelected.testid, comment)}}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Commentsmodal;