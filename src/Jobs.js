import React from "react";
import Job from "./Job";

function Jobs({ currentUser, jobs, categories }) {
  // console.log(categories);

  // useEffect(() => {
  //   fetch("http://localhost:3000/jobs")
  //     .then((response) => response.json())
  //     .then((jobsData) => setJobs(jobsData));
  // }, []);

  const openJobs = jobs.filter((job) => job.accept_status !== true);
  const jobsToDisplay = openJobs.map((job) => {
    return <Job key={job.id} job={job} />;
  });

  const categorySelect = categories.map((category) => {
    return (
      <option key={category.id} value={category.jobs.title}>
        {" "}
        {category.name}
      </option>
    );
  });

  return (
    <div>
      <select>
        <option value hidden>
          Select Job Category
        </option>
        {categorySelect}
      </select>
      <h3>Welcome {currentUser.name}</h3>
      {jobsToDisplay}
    </div>
  );
}

export default Jobs;
