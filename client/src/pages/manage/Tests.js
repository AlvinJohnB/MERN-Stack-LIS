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
  const [tests, setTests] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [pageNumber, setPageNumber] = useState(0);

  const [filter, setFilter] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;

  const filteredTests = tests.filter((test) =>
    test.name.toLowerCase().includes(filter.toLowerCase()) ||
    test.testcode.toLowerCase().includes(filter.toLowerCase())
  );
    
  
  
  const ordersPerPage = 10; 
  const pagesVisited = pageNumber * ordersPerPage;
  const pageCount = Math.ceil(tests.length / ordersPerPage);
  
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const fetchTests = async () => {
    try{

      const response = await axios.get(`${apiUrl}/test/all`)
      if(response.data.error){
        alert(response.data.error)
      }
      else{
        setTests(response.data)
        console.log(response.data)
        setIsLoading(false)
      }
    }catch{
      alert('Error encountered in fetching tests')
    }
 

  }
  useEffect(()=>{

    fetchTests()

  },[])

  

  const displayTests = tests.length > 0 ? filteredTests
      .slice(pagesVisited, pagesVisited + ordersPerPage)
      .map((test, index) => (
        <tr key={index}>
          <td className="">{test.testcode}</td>
          <td className="">{test.name}</td>
          <td className="text-center">{test.show === true ? <ImCheckboxChecked />: <ImCheckboxUnchecked/>} </td>
          <td className="text-center">{test.section}</td>
          <td className="text-center">{test.reference_value_male}</td>
          <td className="text-center">{test.reference_value_female}</td>
          <td className="text-center">{test.unit}</td>
          <td className="text-center">&#8369; {test.price}</td>
          <td className="text-center">&#8369; {test.discounted_price}</td>
          <td className="text-center"><Link to={`/manage/edit-test/${test._id}`}><FaRegEdit /></Link></td>
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
        <h4 align="center">Tests list</h4>

        <div className = "d-flex justify-content-between">

        <div className="mb-3 col-md-3">
            <label htmlFor="search" className="form-label">
              Search Test:
            </label>
            <input
              type="text"
              id="search"
              className="form-control border-secondary"
              placeholder="Search tests..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <div className ='align-self-end mb-3'>
            <Button variant="primary" size="sm" onClick={() => {navigate('/manage/add-test')}}><IoIosAddCircleOutline /> Add Test</Button>
          </div>

        </div>

       

        

        <Table size='xl' hover bordered responsive>
        <thead className="table-secondary">
          <tr>
            <th className="">Test code</th>
            <th className="">Test name</th>
            <th className="text-center">Show</th>
            <th className="text-center">Section</th>
            <th className="text-center">Ref male</th>
            <th className="text-center">Ref female</th>
            <th className="text-center">Unit</th>
            <th className="mob text-center">Price</th>
            <th className="mob text-center">Disc. price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>{tests.length > 0 && displayTests}</tbody>
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
