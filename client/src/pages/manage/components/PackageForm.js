import React, { useState, useEffect } from 'react'
import { CiCircleRemove } from "react-icons/ci";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { IoIosAddCircleOutline } from "react-icons/io";
import TestsModal from '../../reception/modals/TestsModal'
import axios from 'axios'

export default function PackageForm({handleSubmit, type, items, setItems}) {

    const navigate = useNavigate();

    const [modalShown, setModalShown] = useState(false)
    const [tests, setTests] = useState([])
    // const [items, setItems] = useState([])

    const fetchTests = async () => {
        try{
                axios.get(`http://localhost:5000/test/all`) // Use id instead of pId
                .then((response) => {
                    if(response.data) {
                      setTests(response.data);
                    }
                });
            } catch (error) {
                alert('Failed to fetch tests. Please try again.');
            }
    }

    useEffect(()=>{
        fetchTests()
    },[])
    
    const handleAddTest = (test) => {
        if (!items.some((t) => t._id === test._id)) {
          setItems([...items, test]);
          setModalShown(false); // Close the modal after adding the test
        }else{
          alert('Test already added!');
        }
      };

    const handleModalShown = () => {
        setModalShown(false)
    }



    

  return (
    <div>
            <form onSubmit={handleSubmit}>
        {/* <form> One unified form */}
            
            <div className="row justify-content-center">
            
            {/* Left section */}
            <div className="col-12 col-md-5 mx-md-3 mb-4">
                <div className="form-group">
                <label htmlFor="name">Profile Name</label>
                <input required type="text" name="name" className="form-control" id="name" placeholder="Enter test name" />
                </div>

                  
                  <div className="form-group">
                  <label>Tests</label>
                  <div className="border bg-light rounded">
                  {items.map((item, index) => (
                      <div key={index} className = 'border-bottom text-center m-0 p-0'> <span>{item.name}</span> <span onClick={() => setItems(items.filter((_, i) => i !== index))} type='button'><CiCircleRemove /></span></div>
                  ))}

                </div>

                <Button variant="primary" className='mt-3' size="sm" onClick={() => {setModalShown(true)}}><IoIosAddCircleOutline /> Add Test</Button>

                </div>
                <hr />
                <div align="center">
                <button type="submit" className="btn btn-primary col-md-5">
                    {type === 'add' ? `Add Package` : `Update Package`}
                </button>
                </div>
                
            </div>

            </div>

            

            
        </form>
        <TestsModal
        modalShown={modalShown}
        handleTestModal={handleModalShown}
        tests={tests}
        setTests={setTests}
        handleAddTest={handleAddTest}
        showAll={true}
        isLabModule={true}
      />
    </div>
  )
}
