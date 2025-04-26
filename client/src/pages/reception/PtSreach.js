import React, { useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import { Link } from 'react-router-dom';


export default function PtSreach() {

  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const [pageNumber, setPageNumber] = useState(0);
    
  const apiUrl = process.env.REACT_APP_API_URL;
  
  const ordersPerPage = 10;
  const pagesVisited = pageNumber * ordersPerPage;
  const pageCount = Math.ceil(searchResult.length / ordersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Searching for:', { lastname, firstname });
    // Add your search logic here
    try {
      const response = await axios.post(`${apiUrl}/patient/search`, {
        lastname,
        firstname,
      });
      if (response.data.errormessage) {
        setErrorMessage(response.data.errormessage);
      } else {
        // Handle successful search result here
        setSearchResult(response.data);
        console.log('Search result:', response.data);
      }
    } catch (error) {
      console.error('Error searching for patient:', error);
      setErrorMessage('An error occurred while searching for the patient.');
    }
  };

  const displaySearchResults = searchResult
  .slice(pagesVisited, pagesVisited + ordersPerPage)
  .map((order, index) => (
    <tr key={index}>
      
      <td className="text-center"><Link className='link-body-emphasis' to={`/patient/${order._id}`}>{order.lastname} {order.firstname}</Link></td>
      <td className="text-center"><Link className='link-body-emphasis' to={`/patient/${order._id}`}>{order.gender}</Link></td>
      <td className="text-center"><Link className='link-body-emphasis' to={`/patient/${order._id}`}>{moment(order.bday).format('MM/DD/YYYY')}</Link></td>
    </tr>
  ));

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
      
      {searchResult.length > 0 && (
        <div className="mt-3 mb-3">
          <h6>Search Results:</h6>
        <Table size='sm' hover responsive>
        <thead className="table-secondary">
          <tr>
            <th className="text-center">Patient Name</th>
            <th className="text-center">Gender</th>
            <th className="mob text-center">Birthdate</th>
          </tr>
        </thead>
        <tbody>{displaySearchResults}</tbody>
      </Table>
        </div>
      )}
      



      {pageCount > 1 && (
        <ReactPaginate

          pageCount={pageCount}
          onPageChange={changePage}
          previousLabel="«"
          nextLabel="»"
          breakLabel="..."
          containerClassName="pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakClassName="page-item"
          breakLinkClassName="page-link"
          activeClassName="active"
          disabledClassName="disabled"
        />
      )}


      
    </div>
  );
}