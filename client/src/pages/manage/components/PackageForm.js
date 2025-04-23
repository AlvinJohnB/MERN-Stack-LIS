import React, { useState, useEffect } from 'react'
import { CiCircleRemove } from "react-icons/ci";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { IoIosAddCircleOutline } from "react-icons/io";
import TestsModal from '../../reception/modals/TestsModal'
import axios from 'axios'

export default function PackageForm({handleSubmit, type}) {

    const navigate = useNavigate();

    const [modalShown, setModalShown] = useState(true)
    const [tests, setTests] = useState([])
    const [items, setItems] = useState([])

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
                <label htmlFor="testname">Profile Name</label>
                <input required type="text" name="testname" className="form-control" id="testname" placeholder="Enter test name" />
                </div>

                <div className="form-group mb-3 mt-1">
                <label htmlFor="section" className="form-label m-0">Section</label>
                <select className="form-select m-0" name="section" id="section">
                    <option selected>Select one</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Hematology">Hematology</option>
                    <option value="Clinical Microscopy">Clinical Microscopy</option>
                    <option value="Serology">Serology</option>
                </select>
                </div>

                
                <div className="form-group">
                <label>Tests</label>
                <div className="border bg-light rounded">
                    <div className = 'border-bottom text-center m-0 p-0'> <span>Total Cholesterol</span> <span type='button'><CiCircleRemove /></span></div>
                    {/* <div className = 'text-center bg-secondary m-0 p-0'> <span>Total Cholesterol</span> <span><CiCircleRemove /></span></div> */}
                    


                </div>

                <Button variant="primary" className='mt-3' size="sm" onClick={() => {navigate('/manage/add-package')}}><IoIosAddCircleOutline /> Add Test</Button>

                </div>
            </div>
            </div>

            {/* <div>
                <button type="submit" className="btn btn-success mt-3">
                    Add Package
                </button>
                </div> */}
        </form>
        <TestsModal
        modalShown={modalShown}
        handleTestModal={handleModalShown}
        tests={tests}
        setTests={setTests}
        handleAddTest={handleAddTest}
      />
    </div>
  )
}
