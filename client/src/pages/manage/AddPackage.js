import React from 'react'
import axios from 'axios'
import PackageForm from './components/PackageForm';

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
    <h5 className="text-center my-4">Add Profile</h5>

    <PackageForm handleSubmit={handleSubmit}/>

  
</div>

  )
}
