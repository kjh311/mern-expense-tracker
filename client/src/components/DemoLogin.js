import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DayTheme, LoggedInContext } from "../App";
import Button from "./Button";
import axios from "axios";
import FadeWrapper from "./FadeWrapper";
import { FadeContext } from "./FadeContext";

const DemoLogin = ({ refreshFlag, setRefreshFlag }) => {
  const [dayTheme, setDayTheme] = useContext(DayTheme);
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const navigate = useNavigate();
  const { triggerFadeOut, setTriggerFadeOut } = useContext(FadeContext);

  const handleDemoLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        headers: {
          "Content-Type": "application/json",
        },
        email: "demo@example.com",
        password: "password123",
      });

      //   localStorage.setItem("token", res.data.token);

      //   setLoggedIn(true);
      //   console.log("refreshFlag", refreshFlag);
      setTriggerFadeOut(true);

      // Redirect to the app (adjust based on your routing)
      //   navigate("/dashboard");

      setTimeout(() => {
        setRefreshFlag(true);
        localStorage.setItem("token", res.data.token);
        setLoggedIn(true);
        navigate("/dashboard");

        localStorage.setItem("expense-tracker-username", "Demo User");
        setTriggerFadeOut(false);
      }, 300);

      if (!localStorage.getItem("Expense-Tracker-DayTheme")) {
        localStorage.setItem("Expense-Tracker-DayTheme", true);
        setDayTheme(true);
      }
    } catch (err) {
      console.error("Demo login failed", err);
    }
  };

  return (
    <FadeWrapper triggerFadeOut={triggerFadeOut}>
      <span className="flex justify-center items-center w-100 flex-col">
        <p>Or:</p>
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
