import React, { useState } from "react";
// import { Link } from "react-router-dom";
import moment from "moment";
import "moment-timezone";
import { useHistory } from "react-router-dom";
import "./JobDetailCard.css";

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
  // console.log(job.date);
  const doubleBooked = currentUser.accepted.filter(
    (accept) => accept.date === job.date
  );
  const doubleBookedJobs = doubleBooked.map((acc) => acc.date);
  // function testing() {
  //   if (doubleBookedJobs == job.date) {
  //     console.log(true);
  //   } else {
  //     console.log(false);
  //   }
  // }

  function handleAccept() {
    if (doubleBookedJobs == job.date) {
      alert("You already have a job booked on this date");
    } else if (currentUser.name === job.user.name) {
      alert("You posted this job");
    } else {
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
              date: moment.utc(job.date).format("YYYY-MM-DD"),
            };
          });
          setCalendarData(newData);
          history.push("/profile");
        });
    }
  }

  return (
    <div className="detail-container">
      <div className="container">
        <header className="job-title">
          {" "}
          <h1>{job.title}</h1>
        </header>
        <div className="content">
          <div className="sidebar">
            <div className="aside">
              <h3>Hours: {job.length}</h3>
              <h3>Pay: ${job.pay}/hr</h3>
              <h3>Start Time: {moment.utc(job.time).format("hh:mm A")}</h3>
            </div>
            <div className="aside2">
              <h3>Posted by: {job.user.name}</h3>
              <button onClick={infoClick}>
                {!info ? "Show Information" : "Hide"}
              </button>
              <br></br>

              {currentUser && currentUser.purpose === "worker" ? (
                <button onClick={handleAccept}>Accept Job</button>
              ) : null}
              {info ? (
                <>
                  <br></br>
                  <p>Number of Job Posts: {job.user.posted.length}</p>
                </>
              ) : null}
            </div>
          </div>
          <div className="main">
            <h4>When: {moment.utc(job.date).format("dddd, MMMM Do YYYY")}</h4>
            <h4>Location: {job.address}</h4>
            <p>{job.description}</p>
            <br></br>
            {info ? (
              <>
                <img
                  className="profile-pic"
                  src={job.user.image}
                  alt={job.user.name}
                />

                <p>{job.user.bio}</p>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
    // <div>
    //   <h1>{job.title}</h1>
    //   <h3>{job.description}</h3>
    //   <h3>Hours: {job.length}</h3>
    //   <h3>Pay: ${job.pay}/hr</h3>
    //   <h3>Start Time: {moment.utc(job.time).format("hh:mm A")}</h3>
    //   <h3>When: {moment.utc(job.date).format("dddd, MMMM Do YYYY")}</h3>
    //   <h3>
    //     Posted by: {job.user.name} <></> <></>
    //     <button onClick={infoClick}>{!info ? "Info" : "Hide"}</button>
    //   </h3>
    //   <br></br>
    // {info ? (
    //   <>
    //     <img
    //       className="profile-pic"
    //       src={job.user.image}
    //       alt={job.user.name}
    //     />
    //     <br></br>
    //     <p>{job.user.bio}</p>
    //     <br></br>
    //     <p>Number of Job Posts: {job.user.posted.length}</p>
    //   </>
    // ) : null}
    //   <br></br>
    //   {currentUser && currentUser.purpose === "worker" ? (
    //     <button onClick={handleAccept}>Accept Job</button>
    //   ) : null}
    // </div>
  );
}

export default JobDetailCard;
