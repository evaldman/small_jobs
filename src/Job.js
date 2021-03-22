import React from "react";
import moment from "moment";

function Job({ job }) {
  return (
    <div>
      {job.title}: {job.description}. Time: {job.length} hours at ${job.pay}/hr,
      on {moment(job.date).format("MM-DD-YYYY")}
    </div>
  );
}

export default Job;
