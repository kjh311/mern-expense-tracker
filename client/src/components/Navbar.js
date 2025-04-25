import React, { useContext } from "react";
import { LoggedInContext } from "../App";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import DayThemeToggle from "./DayThemeToggle";
import Button from "./Button";

const Navbar = () => {
  const [loggedIn] = useContext(LoggedInContext);
  // const [dayTheme, setDayTheme] = useContext(DayTheme);

  // console.log("Name: " + data.user.name);
  // console.log("Daytheme from Navbar: ", dayTheme);

  return (
    <nav className="z-10 w-full  text-white sticky top-0 nav-bar relative">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-around">
        <Link
          to="/"
          className="nav-bar-text text-2xl font-extrabold tracking-wide text-blue-100 hover:text-blue-200 transition"
        >
          Budget Tracker
        </Link>

        <div>
          {loggedIn ? (
            <Logout />
          ) : (
            <Link to="/login">
              <Button text={"Login"} color={"white"} />
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
