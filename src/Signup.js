import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";

function Signup({ setCurrentUser }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    bio: "",
    image: "",
    purpose: "",
  });
  const history = useHistory();
  const [errors, setErrors] = useState([]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSignupSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:3000/signup", {
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
      <form className="login-form" onSubmit={handleSignupSubmit}>
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

        <label>Password</label>
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
        <label>Name</label>
        <input
          autoComplete="name"
          className="login-input"
          type="text"
          name="name"
          value={formData.name}
          placeholder="name..."
          onChange={handleChange}
        />

        <br />
        <label>Bio</label>
        <textarea
          // autoComplete="bio"
          className="login-input"
          // type="text"
          name="bio"
          value={formData.bio}
          placeholder="bio..."
          onChange={handleChange}
        />

        <br />
        <label>Profile Pic</label>
        <input
          // autoComplete="username"
          className="login-input"
          type="text"
          name="image"
          value={formData.image}
          placeholder="insert picture..."
          onChange={handleChange}
        />

        <br />
        <label>Purpose</label>
        <select
          className="login-input"
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
        >
          <option value hidden>
            Seeking or Posting?
          </option>
          <option>employer</option>
          <option>worker</option>
        </select>
        <input className="login-button" type="submit" value="Sign Up!" />
        {errors.map((error) => (
          <p key={error}>{error}</p>
        ))}
      </form>
    </div>
  );
}

export default Signup;
