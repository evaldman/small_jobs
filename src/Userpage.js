import React, { useState } from "react";
import "./Userpage.css";
import moment from "moment";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";

function Userpage({ currentUser, setCurrentUser }) {
  const [showModal, setShowModal] = useState(false);
  const [jobModal, setJobModal] = useState(false);
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: currentUser.name,
    bio: currentUser.bio,
    image: currentUser.image,
    purpose: currentUser.purpose,
  });
  const [editJob, setEditJob] = useState("");

  const acceptedToDisplay = currentUser.accepted.map((job) => {
    return (
      <li key={job.id}>
        Title: {job.title} <br></br> Date:{" "}
        {moment(job.date).format("MM-DD-YYYY")} <br></br> Expected Pay: $
        {job.length * job.pay}
        <br></br>
        <button onClick={() => handleCompleted(job.id)}>Completed</button>
        <button onClick={() => handleCancel(job.id)}>Cancel</button>
      </li>
    );
  });

  const completedToDislay = currentUser.accepted.map((job) => {
    return (
      <>
        {job.completed === true ? (
          <li key={job.id}>
            Title: {job.title} <br></br> Date:{" "}
            {moment(job.date).format("MM-DD-YYYY")} <br></br> Pay Received: $
            {job.length * job.pay}
            <br></br>
          </li>
        ) : null}
      </>
    );
  });

  const postToDisplay = currentUser.posted.map((job) => {
    return (
      <li key={job.id}>
        Title: {job.title}
        <br></br> Date: {moment(job.date).format("MM-DD-YYYY")} <br></br>{" "}
        Expected cost: ${job.length * job.pay}
        <br></br>Status: {job.accept_status === true ? "Accepted" : "Open"}
        <br></br> Completed? {job.completed === true ? "Yes" : "No"}
        <br></br>
        <button onClick={() => handleCompleted(job.id)}>Completed</button>
        <button onClick={() => openEditJob(job)}>Edit</button>
        <button onClick={() => handleDeleteJob(job.id)}>Delete</button>
      </li>
    );
  });

  function handleCancel(id) {
    console.log(id);
  }
  function handleCompleted(id) {
    console.log(id);
  }

  function openEditJob(job) {
    setJobModal(true);
    setEditJob({
      title: job.title,
      description: job.description,
      length: job.length,
      pay: job.pay,
      date: job.date,
    });
  }
  console.log(editJob);

  function handleJobChange(e) {
    setEditJob({ ...editJob, [e.target.name]: e.target.value });
  }

  function handleEditJob() {}

  function handleDeleteJob(id) {
    console.log(id);
  }

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

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleEditProfile() {
    // e.preventDefault();
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:3000/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          setCurrentUser(data);
        });
    }
  }
  // console.log(currentUser);
  return (
    <div>
      <h3>
        Welcome {currentUser.name} ({currentUser.purpose})
      </h3>

      <div className="wrapper">
        <div>
          <img src={currentUser.image} alt={currentUser.username} />
          <p>{currentUser.bio}</p>
        </div>
        <div>
          {currentUser.purpose === "worker" ? (
            <>
              <h3>Accepted Jobs</h3>
              <ul>{acceptedToDisplay}</ul>
              <h3>Completed Jobs</h3>
              <ul>{completedToDislay}</ul>
            </>
          ) : (
            <>
              <h3>Posted Jobs</h3>
              <ul>{postToDisplay}</ul>
            </>
          )}
        </div>
      </div>
      <button
        className="delete-button"
        type="submit"
        onClick={() => confirmDelete(currentUser.id)}
      >
        Delete Account
      </button>
      <button className="delete-button" onClick={() => setShowModal(true)}>
        Edit Profile
      </button>
      {/* {currentUser.purpose === "employer" && (
        <button className="delete-button">Post New Job</button>
      )} */}

      <Modal
        className="edit-modal"
        isOpen={showModal}
        ariaHideApp={false}
        onRequestClose={() => setShowModal(false)}
      >
        <form onSubmit={handleEditProfile} autoComplete="off">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <label>Bio</label>
          <textarea name="bio" value={formData.bio} onChange={handleChange} />

          <label>Profile Pic</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />

          <label>Purpose</label>
          <select
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
          >
            <option>employer</option>
            <option>worker</option>
          </select>
          <input type="submit" value="Update" />
        </form>
        <div>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      </Modal>
      <Modal
        className="edit-modal"
        isOpen={jobModal}
        ariaHideApp={false}
        onRequestClose={() => setJobModal(false)}
      >
        <form onSubmit={handleEditJob} autoComplete="off">
          <label>Title:</label>
          <input
            type="text"
            value={editJob.title}
            name="title"
            onChange={handleJobChange}
          ></input>
          <br></br>
          <label>Description:</label>
          <textarea
            value={editJob.description}
            name="description"
            onChange={handleJobChange}
          ></textarea>
          <br></br>
          {/* <label>Category: </label>
        <select
          value={editJob.category_id}
          name="category_id"
          onChange={handleChange}
        >
          <option value hidden>
            Select Category
          </option>
          {categoryOptions}
        </select>
        <br></br> */}
          <label>Length:</label>
          <input
            type="text"
            value={editJob.length}
            name="length"
            onChange={handleJobChange}
          ></input>
          <br></br>
          <label>Pay:</label>
          <input
            type="text"
            value={editJob.pay}
            name="pay"
            onChange={handleJobChange}
          ></input>
          <br></br>
          <label>Date:</label>
          <input
            type="date"
            value={editJob.date}
            name="date"
            onChange={handleJobChange}
          ></input>
          <br></br>
          <input type="submit" value="Udate Job" />
        </form>
        <div>
          <button onClick={() => setJobModal(false)}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
}

export default Userpage;
