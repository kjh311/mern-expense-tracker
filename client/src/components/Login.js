import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
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
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Login request failed");
      }

      const data = await response.json();
      console.log(data);

      if (data.token === undefined) return;

      if (data.token) {
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
        navigate("/dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
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
      <div>
        <Link to="/register">
          <button className="p-2 m-2 bg-red-400 border">Or Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
