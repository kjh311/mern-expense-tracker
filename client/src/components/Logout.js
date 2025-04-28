import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedInContext, DayTheme } from "../App";
import { jwtDecode } from "jwt-decode";
import Button from "./Button";
import { FadeContext } from "./FadeContext";

const Logout = () => {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [dayTheme, setDayTheme] = useContext(DayTheme);
  const { setTriggerFadeOut } = useContext(FadeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setTriggerFadeOut(true); // 1. Start fade-out

    setTimeout(() => {
      setLoggedIn(false);
      localStorage.removeItem("token");
      console.log("User logged out");

      navigate("/"); // 2. Navigate home AFTER fade-out
      setTriggerFadeOut(false); // 3. Reset fade
    }, 300); // Wait 300ms (or however long your fade animation takes)
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const { exp } = jwtDecode(token);
      // console.log("Token Expiration (ms):", exp * 1000);
      // console.log("Current Time (ms):", Date.now());
      if (Date.now() >= exp * 1000) {
        handleLogout(); // Call logout if the token is expired
      }
    }
  }, []);

  return (
    <Button
      onClick={handleLogout}
      text={"Logout"}
      color={dayTheme ? "white" : "purple"}
    />
  );
};

export default Logout;
