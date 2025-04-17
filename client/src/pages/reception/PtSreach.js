import React, { useState } from 'react';

export default function PtSreach() {

  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', { lastname, firstname });
    // Add your search logic here
  };

  return (

    <div className="mt-4">

      <h4 className="mb-4">Patient Search</h4>

      <form onSubmit={handleSubmit} className="align-items-center">
        <div className='row g-2 mb-3'>
            <div className="col-auto">
                <label htmlFor="lastname" className="form-label">
                    Last Name
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="lastname"
                    placeholder="Enter Last Name"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                />
                </div>
                <div className="col-auto">
                <label htmlFor="firstname" className="form-label">
                    First Name
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="firstname"
                    placeholder="Enter First Name"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                />
                </div>
        </div>

        <button type="submit" className="btn btn-success">
            Search Patient
          </button>
        {errorMessage &&
            <div class="alert alert-danger mt-2 w-auto text-center" role="alert">
            {errorMessage}
            </div>
        } 
        
        
      </form>


      
    </div>
  );
}