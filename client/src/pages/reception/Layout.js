import React, { useEffect, useState, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './../../contexts/AuthContext'; // Import AuthContext
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function Layout() {

  const [user, setUser] = useState({})

  const { logout } = useContext(AuthContext); // Access login function from AuthContext

  useEffect(() => {

    const token = Cookies.get('session'); // Retrieve the session cookie
    if (token) {
      const decoded = jwtDecode(token); // Decode the JWT token
      setUser(decoded);
    }
  }, [])


  return (
    <div
    className="d-flex justify-content-center align-items-center"
    style={{
      height: '100vh',
      backgroundImage: 'url(/images/background.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  >
    <div
      className="container-fluid m-0 p-0 shadow"
      style={{
        maxWidth: '80%',
        height: 'auto',
        minHeight: '80vh',
        borderRadius: '5px',
        backgroundColor: 'rgba(207, 207, 207, 0.9)',
      }}
    >
      <nav className="navbar navbar-expand-lg bg-success m-0">
        <div className="container-fluid">
          <Link className="navbar-brand text-white" to="/">
            MyApp
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/">
                  Patient Search
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/pt-reg">
                  Patient Registration
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/orders">
                  Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/report">
                  Reports
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/manage">
                  Manage
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/lab">
                  Laboratory
                </Link>
              </li>
            </ul>
            {user && (
              <DropdownButton
                size='sm'
                id="dropdown-basic-button"
                variant='success'
                title={`${user.name}`} // Display username from token
              >
                <Dropdown.Item onClick={logout}>Log out</Dropdown.Item>
              </DropdownButton>
              
            )}
          </div>
        </div>
      </nav>
 
      <div className="px-4">
        <Outlet />
      </div>
    </div>
  </div>
  );
}