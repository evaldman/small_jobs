import React, { useState } from "react";
import Job from "./Job";
import "./job.css";

function Jobs({ currentUser, jobs, categories }) {
  const [selected, setSelected] = useState("");
  // console.log(categories);
  // console.log(selected);
  // console.log(typeof selected);

  // function handleSelected(e) {
  //   setSelected(e.target.value);
  // }
  // console.log(jobs);

  const openJobs = jobs.filter((job) => job.accept_status === false);
  // const filteredJobs = openJobs.filter((job) => job.job_category === selected);
  const jobsToDisplay = openJobs
    .filter((job) =>
      !selected ? true : job.job_category === parseInt(selected)
    )
    .map((job, index) => {
      return <Job key={index} job={job} />;
    });

  const categorySelect = categories.map((category) => {
    // console.log(category);
    return (
      <option key={category.id} value={category.id}>
        {" "}
        {category.name}
      </option>
    );
  });

  return (
    <div>
      <h3 className="job-user">Welcome {currentUser.name}</h3>
      <br></br>
      <select
        className="job-select"
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value hidden>
          Select Job Category
        </option>
        {categorySelect}
      </select>
      <button onClick={() => setSelected("")}>Show All</button>

      {jobsToDisplay}
    </div>
  );
}

export default Jobs;
