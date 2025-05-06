import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
import CommentForm from './components/CommentForm';
import Spinner from 'react-bootstrap/Spinner';

export default function EditTest() {

    const navigate = useNavigate()
    const { id } = useParams();
    const [comment, setComment] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const apiUrl = process.env.REACT_APP_API_URL;

    const fetchTest = async () => {
      try{
          const response = await axios.post(`${apiUrl}/test/comments/fetch/${id}`)
        if(response.data.error){
          alert(response.data.error)
        }
            setComment(response.data)
         setIsLoading(false)
        
      }catch(err){
        console.log(err)
        alert('Error encountered when fetching test.')
      }
    }

    useEffect(()=> {
      fetchTest()
    },[])

    const handleSubmit = async (e) => {
           e.preventDefault();
         
           const formData = new FormData(e.target);
           const data = Object.fromEntries(formData.entries());

         
           console.log(data); // testname, testcode, price, etc.
   
           try{
   
               const response = await axios.put(`${apiUrl}/test/comment/update/${id}`, data)
               if(response.data.errormessage){
                   alert(response.data.errormessage)
               }else{
                   alert(response.data.message)
                   navigate('/manage/comments')
               }
               
           }
           catch{
               alert('Error encountered in editing test.')
           }
         
           // Submit `data` to your backend here (e.g. via fetch or axios)
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
    <div>
        <h3 className="text-center my-4 text-decoration-underline fw-bold">Edit Comment</h3>
      
        <CommentForm handleSubmit={handleSubmit} comment={comment} type="edit" />
    </div>
  )
}
