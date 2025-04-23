import React from 'react'
import axios from 'axios'
import TestForm from './components/TestForm';
import { useNavigate } from 'react-router-dom';


export default function AddTest() {

  const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
      
        console.log(data); // testname, testcode, price, etc.

        try{

            const response = await axios.post('http://localhost:5000/test/add-test', data)
            if(response.data.errormessage){
                alert(response.data.errormessage)
            }else{
                alert(response.data.message)
                navigate('/manage/')
            }
            
        }
        catch{
            alert('Error encountered in adding test.')
        }
      
              };

      

  return (
    <div className="container-fluid">
  <h5 className="text-center my-4">Add Test</h5>

  <TestForm handleSubmit={handleSubmit} type="add" />
  
</div>

  )
}
