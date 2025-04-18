import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext'; // Import AuthContext
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Signin = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const { login, isAuthenticated } = useContext(AuthContext); // Access login function from AuthContext
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // Redirect to dashboard if already authenticated
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform login logic here (e.g., API call)
    await login({ username, password }); // Await login function from AuthContext
    if (isAuthenticated) {
      // Redirect to dashboard or another page after successful login
      navigate('/'); // Redirect to dashboard
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card shadow" style={{ width: '400px', borderRadius: '10px' }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4">Sign In</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;