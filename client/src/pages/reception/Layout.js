import React from 'react'
import { Outlet, Link } from 'react-router-dom'

export default function Layout() {
  return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <div
            className="container bg-light shadow"
            style={{
              maxWidth: '80%',
              height: '80%',
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          >
            {/* Bootstrap Navbar */}
            
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'green' }}>
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
                  <ul className="navbar-nav">
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
                      <Link className="nav-link text-white" to="/lab">
                        Laboratory
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

            {/* Main Content */}
            <div className="mt-4">
              <Outlet />
            </div>
          </div>
        </div>
  )
}
