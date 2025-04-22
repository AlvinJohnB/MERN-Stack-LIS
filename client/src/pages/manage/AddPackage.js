import React from 'react'
import axios from 'axios'

export default function AddPackage() {

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
            }
            
        }
        catch{
            alert('Error encountered in adding test.')
        }
      
        // Submit `data` to your backend here (e.g. via fetch or axios)
      };

      

  return (
    <div className="container-fluid">
  <h5 className="text-center my-4">Add Test</h5>

  <form onSubmit={handleSubmit}>
  {/* <form> One unified form */}
    
    <div className="row justify-content-center">
      
      {/* Left section */}
      <div className="col-12 col-md-5 mx-md-3 mb-4">
        <div className="form-group">
          <label htmlFor="testname">Profile Name</label>
          <input required type="text" name="testname" className="form-control" id="testname" placeholder="Enter test name" />
        </div>

        <div className="form-group">
          <label htmlFor="testcode">Tests</label>
          <input required type="text" name="testcode" className="form-control" id="testcode" placeholder="Test code" />
          <small className="form-text text-muted">
            Test code should be unique for each test.
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="section" className="form-label">Section</label>
          <select className="form-select" name="section" id="section">
            <option selected>Select one</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Hematology">Hematology</option>
            <option value="Clinical Microscopy">Clinical Microscopy</option>
            <option value="Serology">Serology</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="unit">Unit</label>
          <input type="text" name="unit" className="form-control" id="unit" placeholder="Enter unit" />
          <small className="form-text text-muted">Leave as blank if none.</small>
        </div>

        <div className="form-group">
          <label htmlFor="options">Options</label>
          <input type="text" name="options" className="form-control" id="options" placeholder="Enter options" />
          <small className="form-text text-muted">
            If results expected is Negative or Positive, enter "Positive,Negative".
          </small>
        </div>
      </div>
    </div>

    <div>
        <button type="submit" className="btn btn-success mt-3">
            Add Package
        </button>
        </div>
  </form>
</div>

  )
}
