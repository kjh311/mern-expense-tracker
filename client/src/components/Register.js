import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import { DayTheme, LoggedInContext } from "../App";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import FadeWrapper from "./FadeWrapper";
import { FadeContext } from "./FadeContext";
import DemoLogin from "./DemoLogin";

const Register = ({ contentHeight, refreshFlag, setRefreshFlag }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [dayTheme] = useContext(DayTheme);
  const [showPassword, setShowPassword] = useState(false);
  const { triggerFadeOut, setTriggerFadeOut } = useContext(FadeContext);
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const url =
    process.env.NODE_ENV === "development"
      ? `http://localhost:5000/api/auth/register`
      : `https://mern-expense-tracker-t3dj.onrender.com/api/auth/register`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(url, {
        name,
        email,
        password,
      });

      const { token, user, message } = response.data;

      // Save token and user info
      localStorage.setItem("token", token);
      localStorage.setItem("expense-tracker-username", user.name);

      setMessage(message);
      setTriggerFadeOut(true);
      setLoggedIn(true);

      // Redirect after fade-out
      setTimeout(() => {
        navigate("/dashboard");
        setTriggerFadeOut(false);
      }, 300);
    } catch (error) {
      setMessage(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const capitalizeFirstLetter = (e) => {
    let string = e.target.value;
    setName(string.charAt(0).toUpperCase() + string.slice(1));
  };

  const handleLoginClick = () => {
    setTriggerFadeOut(true);
    setTimeout(() => {
      navigate("/login");
      setTriggerFadeOut(false);
    }, 300);
  };

  return (
    <FadeWrapper triggerFadeOut={triggerFadeOut}>
      <div
        style={{ minHeight: contentHeight }}
        className={`my-animation register-container flex items-center justify-center ${
          dayTheme ? "login-day-theme-bg" : "login-night-theme-bg"
        }`}
      >
        <div
          className={`my-animation rounded-xl p-8 w-full max-w-md ${
            dayTheme ? "day-theme-card" : "night-theme-card"
          }`}
        >
          <h2
            className={`my-animation text-2xl font-bold text-center mb-6 ${
              dayTheme ? "login-day-theme-heading" : "login-night-theme-heading"
            }`}
          >
            Create an Account
          </h2>

          <form
            onSubmit={handleSubmit}
            className={`space-y-4 flex justify-center flex-column`}
          >
            <Input
              type={"text"}
              placeholder={"Name"}
              value={name}
              onChange={capitalizeFirstLetter}
              required
            />
            <Input
              type={"email"}
              placeholder={"Email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="password-input-container relative m-0 p-0">
              <Input
                type={`${showPassword ? "text" : "password"}`}
                placeholder={"Password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div onClick={togglePassword} className="eye-icons">
                {!showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <Button
              type={"submit"}
              text={"Register"}
              color={dayTheme ? "blue" : "purple"}
            />
          </form>

          {message && <p className="text-center mt-4 text-sm">{message}</p>}

          <p className={`link-text`}>
            Already have an account?
            <span
              className={`ml-1 hover:underline text-center text-sm mt-4 cursor-pointer ${
                dayTheme ? "day-theme-link" : "night-theme-link"
              }`}
              onClick={handleLoginClick}
            >
              Login
            </span>
          </p>

          <DemoLogin
            refreshFlag={refreshFlag}
            setRefreshFlag={setRefreshFlag}
          />
        </div>
      </div>
    </FadeWrapper>
  );
};

export default Register;
