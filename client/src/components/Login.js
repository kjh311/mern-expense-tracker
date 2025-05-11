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
  loading,
  setLoading,
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
      : `https://mern-expense-tracker-v5y1.onrender.com/api/auth/login`;
  //: `https://mern-expense-tracker-production-b291.up.railway.app/api/auth/login`;
  // : `https://mern-expense-tracker.fly.dev/api/auth/login`;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
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

      console.log("Login response status:", response.status);
      const data = await response.json();
      console.log("Login response data:", data);
      console.log("JWT_SECRET exists?", !!process.env.JWT_SECRET);

      if (!data.token) return alert(data.message || "Login failed");

      setTriggerFadeOut(true);

      setTimeout(() => {
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
        navigate("/dashboard");
        setLoading(false);

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
      setLoading(false);
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
      <br />
      <br />
      <div
        style={{ minHeight: contentHeight }}
        className={`login-container  ${
          dayTheme ? "login-day-theme-bg" : "login-night-theme-bg"
        }`}
      >
        <div
          className={`login-card pt-3 pb-2 ${
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
            onSubmit={handleLoginSubmit}
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
                className={`eye-icons  ${
                  dayTheme ? "eye-icon-day" : "eye-icon-night"
                }`}
              >
                {!showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {!loading ? (
              <span className="flex justify-center">
                <Button
                  type={"submit"}
                  text={"Login"}
                  color={dayTheme ? "blue" : "purple"}
                />
              </span>
            ) : (
              <div className="w-100 flex justify-center mt-4 mb-2">
                <span className="loader"></span>
                {/* <span class="loader">L &nbsp; ading</span> */}
              </div>
            )}
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
            {!loading && (
              <DemoLogin
                refreshFlag={refreshFlag}
                setRefreshFlag={setRefreshFlag}
                loading={loading}
                setLoading={setLoading}
              />
            )}
          </p>
        </div>
      </div>
    </FadeWrapper>
  );
};

export default Login;
