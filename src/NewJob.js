import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

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
  });

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
    <div>
      <h1>Create A New Job</h1>
      <br></br>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          value={newJob.title}
          name="title"
          onChange={handleChange}
        ></input>
        <br></br>
        <label>Description:</label>
        <textarea
          value={newJob.description}
          name="description"
          onChange={handleChange}
        ></textarea>
        <br></br>
        <label>Category: </label>
        <select
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
          type="text"
          value={newJob.length}
          name="length"
          onChange={handleChange}
        ></input>
        <br></br>
        <label>Pay:</label>
        <input
          type="text"
          value={newJob.pay}
          name="pay"
          onChange={handleChange}
        ></input>
        <br></br>
        <label>Date:</label>
        <input
          type="date"
          value={newJob.date}
          name="date"
          onChange={handleChange}
        ></input>
        <br></br>
        <label>Time:</label>
        <input
          type="time"
          value={newJob.time}
          name="time"
          onChange={handleChange}
        ></input>
        <br></br>
        <input type="submit" value="Post Job" />
      </form>
    </div>
  );
}

export default NewJob;
