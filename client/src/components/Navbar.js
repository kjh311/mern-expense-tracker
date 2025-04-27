import React, { useContext, forwardRef } from "react";
import { LoggedInContext, DayTheme } from "../App";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import DayThemeToggle from "./DayThemeToggle";
import Button from "./Button";

const Navbar = ({ ref }) => {
  const [loggedIn] = useContext(LoggedInContext);
  const [dayTheme, setDayTheme] = useContext(DayTheme);

  // console.log("Name: " + data.user.name);
  // console.log("Daytheme from Navbar: ", dayTheme);

  return (
    <nav
      ref={ref}
      id="navbar"
      className={`z-10 w-full sticky top-0 nav-bar relative transition-all duration-300 ${
        dayTheme ? "day-nav text-white" : "night-nav text-blue-100"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-around">
        <Link
          to="/"
          className={`nav-bar-text text-2xl font-extrabold tracking-wide  transition ${
            dayTheme ? "text-white" : "night-footer-link"
          }`}
        >
          Budget Tracker
        </Link>

        <div>
          {loggedIn ? (
            <Logout />
          ) : (
            <Link to="/login">
              <Button text={"Login"} color={dayTheme ? "blue" : "purple"} />
              {/* <button className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-md shadow hover:bg-blue-100 transition">
                Login
              </button> */}
            </Link>
          )}
        </div>
      </div>
      <DayThemeToggle />
    </nav>
  );
};

export default Navbar;
