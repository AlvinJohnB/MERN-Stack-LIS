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


export default function Comments() {

  const navigate = useNavigate()
  const [comments, setComments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [pageNumber, setPageNumber] = useState(0);

  const [filter, setFilter] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;

  const filteredComments = comments.filter((item) =>
    item.comment_code.toLowerCase().includes(filter.toLowerCase()) ||
    item.comment.toLowerCase().includes(filter.toLowerCase())
  );
    
  
  
  const packagesPerPage = 10; 
  const pagesVisited = pageNumber * packagesPerPage;
  const pageCount = Math.ceil(comments.length / packagesPerPage);
  
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const fetchComments = async () => {
    try{

      const response = await axios.get(`${apiUrl}/test/comments/fetch-all`)
      if(response.data.error){
        alert(response.data.error)
      }
      else{
        setComments(response.data)
        setIsLoading(false)
      }
    }catch{
      alert('Error encountered in fetching tests')
    }
 

  }
  useEffect(()=>{

    fetchComments()

  },[])

  

  const displayComments = comments.length > 0 ? filteredComments
      .slice(pagesVisited, pagesVisited + packagesPerPage)
      .map((item, index) => (
        <tr key={index}>
          <td className="">{item.comment_code}</td>
          <td className="">{item.comment}</td>
          <td className="text-center"><Link to={`/manage/edit-comment/${item._id}`}><FaRegEdit /></Link></td>  
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
        <h4 align="center" className='fw-bold text-decoration-underline' >Manage Test Comments</h4>

        <div className = "d-flex justify-content-between">

        <div className="mb-3 col-md-3">
            <label htmlFor="search" className="form-label">
              Search Comment:
            </label>
            <input
              type="text"
              id="search"
              className="form-control border-secondary"
              placeholder="Search comment..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <div className ='align-self-end mb-3'>
            <Button variant="primary" size="sm" onClick={() => {navigate('/manage/add-comment')}}><IoIosAddCircleOutline /> Add Comment</Button>
          </div>

        </div>

       

        

        <Table size='xl' hover bordered responsive>
        <thead className="table-secondary">
          <tr>
            <th className="text-center">Code</th>
            <th className="text-center">Comment</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>{comments.length > 0 && displayComments}</tbody>
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
