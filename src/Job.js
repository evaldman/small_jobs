import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import "./job.css";

function Job({ job }) {
  return (
    <div>
      <ul className="jobs-list">
        <li className="jobs-lines">
          <Link className="job-lines-link" to={`/jobs/${job.id}`}>
            <b>{job.title}:</b> {job.description}. <br></br> On:{" "}
            <b>{moment.utc(job.date).format("MM-DD-YYYY")}</b> for {job.length}{" "}
            hours at ${job.pay}
            /hr.
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Job;
