import React, { useEffect, useState, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie
import { jwtDecode } from 'jwt-decode';
import { AuthContext } from './../../contexts/AuthContext'; // Import AuthContext
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Layout() {

  const [user, setUser] = useState({})

  const { logout } = useContext(AuthContext); // Access login function from AuthContext
  const [expanded, setExpanded] = useState(false); // State to manage navbar collapse


  useEffect(() => {

    const token = Cookies.get('session'); // Retrieve the session cookie
    if (token) {
      const decoded = jwtDecode(token); // Decode the JWT token
      setUser(decoded);
    }
  }, [])

  const handleNavLinkClick = () => {
    setExpanded(false); // Collapse the navbar when a link is clicked
  };


  return (
    <div
    className="d-flex justify-content-center"
    style={{
      height: '100vh',
      backgroundImage: 'url(/images/background.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'repeat',
    }}
  >
    <div
      className="container-fluid mx-0 my-auto p-0 shadow"
      style={{
        maxWidth: '80%',
        height: '90vh',
        borderRadius: '5px',
        backgroundColor: 'rgba(207, 207, 207, 0.9)',
        overflowY: 'auto',
      }}
    >
      <Navbar
          collapseOnSelect
          expand="lg"
          className='bg-success m-0'
          expanded={expanded} // Control the expanded state
        >
          <Container>
            <Navbar.Brand className="text-white" href="/">
              MyApp
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls="navbarScroll"
              onClick={() => setExpanded(!expanded)} // Toggle the navbar state
            />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto">
                <Nav.Link
                  className="text-white"
                  as={Link}
                  to="/"
                  onClick={handleNavLinkClick}
                >
                  Patient Search
                </Nav.Link>
                <Nav.Link
                  className="text-white"
                  as={Link}
                  to="/pt-reg"
                  onClick={handleNavLinkClick}
                >
                  Patient Registration
                </Nav.Link>
                <Nav.Link
                  className="text-white"
                  as={Link}
                  to="/orders"
                  onClick={handleNavLinkClick}
                >
                  Orders
                </Nav.Link>
                <Nav.Link
                  className="text-white"
                  as={Link}
                  to="/report"
                  onClick={handleNavLinkClick}
                >
                  Reports
                </Nav.Link>
                <Nav.Link
                  className="text-white"
                  as={Link}
                  to="/manage"
                  onClick={handleNavLinkClick}
                >
                  Manage
                </Nav.Link>
                <Nav.Link
                  className="text-white"
                  as={Link}
                  to="/lab"
                  onClick={handleNavLinkClick}
                >
                  Laboratory
                </Nav.Link>
    
              </Nav>
              <Navbar.Text>
                  {user && (
                    <DropdownButton
                      size="sm"
                      id="dropdown-basic-button"
                      variant="success"
                      title={` ${user.name}`} // Display username from token
                    >
                      <Dropdown.Item
                        className="w-auto"
                        onClick={() => {
                          logout();
                          handleNavLinkClick(); // Collapse navbar on logout
                        }}
                      >
                        Log out
                      </Dropdown.Item>
                    </DropdownButton>
                  )}
                </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>

 
      <div className="px-4">
        <Outlet />
      </div>
    </div>
  </div>
  );
}