import "./App.css";
import Navbar from "./Navbar";
import { Switch, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Frontpage from "./Frontpage";
import Login from "./Login";
import Userpage from "./Userpage";
import Jobs from "./Jobs";
import Signup from "./Signup";
import JobDetail from "./JobDetail";
import NewJob from "./NewJob";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState([]);
  // console.log(currentUser);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:3000/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((user) => {
          setCurrentUser(user);
        });
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/jobs")
      .then((response) => response.json())
      .then((jobsData) => setJobs(jobsData));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  return (
    <div>
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Switch>
        <Route exact path="/">
          <Frontpage />
        </Route>
        <Route exact path="/login">
          <Login setCurrentUser={setCurrentUser} />
        </Route>
        <Route exact path="/signup">
          <Signup setCurrentUser={setCurrentUser} />
        </Route>
        <Route exact path="/profile">
          {currentUser && (
            <Userpage
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              jobs={jobs}
              setJobs={setJobs}
            />
          )}
        </Route>
        <Route exact path="/jobs">
          {currentUser && (
            <Jobs
              currentUser={currentUser}
              jobs={jobs}
              setJobs={setJobs}
              categories={categories}
            />
          )}
        </Route>
        <Route exact path="/jobs/:id">
          <JobDetail
            jobs={jobs}
            setCurrentUser={setCurrentUser}
            currentUser={currentUser}
            setJobs={setJobs}
          />
        </Route>
        <Route exact path="/newjob">
          {currentUser && (
            <NewJob
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
              jobs={jobs}
              setJobs={setJobs}
              categories={categories}
            />
          )}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
