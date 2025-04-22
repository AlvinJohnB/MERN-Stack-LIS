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
import Orders from './pages/reception/Orders';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';
import PatientDetails from './pages/reception/PatientDetails';
import SectionTab from './pages/laboratory/SectionTab';
import SectionOrder from './pages/laboratory/SectionOrder';
import Report from './pages/report/Report';
import AddTest from './pages/manage/AddTest';
import ManageLayout from './pages/manage/ManageLayout';
import Tests from './pages/manage/Tests';


function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (

        <Routes>

          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />

          <Route path='/' element={
              <ProtectedRoute>
                {/* Add the component that should be protected here */}
                <Layout />
              </ProtectedRoute>
          }>
            <Route path="/" element={<PtSreach />} />
            <Route path="pt-reg" element={<PtReg/>} />
            <Route path="pt-add-order/:id" element={<PtAddOrder />} />
            <Route path="orders" element={<Orders />} />
            <Route path="patient/:id" element={<PatientDetails />} />
            <Route path="/report" element={<Report />} />

          
          </Route>

          <Route path='/lab' element={
              <ProtectedRoute>
                {/* Add the component that should be protected here */}
                <LabLayout />
              </ProtectedRoute>
          }>
            <Route path="/lab/:section" element={<SectionTab />} />
            <Route path="/lab/:section/:orderid" element={<SectionOrder />} />
            {/* <Route path="orders" element={<h1>Orders Page</h1>} /> */}
          
          </Route>

          <Route path='/manage' element={
              <ProtectedRoute>
                {/* Add the component that should be protected here */}
                <ManageLayout />
              </ProtectedRoute>
          }>
            
            
            <Route path="/manage" element={<Tests />} />
          
          </Route>

          


        
          <Route path="*" element={<NotFound />} />
        {/* Public Route for Signin */}
        </Routes>
       


    
  );
}

export default App;