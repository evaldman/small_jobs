import React from "react";
import "./Userpage.css";

function Userpage({ currentUser }) {
  return (
    <div>
      <h3>welcome {currentUser.name}</h3>

      <div className="wrapper">
        <div>
          <img src={currentUser.image} alt={currentUser.name} />
          <p>{currentUser.bio}</p>
        </div>
        <div></div>
        <div>lorem lorem</div>
      </div>
    </div>
  );
}

export default Userpage;
