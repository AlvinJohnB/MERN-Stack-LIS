import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function ManageIndex() {

  
    const [isLoading, setIsLoading] = useState(false)
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();


  
    if (isLoading) {
      return (
        <div className="text-center mt-5">
          <Spinner animation="border" variant="primary" size="lg" />
          <h5>Loading...</h5>
        </div>
      );
    }


  return (
    <div>
        <h3 className="text-center my-4 fw-bold text-decoration-underline">Manage Dashboard</h3>


        <div className='d-flex mx-5 justify-content-around'>

            <Card style={{ width: '20rem' }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
                <Card.Title className='fw-bold'>Tests</Card.Title>
                <Card.Text>
                    <small>Add or edit your test list according to your needs.</small>
                </Card.Text>
                <Button onClick={()=>{navigate('/manage/tests')}} className='btn-sm' variant="primary">Manage Tests</Button>
            </Card.Body>
            </Card>

               <Card style={{ width: '20rem' }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
                <Card.Title className='fw-bold'>Profiles and Packages</Card.Title>
                <Card.Text>
                    <small>Manage your test packages or test profiles. Add or edit discounted packages.</small>
                </Card.Text>
                <Button onClick={() => {navigate('/manage/packages')}} className='btn-sm' variant="primary">Manage Profiles and Packages</Button>
            </Card.Body>
            </Card>

               <Card style={{ width: '20rem' }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
                <Card.Title className='fw-bold'>Test Comments</Card.Title>
                <Card.Text>
                    <small>Add or edit pre-made test comments.</small>
                </Card.Text>
                <Button onClick={() => {navigate('/manage/comments')}} className='btn-sm' variant="primary">Manage Test Comments</Button>
            </Card.Body>
            </Card>

        </div>
      
            

    
  
    </div>
  )
}
