import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JobDetailCard from "./JobDetailCard";

function JobDetail({
  currentUser,
  setJobs,
  jobs,
  setCurrentUser,
  calendarData,
  setCalendarData,
}) {
  const [job, setJob] = useState(null);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    fetch(`http://localhost:3000/jobs/${id}`)
      .then((response) => response.json())
      .then((jobData) => {
        setJob(jobData);
      });
  }, [id]);
  // console.log(job);

  return (
    <div>
      {job ? (
        <JobDetailCard
          jobs={jobs}
          job={job}
          setJobs={setJobs}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          calendarData={calendarData}
          setCalendarData={setCalendarData}
        />
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
}

export default JobDetail;
