import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedInContext, DayTheme } from "../App";
import Input from "./Input";
import Button from "./Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import FadeWrapper from "./FadeWrapper";
import { FadeContext } from "./FadeContext";
import DemoLogin from "./DemoLogin";

const Login = ({
  contentHeight,
  formData,
  setFormData,
  refreshFlag,
  setRefreshFlag,
}) => {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [dayTheme, setDayTheme] = useContext(DayTheme);
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { triggerFadeOut, setTriggerFadeOut } = useContext(FadeContext);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const url =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8080/api/auth/login`
      : // : `https://mern-expense-tracker-t3dj.onrender.com/api/auth/login`;
        // `https://mern-expense-tracker-production-b291.up.railway.app/api/auth/login`;
        `https://https://mern-expense-tracker.fly.dev/api/auth/login`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(url, {
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

      if (!data.token) return alert(data.message || "Login failed");

      setTriggerFadeOut(true);

      setTimeout(() => {
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
        navigate("/dashboard");

        localStorage.setItem("expense-tracker-username", data.user.name);
        setTriggerFadeOut(false);
      }, 300);

      if (!localStorage.getItem("Expense-Tracker-DayTheme")) {
        localStorage.setItem("Expense-Tracker-DayTheme", true);
        setDayTheme(true);
      } else {
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleRegisterClick = () => {
    setTriggerFadeOut(true);
    setTimeout(() => {
      navigate("/register");
      setTriggerFadeOut(false);
    }, 300);
  };

  return (
    <FadeWrapper triggerFadeOut={triggerFadeOut}>
      <div
        style={{ minHeight: contentHeight }}
        className={`login-container  ${
          dayTheme ? "login-day-theme-bg" : "login-night-theme-bg"
        }`}
      >
        <div
          className={`login-card ${
            dayTheme ? "day-theme-card" : "night-theme-card "
          }`}
        >
          <p
            className={`login-heading text-sm sm:text-xl ${
              dayTheme ? "login-day-theme-heading" : "login-night-theme-heading"
            }`}
          >
            Login
          </p>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 flex justify-center flex-column form"
          >
            <Input
              type={"email"}
              name={"email"}
              value={formData.email}
              onChange={handleChange}
              placeholder={"Email"}
              required
            />
            <div className="password-input-container relative">
              <Input
                type={`${showPassword ? "text" : "password"}`}
                name={"password"}
                value={formData.password}
                onChange={handleChange}
                placeholder={"Password"}
                required
              />
              <div
                onClick={togglePassword}
                className={`eye-icons ${
                  dayTheme ? "eye-icon-day" : "eye-icon-night"
                }`}
              >
                {!showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <Button
              type={"submit"}
              text={"Login"}
              color={dayTheme ? "blue" : "purple"}
            />
          </form>
          {message && <p className="text-center mt-4 text-sm">{message}</p>}

          <p className={`link-text`}>
            Don’t have an account?
            <span
              onClick={handleRegisterClick}
              className={`ml-1 hover:underline cursor-pointer ${
                dayTheme ? "day-theme-link" : "night-theme-link"
              }`}
            >
              Register
            </span>
            <br />
            <br />
            <DemoLogin
              refreshFlag={refreshFlag}
              setRefreshFlag={setRefreshFlag}
            />
          </p>
        </div>
      </div>
    </FadeWrapper>
  );
};

export default Login;
