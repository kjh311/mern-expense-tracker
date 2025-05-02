import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DayTheme } from "../App";
import Button from "./Button";
import axios from "axios";
import { LoggedInContext } from "../App";

const DemoLogin = ({ refreshFlag, setRefreshFlag }) => {
  const [dayTheme, setDayTheme] = useContext(DayTheme);
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const navigate = useNavigate();

  const handleDemoLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        headers: {
          "Content-Type": "application/json",
        },
        email: "demo@example.com",
        password: "password123",
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("expense-tracker-username", "Demo User");
      setRefreshFlag(true);
      setLoggedIn(true);
      console.log("refreshFlag", refreshFlag);

      // Redirect to the app (adjust based on your routing)
      navigate("/dashboard");
    } catch (err) {
      console.error("Demo login failed", err);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center w-100 flex-col">
        <p>Or:</p>
        <Button
          text={"Demo Login"}
          color={dayTheme ? "blue" : "purple"}
          onClick={handleDemoLogin}
        />
      </div>
    </>
  );
};

export default DemoLogin;
