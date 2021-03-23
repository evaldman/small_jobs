import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

function Job({ job }) {
  return (
    <div>
      <Link to={`/jobs/${job.id}`}>
        {job.title}: {job.description}. Time: {job.length} hours at ${job.pay}
        /hr, on {moment(job.date).format("MM-DD-YYYY")}
      </Link>
    </div>
  );
}

export default Job;
