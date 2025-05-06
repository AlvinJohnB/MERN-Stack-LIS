import React, { useState, useEffect } from 'react'
import { CiCircleRemove } from "react-icons/ci";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { IoIosAddCircleOutline } from "react-icons/io";
import TestsModal from '../../reception/modals/TestsModal'
import axios from 'axios'

export default function CommentForm({type, handleSubmit, comment}) {

    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    
    // const [tests, setTests] = useState([])
    // const [items, setItems] = useState([])

  return (
    <div>
            <form onSubmit={handleSubmit}>
        {/* <form> One unified form */}
            
            <div className="row justify-content-center">
            
            {/* Left section */}
            <div className="col-12 col-md-5 mx-md-3 mb-4">
                <div className="form-group">
                <label htmlFor="comment_code">Comment Code Code</label>
                <input defaultValue={comment?.comment_code || ''} required type="text" name="comment_code" className="form-control" id="comment_code" placeholder="Enter Comment Code" />
                </div>

                  
                  <div className="form-group">
                  <label htmlFor='comment'>Comment</label>
                  <textarea defaultValue={comment?.comment || ''} rows={3} id="comment" name="comment" className='form-control'></textarea>

                </div>
                <hr />
                <div align="center">
                <button type="submit" className="btn btn-primary col-md-5">
                    {type === 'add' ? `Add Comment` : `Update Comment`}
                </button>
                </div>
                
            </div>

            </div>

        </form>
       
    </div>
  )
}
