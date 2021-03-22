import React, { useEffect, useState } from "react";
import Job from "./Job";

function Jobs({ currentUser }) {
  const [jobs, setJobs] = useState([]);
  // console.log(currentUser);

  useEffect(() => {
    fetch("http://localhost:3000/jobs")
      .then((response) => response.json())
      .then((jobsData) => setJobs(jobsData));
  }, []);

  const jobsToDisplay = jobs.map((job) => {
    return <Job key={job.id} job={job} />;
  });
  return (
    <div>
      <h3>Welcome {currentUser.name}</h3>
      {jobsToDisplay}
    </div>
  );
}

export default Jobs;
