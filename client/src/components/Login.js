import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LoggedInContext, DayTheme } from "../App";
import Input from "./Input";
import Button from "./Button";

const Login = () => {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [dayTheme, setDayTheme] = useContext(DayTheme);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

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
        setMessage("Login request failed");
        throw new Error("Login request failed");
      }

      const data = await response.json();
      // console.log("Name: " + data.user.name);

      if (!data.token) return alert(data.message || "Login failed");

      localStorage.setItem("token", data.token);
      setLoggedIn(true);
      navigate("/dashboard");
      localStorage.setItem("expense-tracker-username", data.user.name);
      if (!localStorage.getItem("Expense-Tracker-DayTheme")) {
        localStorage.setItem("Expense-Tracker-DayTheme", true);
        setDayTheme(true);
      } else {
        setDayTheme(localStorage.getItem("Expense-Tracker-DayTheme"));
      }
    } catch (error) {
      console.error(error);
      // alert("An error occurred. Please try again.");
    }
  };

  return (
    <div
      className={`login-container  ${
        dayTheme ? "login-day-theme-bg" : "login-night-theme-bg"
      }`}
    >
      <div
        className={`login-card ${
          dayTheme ? "day-theme-card" : "night-theme-card "
        }`}
      >
        <h2
          className={`login-heading ${
            dayTheme ? "login-day-theme-heading" : "login-night-theme-heading"
          }`}
        >
          Login
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 flex justify-center flex-column "
        >
          <Input
            type={"email"}
            name={"email"}
            value={formData.email}
            onChange={handleChange}
            placeholder={"Email"}
            required
          />
          <Input
            type={"password"}
            name={"password"}
            value={formData.password}
            onChange={handleChange}
            placeholder={"Password"}
            required
          />
          <Button
            type={"submit"}
            text={"Login"}
            color={dayTheme ? "blue" : "purple"}
          />
        </form>
        {message && <p className="text-center mt-4 text-sm">{message}</p>}

        <p className={`link-text`}>
          Don’t have an account?
          <Link
            to="/register"
            className={`ml-1 hover:underline ${
              dayTheme ? "day-theme-link" : "night-theme-link"
            }`}
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
