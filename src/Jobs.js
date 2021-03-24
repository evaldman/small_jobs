import React, { useState } from "react";
import Job from "./Job";

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
    .map((job) => {
      return <Job key={job.id} job={job} />;
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
      <select onChange={(e) => setSelected(e.target.value)}>
        <option value hidden>
          Select Job Category
        </option>
        {categorySelect}
      </select>
      <button onClick={() => setSelected("")}>Show All</button>
      <h3>Welcome {currentUser.name}</h3>
      {jobsToDisplay}
    </div>
  );
}

export default Jobs;
