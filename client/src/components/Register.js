import React, { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import { DayTheme } from "../App";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [dayTheme, setDayTheme] = useContext(DayTheme);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response ? error.response.data.error : "Something went wrong"
      );
    }
  };

  return (
    <div
      className={`register-container flex items-center justify-center ${
        dayTheme ? "login-day-theme-bg" : "login-night-theme-bg"
      }`}
    >
      <div
        className={`rounded-xl  p-8 w-full max-w-md transition-all duration-300 ${
          dayTheme ? "day-theme-card" : "night-theme-card"
        }`}
      >
        <h2
          className={`text-2xl font-bold text-center mb-6 ${
            dayTheme ? "login-day-theme-heading" : "login-night-theme-heading"
          }`}
        >
          Create an Account
        </h2>

        <form
          onSubmit={handleSubmit}
          className={`transition-all duration-300 ${
            dayTheme ? "register-form-day" : "register-form-night"
          } space-y-4 flex justify-center flex-column`}
        >
          <Input
            type={"text"}
            placeholder={"Name"}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type={"email"}
            placeholder={"Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type={"password"}
            placeholder={"Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type={"submit"}
            text={"Register"}
            color={dayTheme ? "blue" : "purple"}
          />

          {/* <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition duration-200"
          >
            Register
          </button> */}
        </form>

        {message && <p className="text-center mt-4 text-sm ">{message}</p>}

        <p
          className={`text-center text-sm mt-4 ${
            dayTheme ? "day-theme-link" : "night-theme-link"
          }`}
        >
          Already have an account?
          <Link to="/login" className="ml-1 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
