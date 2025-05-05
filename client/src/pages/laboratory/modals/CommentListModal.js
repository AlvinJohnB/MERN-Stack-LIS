import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';


function CommentListModal({commentlistShown, setCommentListModal, handleCommentListModal, commentList}) {

//   const [comment, setComment] = useState(testSelected?.key !== undefined && order.tests[testSelected.key]?.test_comment || '')

const [filter, setFilter] = useState('');
const filteredComments = commentList.filter((comment) =>
  comment.comment_code.toLowerCase().includes(filter.toLowerCase()) ||
  comment.comment.toLowerCase().includes(filter.toLowerCase())
);


  const handleComment = (e) => {
    setComment(e.target.value)
  }

  return (
    <>
      <Modal
        show={commentlistShown}
        onHide={handleCommentListModal}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className='fw-bold text-decoration-underline'>Comment List:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        <div className="mb-3">
            <label htmlFor="search" className="form-label">
              Search Comment:
            </label>
            <input
              type="text"
              className="form-control border-secondary"
              placeholder="Search comment..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>

          <div style={{height: '300px', overflowY: 'auto'}}>

            <Table striped bordered hover>
            <thead>
                <tr>
                <th style={{ width: '20%' }}>Comment Code</th>
                <th style={{ width: '80%' }}>Comment</th> {/* Wider column */}
                </tr>
            </thead>
            <tbody>
                {Array.isArray(commentList) && commentList.length > 0 && filteredComments.map((comment) => (
                    <tr key={comment._id}>
                        <td>{comment_code}</td>
                        <td>{comment}</td>
                    </tr>
                ))}
                
                
            </tbody>
            </Table>

            </div>

          
        </Modal.Body>
        <Modal.Footer>
         
        {/* <Button onClick={()=> {updateComment(testSelected.key, testSelected.testid, comment)}} variant="primary">
            Add Comment
          </Button> */}

          <Button variant="secondary" onClick={()=> {setCommentListModal(false)}}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CommentListModal;