import React, { useContext, forwardRef, useEffect, useState } from "react";
import { LoggedInContext, DayTheme } from "../App";
import { Link, useNavigate } from "react-router-dom";
import Logout from "./Logout";
import DayThemeToggle from "./DayThemeToggle";
import Button from "./Button";
import { useFadeNavigate } from "../hooks/useFadeNavigate";
import { useLocation } from "react-router-dom";

const Navbar = ({ ref }) => {
  const [loggedIn] = useContext(LoggedInContext);
  const [dayTheme, setDayTheme] = useContext(DayTheme);
  const fadeNavigate = useFadeNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [currentPathState, setCurrentPathState] = useState(currentPath);

  useEffect(() => {
    setCurrentPathState(currentPath);
    // console.log("pathname: ", currentPath);
  }, [currentPath]);

  // console.log("Name: " + data.user.name);
  // console.log("Daytheme from Navbar: ", dayTheme);

  return (
    <nav
      ref={ref}
      id="navbar"
      className={`z-10 w-full sticky top-0 nav-bar relative my-animation ${
        dayTheme ? "day-nav text-white" : "night-nav text-blue-100"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-start sm:justify-around">
        <button
          onClick={() => fadeNavigate("/")}
          className={`nav-bar-text text-xl pr-4 sm:px-6 sm:text-2xl font-extrabold tracking-wide  transition ${
            dayTheme ? "text-white text-shadow" : "night-footer-link"
          }`}
        >
          {" "}
          <span>💸</span> Budget Tracker
        </button>

        <div>
          {loggedIn ? (
            <Logout />
          ) : (
            <Button
              text={"Login"}
              color={dayTheme ? "blue" : "purple"}
              onClick={() => fadeNavigate("/login")}
            />
          )}
        </div>
      </div>
      <DayThemeToggle />
    </nav>
  );
};

export default Navbar;
