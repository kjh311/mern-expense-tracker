import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Input from "./Input";
import Button from "./Button";
import { DayTheme } from "../App";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import FadeWrapper from "./FadeWrapper"; // Import the FadeWrapper component

const Register = ({ contentHeight }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [dayTheme, setDayTheme] = useContext(DayTheme);
  const [showPassword, setShowPassword] = useState(false);
  const [triggerFadeOut, setTriggerFadeOut] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTriggerFadeOut(true); // Trigger fade-out effect

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

      // Redirect after fade-out
      setTimeout(() => {
        navigate("/login");
      }, 300); // Allow time for fade-out
    } catch (error) {
      setMessage(
        error.response ? error.response.data.error : "Something went wrong"
      );
    }
  };

  const handleLoginClick = () => {
    setTriggerFadeOut(true); // Trigger fade-out
    setTimeout(() => {
      navigate("/login"); // Navigate to login after fade-out
    }, 300);
  };

  return (
    <FadeWrapper triggerFadeOut={triggerFadeOut}>
      {/* Wrap the component with FadeWrapper */}
      <div
        style={{ minHeight: contentHeight }}
        className={`register-container flex items-center justify-center ${
          dayTheme ? "login-day-theme-bg" : "login-night-theme-bg"
        }`}
      >
        <div
          className={`rounded-xl p-8 w-full max-w-md ${
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
            className={`space-y-4 flex justify-center flex-column`}
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
            <div className="password-input-container relative">
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
              onClick={handleLoginClick} // Trigger fade-out when clicking Login link
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </FadeWrapper>
  );
};

export default Register;
