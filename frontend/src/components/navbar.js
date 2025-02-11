import React from "react";
import logo from '../images/ChronoCanvasLogo.png';
import navbarBackground from '../images/navbarBackground.png';
import { Link } from 'react-router-dom';

export default function Navbar() {
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
        <div className="container-fluid d-flex align-items-center">
          {/* Logo - Hidden on Small Screens */}
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

          {/* Title & Subtitle - Always Centered with Background */}
          <div className="d-flex flex-grow-1 justify-content-center me-sm-5 me-5 text-center">
            <div className="bg-light rounded px-3 py-1 me-sm-5 me-0">
              <h1 className="text-dark m-0 border-bottom">
                Chrono<b>Canvas</b>
              </h1>
              <small className="text-dark"><b>Paint</b> Your Day</small>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
