import React from 'react'
import axios from 'axios'
import CommentForm  from './components/CommentForm';
import { useNavigate } from 'react-router-dom';


export default function AddTest() {

  const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        const apiUrl = process.env.REACT_APP_API_URL;
      
        console.log(data); // testname, testcode, price, etc.

        try{

            const response = await axios.post(`${apiUrl}/test/create-comment`, data)
            if(response.data.errormessage){
                alert(response.data.errormessage)
            }else{
                alert(response.data.message)
                navigate('/manage/comments')
            }
            
        }
        catch{
            alert('Error encountered in adding test.')
        }
      
              };

      

  return (
    <div className="container-fluid">
    <h3 className="text-center my-4 text-decoration-underline fw-bold">Add Comment</h3>

    <CommentForm handleSubmit={handleSubmit} type="add" />
    </div>

  )
}
