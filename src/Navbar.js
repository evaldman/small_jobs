import React, { useState } from "react";
import { MenuItems } from "./MenuItems";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { Button } from "./Button";

function Navbar(currentUser, setCurrentUser) {
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    setClicked(!clicked);
  }
  return (
    <nav className="navbar-items">
      <h1 className="navbar-logo">Small Jobs</h1>
      <div className="menu-icon" onClick={handleClick}>
        <Link to="#">{clicked ? <FaTimes /> : <FaBars />}</Link>
      </div>
      <ul className={clicked ? "nav-menu active" : "nav-menu"}>
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <a className={item.cName} href={item.url}>
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
      <Link to="/">
        <Button onClick={() => setCurrentUser(null)}>Sign Out</Button>
      </Link>
    </nav>
  );
}

export default Navbar;
