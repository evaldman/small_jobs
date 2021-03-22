import React from "react";
import "./Userpage.css";
import moment from "moment";
import { useHistory } from "react-router-dom";

function Userpage({ currentUser, setCurrentUser }) {
  const history = useHistory();
  const acceptedToDisplay = currentUser.accepted.map((job) => {
    return (
      <li key={job.id}>
        Title: {job.title} <br></br> Date:{" "}
        {moment(job.date).format("MM-DD-YYYY")} <br></br> Expected Pay: $
        {job.length * job.pay}
      </li>
    );
  });

  function handleDeleteUser(id) {
    // console.log(id);
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrentUser(null);
      localStorage.removeItem("token");
      history.push("/");
    }
  }

  function confirmDelete(id) {
    // console.log(id);
    const confirmthis = window.confirm(
      "Are you sure you wish to delete your account??"
    );
    // console.log(confirmthis);
    if (confirmthis === true) {
      handleDeleteUser(id);
    }
  }

  return (
    <div>
      <h3>Welcome {currentUser.name}</h3>

      <div className="wrapper">
        <div>
          <img src={currentUser.image} alt={currentUser.name} />
          <p>{currentUser.bio}</p>
        </div>
        <div>
          <h3>Accepted Jobs</h3>
          <ul>{acceptedToDisplay}</ul>
        </div>
      </div>
      <button
        className="delete-button"
        type="submit"
        onClick={() => confirmDelete(currentUser.id)}
      >
        Delete Account
      </button>
    </div>
  );
}

export default Userpage;
