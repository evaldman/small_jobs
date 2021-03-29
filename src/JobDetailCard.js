import React, { useState } from "react";
// import { Link } from "react-router-dom";
import moment from "moment";
import { useHistory } from "react-router-dom";
// import "./JobDetailCard.css";

function JobDetailCard({
  job,
  setJobs,
  jobs,
  currentUser,
  setCurrentUser,
  calendarData,
  setCalendarData,
}) {
  const [info, setInfo] = useState(false);

  const history = useHistory();

  function infoClick() {
    setInfo((info) => !info);
  }

  function handleAccept() {
    fetch("http://localhost:3000/accepted_jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: false,
        job_id: job.id,
        user_id: currentUser.id,
        accept_status: true,
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
            date: moment(job.date).format("YYYY-MM-DD"),
          };
        });
        setCalendarData(newData);
        history.push("/profile");
      });
  }

  return (
    <div>
      <h1>{job.title}</h1>
      <h3>{job.description}</h3>
      <h3>Hours: {job.length}</h3>
      <h3>Pay: ${job.pay}/hr</h3>
      <h3>Start Time:</h3>
      <h3>When: {moment(job.date).format("dddd, MMMM Do YYYY")}</h3>
      <h3>Posted by: {job.user.name}</h3>
      <button onClick={infoClick}>{job.user.name} Info</button>
      <br></br>
      {info ? (
        <>
          <img
            className="profile-pic"
            src={job.user.image}
            alt={job.user.name}
          />
          <br></br>
          <p>{job.user.bio}</p>
          <br></br>
          <p>Number of Job Posts: {job.user.posted.length}</p>
        </>
      ) : null}
      <br></br>
      {currentUser && currentUser.purpose === "worker" ? (
        <button onClick={handleAccept}>Accept Job</button>
      ) : null}
    </div>
  );
}

export default JobDetailCard;
