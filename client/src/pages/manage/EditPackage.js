import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PackageForm from './components/PackageForm';
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';


export default function EditPackage() {

    const [items, setItems] = useState([])
    const [name, setName] = useState('')
    const apiUrl = process.env.REACT_APP_API_URL
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)

    const fetchPackage = async () => {
        setIsLoading(true)
        try{
            const response = await axios.get(`${apiUrl}/test/package/${id}`)
            if(response.data.errormessage){
                alert('Error fetching packages')
            }else{
                // console.log(response.data.package)
                setItems(response.data.package.tests)
                setName(response.data.package.name)
                setIsLoading(false)
            }
        }catch{
            alert('Error fetching packages')
        }
    }

    useEffect(() => {

        fetchPackage()

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        data.tests = items
        console.log(data); // testname, testcode, price, etc.

        try{

            const response = await axios.post(`${apiUrl}/test/create-package`, data)
            if(response.data.errormessage){
                alert(response.data.errormessage)
            }else{
                alert(response.data.message)
            }
            
        }
        catch{
            alert('Error encountered in adding test.')
        }
      

      };

    if (isLoading) {
    return (
        <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" size="lg" />
        <h5>Loading...</h5>
        </div>
    );
    }
      

  return (
    <div className="container-fluid">
    <h5 className="text-center my-4">Edit Profile</h5>

    <PackageForm handleSubmit={handleSubmit} name={name} type="edit" setItems={setItems} items={items}/>

  
</div>

  )
}