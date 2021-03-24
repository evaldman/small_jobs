import React, { useState } from "react";
import Job from "./Job";

function Jobs({ currentUser, jobs, categories }) {
  const [selected, setSelected] = useState("");
  // console.log(categories);
  // console.log(selected);
  const openJobs = jobs.filter((job) => job.accept_status === false);
  const jobsToDisplay = openJobs.map((job) => {
    return <Job key={job.id} job={job} />;
  });

  const categorySelect = categories.map((category) => {
    // console.log(category);
    return (
      <option key={category.id} value={category.jobs.map((job) => job.title)}>
        {" "}
        {category.name}
      </option>
    );
  });

  function handleSelected(e) {
    setSelected(e.target.value);
  }

  return (
    <div>
      <select onChange={handleSelected}>
        <option value hidden>
          Select Job Category
        </option>
        {categorySelect}
      </select>
      <button>Sort</button>
      <h3>Welcome {currentUser.name}</h3>
      {jobsToDisplay}
    </div>
  );
}

export default Jobs;
