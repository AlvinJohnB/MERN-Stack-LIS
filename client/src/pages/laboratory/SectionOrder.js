import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import moment from 'moment';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import Cookies from 'js-cookie'; // Import js-cookie
import { jwtDecode } from 'jwt-decode';


export default function SectionOrder() {


  const [user, setUser] = useState({}) // Current USER

  const { orderid, section } = useParams();
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [order, setOrder] = useState({});
  const [orderNotes, setOrderNotes] = useState([]);
  const [users, setUsers] = useState([]);

  const [performer, setPerformer] = useState('');
  const [pathologist, setPathologist] = useState('');
  const [globalComments, setGlobalComments] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
  
      const token = Cookies.get('session'); // Retrieve the session cookie
      if (token) {
        const decoded = jwtDecode(token); // Decode the JWT token
        setUser(decoded);
      }
    }, [])

  const fetchOrder = async () => {
    setIsLoading(true);

    try {
      await axios.get(`${apiUrl}/order/section-orders/${orderid}/${section}`)
        .then((response) => {
          console.log(response.data.orders)
          setOrder(response.data.orders)
        })
    } catch (error) {
      alert('Error fetching order details')
      console.error('Error fetching order details:', error);
    }

    // Fetch order Notes
    try {
      await axios.get(`${apiUrl}/order/get-order-notes/${orderid}`)
        .then((response) => {
          setOrderNotes(response.data.notes)
        })


    }catch(error){
      alert('Error fetching order notes')
      console.error('Error fetching order notes:', error);
    }

    // Fetch users
    try {

      await axios.get(`${apiUrl}/auth/get-all-users`)
        .then((response) => {

        // Sort users by position
        const rmtUsers = response.data.filter(user => user.position === 'Registered Medical Technologist');
        const pathologistUsers = response.data.filter(user => user.position === 'Pathologist');

        setUsers({ rmt: rmtUsers, pathologists: pathologistUsers });

        })

    }catch(error){
      console.error('Error fetching users:', error);
      alert('Error fetching users')
    }


  }

  useEffect(() => {
    fetchOrder();

    setTimeout(() => {
      setIsLoading(false);
    }, 500); // Simulate a delay for loading state

  }, [section, orderid])

  const handleResult = async (e, id) => {
    console.log(e.target.value)
    console.log(id)

    try{

      axios.put(`${apiUrl}/test/update-test-result/`, {id: id, result: e.target.value}).then((res) =>{
        if (res.data.errormessage){
          alert(res.data.errormessage)
        }else{
          console.log(res.data)
        }
      })

    }catch(err){
      console.log(err)
      alert (`Error occured when updating results`)

    }


  }


  const releaseResult = async () => {

    if(!performer || !pathologist) {
      alert('Please select a performer and pathologist')
      return;
    }

    const data = {
      global_comments: globalComments,
      performed_by: performer,
      released_by: user._id,
      pathologist: pathologist,
    }

    axios.put(`${apiUrl}/order/edit-order/${orderid}/Released`, data)
      .then((res) => {
        if (res.data.errormessage) {
          alert(res.data.errormessage)
        } else {
          console.log(res.data)
          alert('Result Released')
          setOrder({...order, status: 'Released'})
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Error releasing result')
      })

  }


  const undoRelease = async () => {

    const data = {
      global_comments: globalComments,
      // performed_by: '',
      // released_by: '',
      // pathologist: '',
    }

    axios.put(`${apiUrl}/order/edit-order/${orderid}/Pending`, data)
      .then((res) => {
        if (res.data.errormessage) {
          alert(res.data.errormessage)
        } else {
          console.log(res.data)
          alert('Result Released')
          setOrder({...order, status: 'Pending'})
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Error releasing result')
      })

  }

  if (isLoading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" size="lg" />
        <h5>Loading...</h5>
      </div>
    );
  }

  return (
    <div className="container-fluid mt-4">
      {order &&
        <>
        {/* header */}
        <div className='mb-4'>
          <h4 className= 'p-0 m-0'>Section: {order.section}</h4>
          <p className= 'p-0 m-0'><strong>Lab Number:</strong> {order.labnumber.labnumber}</p>
          {order.status === 'Pending' ?
            <span className="badge text-bg-warning">Pending</span> :
            <span className="badge text-bg-success">Result Released</span>
          }
        
        </div>
          
        {/* section */}
        <div className='d-inline-block col-md-6'>

          <h5 className='p-0 m-0 fw-bold text-decoration-underline'>Patient Details</h5>
          <p className='p-0 m-0'><strong>PID:</strong> {order.patient.pid}</p>
          <p className='p-0 m-0'><strong>Patient:</strong> {order.patient.firstname} {order.patient.middlename} {order.patient.lastname}</p>
          <p className='p-0 m-0'><strong>Age/Gender:</strong> {order.patient.age} {order.patient.gender}</p>

        </div>
        <div className='d-inline-block col-md-6'>
            <h5 className='p-0 m-0 fw-bold text-decoration-underline'>Request Information</h5>
            <p className='p-0 m-0'><strong>Order Date:</strong> {moment(order.labnumber.createdAt).format('MMMM DD YYYY, h:mm a')}</p>
            <p className='p-0 m-0'><strong>Requesting Physician:</strong> {order.labnumber.requesting_physician}</p>
            <p className='p-0 m-0'><strong>Patient Type:</strong> {order.labnumber.patient_type}</p>
        </div>

        <div className='d-inline-block col-md-12 mt-3 mb-3'>
            <h4 className='p-0 m-0 fw-bold text-decoration-underline mb-2'>Clinical Information / Remarks:</h4>
            <div className="bg-light d-inline-block col-md-4 border border-1 rounded-3 p-2">
              {orderNotes && orderNotes.length > 0 ? (
                orderNotes.map((note, index) => (
                  <p className='p-0 m-0' key={index}>{note}</p>
                ))
              ) : (
                <span className='p-0 m-0'>No Remarks</span>
              )}

            </div>
        </div>
         

          <Table size='sm' hover responsive>
            <thead className="table-secondary">
              <tr>
                <th className="col-md-5">Test Name</th>
                <th className="col-md-2 text-center">Result</th>
                <th className="col-md-1 text-center">Unit</th>
                <th className="col-md-2 text-center">Reference</th>
                <th className="col-md-2 text-center">Comment</th>
              </tr>
            </thead>
            <tbody>

              {order.tests.length > 0 &&
                order.tests.map((test, index) =>
                  test.test.package === true ? (
                    <tr key={index}>
                      <td colSpan={5}><strong>{test.test.name}</strong></td>
                    </tr>
                  ) : (
                    <tr key={index}>
                      <td>{test.test.name}</td>
                      {test.test.options === '' || 'None' ?
                        (<td>
                          <input disabled={order.status === 'Pending' ? false : true} type='text' className='form-control m-0 p-1 text-center' onBlur={(e) => { handleResult(e, test._id) }} defaultValue={test.result || ''} />
                        </td>)
                        :
                        (<td>
                            <div className="form-group">
                            <select
                              disabled={order.status === 'Pending' ? false : true} 
                              className="form-select"
                              name="section"
                              id="section"
                              defaultValue={test.result || 'Select one'}
                              onChange={(e) => {handleResult(e, test._id)}}
                            >
                              <option disabled>Select one</option>
                              {test.test.options.split(',').map((option, index) => {
                                return (
                                  <option value={option.trim()} key={index}>{option.trim()}</option>
                                )
                              })}

                            </select>
                          </div>
                        </td>)
                      }
               
                      <td className='text-center'>{test.test.unit}</td>
                      <td className="text-center">
                        {order.patient.gender === "Male"
                          ? test.test.reference_value_male
                          : test.test.reference_value_female}
                      </td>
                      <td className="text-center">
                        <Button variant="primary" size="sm">View</Button>
                      </td>
                    </tr>
                  )
                )}

            </tbody>
          </Table>

          <div>


              <div className='d-flex justify-content-between mb-3'>

                  <div className='inline block col-md-3'>
                    <label className="text-decoration-underline fw-bold" htmlFor='global-comments'>Global Comment/s:</label><br/>
                    <textarea  disabled={order.status === 'Pending' ? false : true}  onChange={(e) => {setGlobalComments(e.target.value)}} defaultValue={order.global_comments || ''} style={{resize: 'none'}} className='form-control' name="global-comments" id="global-comments" rows="3"></textarea><br/>
                  </div>

                    <div className='inline-block col-md-3'>
                      <label className='fw-bold text-decoration-underline' htmlFor='performer'>Performer:</label><br/>
                      <select  disabled={order.status === 'Pending' ? false : true}  onChange={(e)=> {setPerformer(e.target.value)}} className='form-select' name="performer" id="performer">
                        <option defaultValue={order.performed_by || ''} value="">Select Performer</option>  
                        {users.rmt.length > 0 &&
                          users.rmt.map((user, index) => {
                            return (
                              <option value={user._id} key={index}>{user.name}</option>
                            )
                          })
                        }
                       
                      </select>
                    </div>

                    <div className='inline-block col-md-3'>
                        <label className='text-decoration-underline fw-bold' htmlFor='pathologist'>Pathologist:</label><br/>
                        <select  disabled={order.status === 'Pending' ? false : true}  onChange={(e)=> {setPathologist(e.target.value)}} className='form-select' name="pathologist" id="pathologist">
                        <option defaultValue={order.pathologist || ''} value="">Select Pathologist</option>
                          {users.pathologists && users.pathologists.length > 0 &&
                            users.pathologists.map((user, index) => {
                              return (
                                <option value={user._id} key={index}>{user.name}</option>
                              )
                            })
                          }
                    
                          
                        </select>
                    </div>

              </div>

                {order.status === 'Pending' ? 
                 <Button onClick={releaseResult} className='border border-black mx-1' variant="primary">Release Result</Button>
                 :
                 <Button onClick={undoRelease} className='border border-black mx-1' variant="danger">Undo Release Result</Button>
                }
               
              
          </div>
        </>
      }
    </div>

  )
}
