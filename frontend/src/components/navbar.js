// components/navbar.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import logo from '../images/ChronoCanvasLogo.png';
import navbarBackground from '../images/navbarBackground.png';

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <div className="fixed-top">
      <nav
        className="navbar py-2 px-3"
        style={{
          backgroundImage: `url(${navbarBackground})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="container-fluid d-flex align-items-center justify-content-between">
          <div className="d-none d-sm-block">
            <Link to="/">
              <img 
                src={logo} 
                height="100px" 
                alt="ChronoCanvas Logo" 
                style={{
                  cursor: "pointer",
                  borderRadius: "20%",
                  objectFit: "cover",
                }}
              />
            </Link>
          </div>
          <div className="d-flex flex-grow-1 justify-content-center me-sm-5 text-center">
            <div className="bg-light rounded px-3 py-1">
              <h1 className="text-dark m-0 border-bottom">
                Chrono<b>Canvas</b>
              </h1>
              {user ? (
                <small className="text-dark">Welcome, <b>{user.firstName}</b>!</small>
              ) : (
                <small className="text-dark"><b>Paint</b> Your Day</small>
              )}
            </div>
          </div>
          <div className="d-flex gap-2">
            {user ? (
              <Button onClick={handleLogout} variant="danger">Logout</Button>
            ) : (
              <>
                <Link to="/login" className="btn btn-primary">Login</Link>
                <Link to="/register" className="btn btn-success">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}