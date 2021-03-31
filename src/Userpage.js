import React, { useState } from "react";
import "./Userpage.css";
import moment from "moment";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";
import FullCalendar from "@fullcalendar/react";
import daygridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
// import JobDetail from "./JobDetail";

function Userpage({
  currentUser,
  setCurrentUser,
  jobs,
  setJobs,
  calendarData,
  setCalendarData,
}) {
  const [showModal, setShowModal] = useState(false);
  const [jobModal, setJobModal] = useState(false);
  const [jobDetailModal, setJobDetailModal] = useState(false);
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: currentUser.name,
    bio: currentUser.bio,
    image: currentUser.image,
    purpose: currentUser.purpose,
  });
  const [editJob, setEditJob] = useState("");
  const [editJobId, setEditJobId] = useState("");
  const [calendarClickId, setCalendarClickId] = useState("");

  const acceptedToDisplay = currentUser.accepted.map((job) => {
    return (
      <>
        {job.completed === false ? (
          <li key={job.id}>
            Title: {job.title} <br></br> Date:{" "}
            {moment.utc(job.date).format("MM-DD-YYYY")} <br></br> Expected Pay:
            ${job.length * job.pay}
            <br></br>
            {/* <button onClick={() => handleCompleted(job)}>Completed</button> */}
            <button onClick={() => handleCancel(job)}>Cancel</button>
          </li>
        ) : null}
      </>
    );
  });

  const completedToDislay = currentUser.accepted.map((job) => {
    return (
      <>
        {job.completed === true ? (
          <li key={job.id}>
            Title: {job.title} <br></br> Date:{" "}
            {moment.utc(job.date).format("MM-DD-YYYY")} <br></br> Pay Received:
            ${job.length * job.pay}
            <br></br>
          </li>
        ) : null}
      </>
    );
  });

  const openToDisplay = currentUser.posted.map((job) => {
    return (
      <>
        {job.completed === false && job.accept_status === false ? (
          <li key={job.id}>
            Title: {job.title}
            <br></br> Date: {moment.utc(job.date).format("MM-DD-YYYY")}{" "}
            <br></br> Expected cost: ${job.length * job.pay}
            <br></br>Status: {job.accept_status === true ? "Accepted" : "Open"}
            <br></br> Completed? {job.completed === true ? "Yes" : "No"}
            <br></br>
            {job.completed === false && (
              <>
                {job.accept_status === true && (
                  <button onClick={() => handleCompleted(job)}>
                    Completed
                  </button>
                )}
                <button onClick={() => openEditJob(job)}>Edit</button>
                <button onClick={() => handleDeleteJob(job)}>Delete</button>
              </>
            )}
          </li>
        ) : null}
      </>
    );
  });
  // console.log(jobs);
  const acceptToDisplay = currentUser.posted.map((job) => {
    return (
      <>
        {job.completed === false && job.accept_status === true ? (
          <li key={job.id}>
            Title: {job.title}
            <br></br> Date: {moment.utc(job.date).format("MM-DD-YYYY")}{" "}
            <br></br> Expected cost: ${job.length * job.pay}
            <br></br>Status: {job.accept_status === true ? "Accepted" : "Open"}
            <br></br> Completed? {job.completed === true ? "Yes" : "No"}
            <br></br>
            {job.completed === false && (
              <>
                {job.accept_status === true && (
                  <button onClick={() => handleCompleted(job)}>
                    Completed
                  </button>
                )}
                <button onClick={() => openEditJob(job)}>Edit</button>
                <button onClick={() => handleDeleteJob(job)}>Delete</button>
              </>
            )}
          </li>
        ) : null}
      </>
    );
  });

  const completeToDisplay = currentUser.posted.map((job) => {
    return (
      <>
        {job.completed === true ? (
          <li key={job.id}>
            Title: {job.title}
            <br></br> Date: {moment.utc(job.date).format("MM-DD-YYYY")}{" "}
            <br></br> Amount Paid: ${job.length * job.pay}
            <br></br>Status: {job.accept_status === true ? "Accepted" : "Open"}
            <br></br> Completed? {job.completed === true ? "Yes" : "No"}
          </li>
        ) : null}
      </>
    );
  });

  function handleCancel(job) {
    // console.log(job);
    const jobToCancel = currentUser.accepted_jobs.filter(
      (accept) => accept.job_id === job.id
    );
    const cancelId = jobToCancel[0].id;
    // console.log(cancelId);
    fetch(`http://localhost:3000/accepted_jobs/${cancelId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        job_id: job.id,
        user_id: currentUser.id,
        accept_status: false,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setJobs(
          jobs.map((job) => {
            if (job.id === data.job.id) {
              return data.job;
            } else {
              return job;
            }
          })
        );
        setCurrentUser(data.currentUser);
        const newData = data.currentUser.accepted.map((job) => {
          return {
            id: job.id,
            title: job.title,
            date: moment.utc(job.date).format("YYYY-MM-DD"),
          };
        });
        setCalendarData(newData);
      });
  }

  function handleCompleted(job) {
    if (window.confirm("Mark complete?? This can't be undone!") === true) {
      fetch(`http://localhost:3000/jobs/${job.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          completed: true,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setCurrentUser(data.user);
        });
    }
  }

  function openEditJob(job) {
    setJobModal(true);
    setEditJob({
      title: job.title,
      description: job.description,
      length: job.length,
      pay: job.pay,
      date: moment.utc(job.date).format("YYYY-MM-DD"),
    });
    setEditJobId(job.id);
  }

  // console.log(editJobId);
  function handleJobChange(e) {
    setEditJob({ ...editJob, [e.target.name]: e.target.value });
  }
  // console.log(editJob);
  function handleEditJob() {
    // e.preventDefault();
    fetch(`http://localhost:3000/jobs/${editJobId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editJob),
    })
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data.user);
      });
  }

  function handleDeleteJob(job) {
    // console.log(job);
    if (window.confirm("Remove this job forever?") === true) {
      fetch(`http://localhost:3000/jobs/${job.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setCurrentUser(data);
          const postedData = data.posted.map((job) => {
            return {
              id: job.id,
              title: job.title,
              date: moment.utc(job.date).format("YYYY-MM-DD"),
            };
          });
          setCalendarData(postedData);
        });
    }
  }

  function handleDeleteUser(id) {
    // console.log(id);
    if (window.confirm("Are you sure sure?") === true) {
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

  // console.log(currentUser.accepted.map((job) => job.id));
  // console.log(calendarData);
  function handleDateClick(id) {
    setJobDetailModal(true);
    // console.log(id);
    setCalendarClickId(id);
  }
  // console.log(calendarClickId);
  // console.log(typeof calendarClickId);

  const clickAcceptedJob = currentUser.accepted.map((job) => {
    return (
      <>
        {job.id === parseInt(calendarClickId) ? (
          <div className="event-info-container">
            <div className="event-info">
              <h1>{job.title}</h1>
              <h3>{job.description}</h3>
              <h3>Hours: {job.length}</h3>
              <h3>Pay: ${job.pay}/hr</h3>
              <h3>Start Time:</h3>
              <h3>When: {moment.utc(job.date).format("dddd, MMMM Do YYYY")}</h3>
            </div>
          </div>
        ) : null}
      </>
    );
  });

  const clickPostedJob = currentUser.posted.map((job) => {
    return (
      <>
        {job.id === parseInt(calendarClickId) ? (
          <div className="event-info-container">
            <div className="event-info">
              <h1>{job.title}</h1>
              <h3>{job.description}</h3>
              <h3>Hours: {job.length}</h3>
              <h3>Pay: ${job.pay}/hr</h3>
              <h3>Start Time:</h3>
              <h3>When: {moment.utc(job.date).format("dddd, MMMM Do YYYY")}</h3>
            </div>
          </div>
        ) : null}
      </>
    );
  });

  // console.log(currentUser.accepted);
  function totalWorkerCompleted() {
    return currentUser.accepted
      .filter((job) => job.completed)
      .reduce(
        (total, completedJob) =>
          (total += completedJob.length * completedJob.pay),
        0
      );
  }
  // console.log(totalCompleted());
  function totalEmployerCompleted() {
    return currentUser.posted
      .filter((job) => job.completed)
      .reduce(
        (total, completedJob) =>
          (total += completedJob.length * completedJob.pay),
        0
      );
  }
  return (
    <div>
      <h3 className="profile-username">
        Welcome {currentUser.name} ({currentUser.purpose})
      </h3>

      <div className="wrapper">
        <div>
          <div className="nested">
            <div>
              <img
                className="profile-pic"
                src={currentUser.image}
                alt={currentUser.username}
              />
            </div>
            <div>
              <h3>Bio</h3>
              <p>{currentUser.bio}</p>
            </div>
            <div>
              {currentUser.purpose === "worker" ? (
                <>
                  <h3>Total Earned</h3>
                  <p>${totalWorkerCompleted()}</p>
                </>
              ) : (
                <>
                  <h3>Total Paid</h3>
                  <p>${totalEmployerCompleted()}</p>
                </>
              )}
            </div>
          </div>
          <div className="profile-calendar">
            <FullCalendar
              plugins={[daygridPlugin, interactionPlugin]}
              eventClick={(e) => handleDateClick(e.event.id)}
              events={calendarData}
            />
          </div>
        </div>
        <div className="nested">
          {currentUser.purpose === "worker" ? (
            <>
              <div>
                <h3>Accepted Jobs</h3>
                <ul>{acceptedToDisplay}</ul>
              </div>
              <div>
                <h3>Completed Jobs</h3>
                <ul>{completedToDislay}</ul>
              </div>
            </>
          ) : (
            <>
              <div>
                <h3>Open Jobs</h3>
                <ul>{openToDisplay}</ul>
              </div>
              <div>
                <h3>Accepted Jobs</h3>
                <ul>{acceptToDisplay}</ul>
              </div>
              <div>
                <h3>Completed Jobs</h3>
                <ul>{completeToDisplay}</ul>
              </div>
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

      <Modal
        className="edit-modal"
        isOpen={showModal}
        ariaHideApp={false}
        onRequestClose={() => setShowModal(false)}
      >
        <div className="edit-container">
          <form id="edit-form" onSubmit={handleEditProfile} autoComplete="off">
            <h3>Edit Profile</h3>
            <label>Name</label>
            <input
              className="form-input"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <br></br>
            <label>Bio</label>
            <textarea
              className="form-textarea"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            />
            <br></br>
            <label>Profile Pic</label>
            <input
              className="form-input"
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />

            <label>Purpose</label>
            <select
              className="form-input"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
            >
              <option>employer</option>
              <option>worker</option>
            </select>
            <input className="form-submit" type="submit" value="Update" />
          </form>
          <div className="">
            <button onClick={() => setShowModal(false)}>
              <b>X</b>
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        className="edit-modal"
        isOpen={jobModal}
        ariaHideApp={false}
        onRequestClose={() => setJobModal(false)}
      >
        <div className="edit-container"></div>
        <form id="edit-form" onSubmit={handleEditJob} autoComplete="off">
          <h3>Edit Job</h3>
          <label>Title:</label>
          <input
            className="form-input"
            type="text"
            value={editJob.title}
            name="title"
            onChange={handleJobChange}
          ></input>
          <br></br>
          <label>Description:</label>
          <textarea
            className="form-textarea"
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
            className="form-input"
            type="text"
            value={editJob.length}
            name="length"
            onChange={handleJobChange}
          ></input>
          <br></br>
          <label>Pay:</label>
          <input
            className="form-input"
            type="text"
            value={editJob.pay}
            name="pay"
            onChange={handleJobChange}
          ></input>
          <br></br>
          <label>Date:</label>
          <input
            className="form-input"
            type="date"
            value={editJob.date}
            name="date"
            // defaultValue={editJob.date}
            onChange={handleJobChange}
          ></input>
          <br></br>
          <input className="form-submit" type="submit" value="Update Job" />
        </form>
        <div>
          <button onClick={() => setJobModal(false)}>
            <b>X</b>
          </button>
        </div>
      </Modal>
      <Modal
        className="edit-modal"
        isOpen={jobDetailModal}
        ariaHideApp={false}
        onRequestClose={() => setJobDetailModal(false)}
      >
        <>
          {currentUser.purpose === "worker" ? (
            <div>{clickAcceptedJob}</div>
          ) : (
            <div>{clickPostedJob}</div>
          )}
        </>
      </Modal>
    </div>
  );
}

export default Userpage;
