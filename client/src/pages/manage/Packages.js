import React, { useEffect, useState } from 'react'
import {Table} from 'react-bootstrap'
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner';
import ReactPaginate from 'react-paginate';
import { FaRegEdit } from "react-icons/fa";
import { ImCheckboxChecked , ImCheckboxUnchecked} from "react-icons/im";
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { IoIosAddCircleOutline } from "react-icons/io";


export default function Tests() {

  const navigate = useNavigate()
  const [packages, setPackages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [pageNumber, setPageNumber] = useState(0);

  const [filter, setFilter] = useState('');

  const filteredTests = packages.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );
    
  
  
  const packagesPerPage = 10; 
  const pagesVisited = pageNumber * packagesPerPage;
  const pageCount = Math.ceil(packages.length / packagesPerPage);
  
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const fetchPackages = async () => {
    try{

      const response = await axios.get(`http://localhost:5000/test/packages/fetch-all`)
      if(response.data.error){
        alert(response.data.error)
      }
      else{
        setPackages(response.data)
        console.log(response.data)
        setIsLoading(false)
      }
    }catch{
      alert('Error encountered in fetching tests')
    }
 

  }
  useEffect(()=>{

    fetchPackages()

  },[])

  

  const displayPackages = packages.length > 0 ? packages
      .slice(pagesVisited, pagesVisited + packagesPerPage)
      .map((item, index) => (
        <tr key={index}>
          <td className="">{item.name}</td>
          <td className="">{item.tests}</td>
          {/* <td className="">{item.tests.map(t => t.test.testcode).join(', ')}</td> */}
          {/* {/* <td className="text-center">{test.show === true ? <ImCheckboxChecked />: <ImCheckboxUnchecked/>} </td> */}
          {/* <td className="text-center">{test.section}</td>
          <td className="text-center">{test.reference_value_male}</td>
          <td className="text-center">{test.reference_value_female}</td>
          <td className="text-center">{test.unit}</td>
          <td className="text-center">&#8369; {test.price}</td>
          <td className="text-center">&#8369; {test.discounted_price}</td> */}
          {/* <td className="text-center"><Link to={`/manage/edit-test/${item._id}`}><FaRegEdit /></Link></td>  */}
        </tr>
      )): null;

  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" size="lg" />
        <h5>Loading...</h5>
      </div>
    );
  }




  return (
    <div className = 'container-fluid mt-4'>
        <h4 align="center">Packages list</h4>

        <div className = "d-flex justify-content-between">

        <div className="mb-3 col-md-3">
            <label htmlFor="search" className="form-label">
              Search Package:
            </label>
            <input
              type="text"
              id="search"
              className="form-control border-secondary"
              placeholder="Search package..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <div className ='align-self-end mb-3'>
            <Button variant="primary" size="sm" onClick={() => {navigate('/manage/add-package')}}><IoIosAddCircleOutline /> Add Package</Button>
          </div>

        </div>

       

        

        <Table size='xl' hover bordered responsive>
        <thead className="table-secondary">
          <tr>
            <th className="">Test Pofile</th>
            <th className="">Tests</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>{packages.length > 0 && displayPackages}</tbody>
      </Table>

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
  )
}
