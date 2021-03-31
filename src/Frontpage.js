import React from "react";
import logo from "./images/SmallJobsLogo.png";
import "./frontpage.css";

function Frontpage() {
  return (
    <div className="frontpage">
      <div>
        <img src={logo} alt="logo" />
      </div>
      <br></br>
      <div>
        Welcome to Small Jobs <br /> A place to find all types of work!
      </div>
    </div>
  );
}

export default Frontpage;
