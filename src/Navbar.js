import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { Button } from "./Button";

function Navbar({ currentUser, setCurrentUser }) {
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    setClicked(!clicked);
  }

  function handleLogout() {
    setCurrentUser(null);
    localStorage.removeItem("token");
  }

  return (
    <nav className="navbar-items">
      <h1 className="navbar-logo">Small Jobs</h1>
      <div className="menu-icon" onClick={handleClick}>
        <Link to="#">{clicked ? <FaTimes /> : <FaBars />}</Link>
      </div>
      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {currentUser ? (
          <>
            <li>
              <Link className="nav-links" to="/profile">
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link className="nav-links" to="/jobs">
                <span>Find a Job</span>
              </Link>
            </li>
            <li>
              <Link className="nav-links-mobile" to="/" onClick={handleLogout}>
                <span>Sign Out</span>
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link className="nav-links" to="/login">
                <span>Sign In</span>
              </Link>
            </li>
            <li>
              <Link className="nav-links" to="/signup">
                <span>Sign Up</span>
              </Link>
            </li>
          </>
        )}
      </ul>
      {currentUser ? (
        <Link to="/">
          <Button onClick={handleLogout}>Sign Out</Button>
        </Link>
      ) : null}
    </nav>
  );
}

export default Navbar;
