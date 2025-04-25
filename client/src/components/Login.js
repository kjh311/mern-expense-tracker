import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LoggedInContext, DayTheme } from "../App";
import Input from "./Input";

const Login = () => {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [dayTheme, setDayTheme] = useContext(DayTheme);
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

      if (!response.ok) throw new Error("Login request failed");

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
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?
          <Link to="/register" className="text-indigo-600 hover:underline ml-1">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
