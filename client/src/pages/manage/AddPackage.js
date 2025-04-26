import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PackageForm from './components/PackageForm';

export default function AddPackage() {

    const [items, setItems] = useState([])
    const apiUrl = process.env.REACT_APP_API_URL;

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

      

  return (
    <div className="container-fluid">
    <h5 className="text-center my-4">Add Profile</h5>

    <PackageForm handleSubmit={handleSubmit} type="add" setItems={setItems} items={items}/>

  
</div>

  )
}
