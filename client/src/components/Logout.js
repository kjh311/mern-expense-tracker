import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedInContext, DayTheme } from "../App";
import { jwtDecode } from "jwt-decode";
import Button from "./Button";
import { FadeContext } from "./FadeContext";

const Logout = () => {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [dayTheme] = useContext(DayTheme);
  const { setTriggerFadeOut } = useContext(FadeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setTriggerFadeOut(true);

    setTimeout(() => {
      setLoggedIn(false);
      localStorage.removeItem("token");
      console.log("User logged out");

      navigate("/");
      setTriggerFadeOut(false);
    }, 300);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const { exp } = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        handleLogout();
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
