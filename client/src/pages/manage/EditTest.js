import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'
import TestForm from './components/TestForm';
import Spinner from 'react-bootstrap/Spinner';

export default function EditTest() {

    const navigate = useNavigate()
    const { id } = useParams();
    const [test, setTest] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const apiUrl = process.env.REACT_APP_API_URL;

    const fetchTest = async () => {
      try{
          const response = await axios.post(`${apiUrl}/test/get-test/${id}`)
        if(response.data.error){
          alert(response.data.error)
        }
         setTest(response.data)
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
   
               const response = await axios.put(`${apiUrl}/test/update-test/${id}`, data)
               if(response.data.errormessage){
                   alert(response.data.errormessage)
               }else{
                   alert(response.data.message)
                   navigate('/manage/')
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
        <h5 className="text-center my-4">Manage Test</h5>
      
        <TestForm handleSubmit={handleSubmit} test={test} type="edit" />
    </div>
  )
}
