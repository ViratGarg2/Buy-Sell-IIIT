import React from 'react';
import { Link } from 'react-router-dom';

const logout = function(){
  localStorage.setItem("authToken","");
  alert('You have been logged out');
  window.location.href = "/profile";
}

export default function Navbar() {
  const isAuthenticated = !!localStorage.getItem("authToken"); // Check if authToken exists

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">Buy-Sell</Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarSupportedContent" 
            aria-controls="navbarSupportedContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/profile">Profile</Link>
              </li>
              {!isAuthenticated && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">Signup</Link>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Link className="nav-link" to="/search">Search</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/history">History</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/delivery">Delivery</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">Cart</Link>
              </li>
            </ul>
            <button style={{borderRadius: "10px",color:"white",background:"green"}} onClick = {logout}>Logout</button>
          </div>
        </div>
      </nav>
    </div>
  );
}
