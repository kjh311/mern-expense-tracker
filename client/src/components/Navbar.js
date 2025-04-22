import React, { useContext } from "react";
import { LoggedInContext } from "../App";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const Navbar = () => {
  const [loggedIn] = useContext(LoggedInContext);

  return (
    <nav className="z-10 w-full bg-blue-600 text-white sticky top-0 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide text-blue-100 hover:text-blue-200 transition"
        >
          MyBudgetApp
        </Link>

        <div>
          {loggedIn ? (
            <Logout />
          ) : (
            <Link to="/login">
              <button className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-md shadow hover:bg-blue-100 transition">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
