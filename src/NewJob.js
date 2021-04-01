import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import "./newJob.css";

function NewJob({
  currentUser,
  setCurrentUser,
  jobs,
  setJobs,
  categories,
  setCalendarData,
}) {
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    length: "",
    pay: "",
    date: "",
    accept_status: false,
    completed: false,
    user_id: currentUser.id,
    category_id: "",
    time: "12:00",
    address: "",
  });
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  function handleChange(e) {
    const value =
      e.target.name === "category_id"
        ? parseInt(e.target.value)
        : e.target.value;
    setNewJob({ ...newJob, [e.target.name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          // console.log(data);
          setCurrentUser(data.user);
          const postedData = data.user.posted.map((job) => {
            return {
              id: job.id,
              title: job.title,
              date: moment.utc(job.date).format("YYYY-MM-DD"),
            };
          });
          setCalendarData(postedData);
          history.push("/profile");
          setJobs([...jobs, data]);
        }
      });
  }

  const categoryOptions = categories.map((category) => {
    return (
      <option key={category.id} value={category.id}>
        {" "}
        {category.name}
      </option>
    );
  });

  return (
    <div className="new-job-container">
      <form id="new-job-form" onSubmit={handleSubmit}>
        <h3>Create A New Job</h3>
        <h4>All fields must be filled out to post a job!</h4>
        <label>Title:</label>
        <input
          className="new-job-input"
          type="text"
          value={newJob.title}
          name="title"
          onChange={handleChange}
        ></input>
        <br></br>
        <label>Description:</label>
        <textarea
          className="new-job-textarea"
          value={newJob.description}
          name="description"
          onChange={handleChange}
        ></textarea>
        <br></br>
        <label>Location:</label>
        <input
          className="new-job-input"
          type="text"
          value={newJob.address}
          name="address"
          onChange={handleChange}
        ></input>
        <br></br>
        <label>Category: </label>
        <select
          className="new-job-input"
          value={newJob.category_id}
          name="category_id"
          onChange={handleChange}
        >
          <option value hidden>
            Select Category
          </option>
          {categoryOptions}
        </select>
        <br></br>
        <label>Length:</label>
        <input
          className="new-job-input"
          type="text"
          value={newJob.length}
          name="length"
          onChange={handleChange}
        ></input>
        <br></br>
        <label>Pay:</label>
        <input
          className="new-job-input"
          type="text"
          value={newJob.pay}
          name="pay"
          onChange={handleChange}
        ></input>
        <br></br>
        <label>Date:</label>
        <input
          className="new-job-input"
          type="date"
          min={moment(Date()).format("YYYY-MM-DD")}
          value={newJob.date}
          name="date"
          onChange={handleChange}
        ></input>
        <br></br>
        <label>Time:</label>
        <input
          className="new-job-input"
          type="time"
          value={newJob.time}
          name="time"
          onChange={handleChange}
        ></input>
        <br></br>
        <input className="new-job-submit" type="submit" value="Post Job" />
        {errors.map((error) => (
          <p key={error}>{error}</p>
        ))}
      </form>
    </div>
  );
}

export default NewJob;
