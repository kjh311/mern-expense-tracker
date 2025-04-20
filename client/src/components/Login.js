import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedInContext } from "../App";

const Login = () => {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle the login API request here
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);

    // in your Login.js or API response handler
    if (response.ok) {
      //   localStorage.setItem("token", "loggedIn"); // Use actual token from API
      setLoggedIn(true);
      navigate("/dashboard"); // ✅ Navigate after login
    } else {
      alert(data.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="p-2 m-2 border"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          className="p-2 m-2 border"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button className="m-2 p-2 border" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
