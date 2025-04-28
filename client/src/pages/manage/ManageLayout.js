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


export default function LabLayout() {

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
            {/* Bootstrap Navbar */}
            
            <Navbar className="bg-primary m-0" collapseOnSelect expand="lg" expanded={expanded}>
              <Container>
                <Navbar.Brand className='text-white' href="#home">MyApp</Navbar.Brand>
                <Navbar.Toggle onClick={() => setExpanded(!expanded)} aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                  <Nav className="me-auto">
                    <Nav.Link onClick={handleNavLinkClick} className='text-white' as={Link} to="/">Reception</Nav.Link>
                    <Nav.Link onClick={handleNavLinkClick} className='text-white' as={Link} to="/lab/Chemistry">Laboratory</Nav.Link>
                    <Nav.Link onClick={handleNavLinkClick} className='text-white' as={Link} to="/manage">Test</Nav.Link>
                    <Nav.Link onClick={handleNavLinkClick} className='text-white' as={Link} to="/manage/packages">Packages</Nav.Link>
                    {/* <Nav.Link onClick={handleNavLinkClick} className='text-white' as={Link} to="/lab/Serology">Serology</Nav.Link> */}
                   
                  </Nav>
                  <Navbar.Text>
                  {user && (
                    <DropdownButton
                      size="sm"
                      id="dropdown-basic-button"
                      variant="primary"
                      title={` ${user.name}`} // Display username from token
                    >
                      <Dropdown.Item
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


            {/* Main Content */}
            <div className="mt-4">
              <Outlet />
            </div>
          </div>
        </div>
  )
}
