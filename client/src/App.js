import React, {useContext} from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Signin from './pages/Signin';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import { AuthContext } from './contexts/AuthContext';
import Layout from './pages/reception/Layout';
import LabLayout from './pages/laboratory/LabLayout';
import PtSreach from './pages/reception/PtSreach';
import PtReg from './pages/reception/PtReg';
import PtAddOrder from './pages/reception/PtAddOrder';


function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (

        <Routes>

          <Route path="/signin" element={<Signin />} />

          <Route path='/' element={
              <ProtectedRoute>
                {/* Add the component that should be protected here */}
                <Layout />
              </ProtectedRoute>
          }>
            <Route path="/" element={<PtSreach />} />
            <Route path="pt-reg" element={<PtReg/>} />
            <Route path="pt-add-order/:id" element={<PtAddOrder />} />
            <Route path="orders" element={<h1>Orders Page</h1>} />
          
          </Route>

          <Route path='/lab' element={
              <ProtectedRoute>
                {/* Add the component that should be protected here */}
                <LabLayout />
              </ProtectedRoute>
          }>
            {/* <Route path="/" element={<h1>Patient Search</h1>} />
            <Route path="pt-reg" element={<h1>Patient Registration</h1>} />
            <Route path="orders" element={<h1>Orders Page</h1>} /> */}
          
          </Route>


        
        
        {/* Public Route for Signin */}
        </Routes>
       


    
  );
}

export default App;