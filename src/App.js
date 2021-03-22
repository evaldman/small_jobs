import "./App.css";
import Navbar from "./Navbar";
import { Switch, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Frontpage from "./Frontpage";
import Login from "./Login";
import Userpage from "./Userpage";
import Jobs from "./Jobs";
import Signup from "./Signup";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
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
            />
          )}
        </Route>
        <Route exact path="/jobs">
          {currentUser && <Jobs currentUser={currentUser} />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
