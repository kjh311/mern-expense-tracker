import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoggedInContext, DayTheme, DateContext } from "../App";
import { jwtDecode } from "jwt-decode";
import Button from "./Button";
import { FadeContext } from "./FadeContext";

const Logout = () => {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [dateState, setDateState] = useContext(DateContext);
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

      //reset current month/year
      const now = new Date();
      setDateState({ month: now.getMonth(), year: now.getFullYear() });
    }, 200);
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
    <span className="logout-button">
      <Button
        onClick={handleLogout}
        text={"Logout"}
        color={dayTheme ? "white" : "purple"}
      />
    </span>
  );
};

export default Logout;
