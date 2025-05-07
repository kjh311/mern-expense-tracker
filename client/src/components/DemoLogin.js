import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DayTheme, LoggedInContext } from "../App";
import Button from "./Button";
import axios from "axios";
import FadeWrapper from "./FadeWrapper";
import { FadeContext } from "./FadeContext";

const DemoLogin = ({ setRefreshFlag, loading, setLoading }) => {
  const [dayTheme, setDayTheme] = useContext(DayTheme);
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const navigate = useNavigate();
  const { triggerFadeOut, setTriggerFadeOut } = useContext(FadeContext);

  const url =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8080/api/auth/login`
      : `https://mern-expense-tracker-v5y1.onrender.com/api/auth/login`;
  // : `https://mern-expense-tracker-production-b291.up.railway.app/api/auth/login`;
  //  : `https://mern-expense-tracker.fly.dev/api/auth/login`;

  const handleDemoLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post(url, {
        headers: {
          "Content-Type": "application/json",
        },
        email: "demo@example.com",
        password: "password123",
      });

      setTriggerFadeOut(true);

      setTimeout(() => {
        setRefreshFlag(true);
        localStorage.setItem("token", res.data.token);
        setLoggedIn(true);
        navigate("/dashboard");
        setLoading(false);

        localStorage.setItem("expense-tracker-username", "Demo User");
        setTriggerFadeOut(false);
      }, 300);

      if (!localStorage.getItem("Expense-Tracker-DayTheme")) {
        localStorage.setItem("Expense-Tracker-DayTheme", true);
        setDayTheme(true);
      }
    } catch (err) {
      console.error("Demo login failed", err);
      setLoading(false);
    }
  };

  return (
    <FadeWrapper triggerFadeOut={triggerFadeOut}>
      <span className="flex justify-center items-center w-100 flex-col ">
        <span className="mb-1">Or:</span>
        {/* <br /> */}
        <Button
          text={"Demo Login"}
          color={dayTheme ? "blue" : "purple"}
          onClick={handleDemoLogin}
        />
      </span>
    </FadeWrapper>
  );
};

export default DemoLogin;
