import "./App.css";
import Navbar from "./Navbar";
import { Switch, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Frontpage from "./Frontpage";
import Login from "./Login";
import Userpage from "./Userpage";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  console.log(currentUser);
  return (
    <div className="App">
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Switch>
        <Route exact path="/">
          <Frontpage />
        </Route>
        <Route exact path="/login">
          <Login setCurrentUser={setCurrentUser} />
        </Route>
        <Route exact path="/profile">
          {currentUser && <Userpage currentUser={currentUser} />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
