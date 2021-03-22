import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";

function Login({ setCurrentUser }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const history = useHistory();
  const [errors, setErrors] = useState([]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleLoginSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          // console.log(data.user);
          setCurrentUser(data.user);
          localStorage.setItem("token", data.token);
          history.push("/profile");
        }
      });
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLoginSubmit}>
        <label>Username</label>
        <input
          autoComplete="username"
          className="login-input"
          type="text"
          name="username"
          value={formData.username}
          placeholder="username..."
          onChange={handleChange}
        />

        <br />

        <lable>Password</lable>
        <input
          autoComplete="current-password"
          className="login-input"
          type="password"
          name="password"
          value={formData.password}
          placeholder="password..."
          onChange={handleChange}
        />

        <br />
        <input className="login-button" type="submit" value="Sign In!" />
        {errors.map((error) => (
          <p key={error}>{error}</p>
        ))}
      </form>
    </div>
  );
}

export default Login;
