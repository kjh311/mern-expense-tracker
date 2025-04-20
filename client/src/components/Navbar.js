import React, { useContext } from "react";
import { LoggedInContext } from "../App";
import { Link } from "react-router-dom";
import Logout from "./Logout";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);

  return (
    <div className="w-100 bg-blue-400 sticky top-0 p-2 text-3xl font-bold flex justify-between">
      <p>Navbar</p>
      {loggedIn ? (
        <Logout />
      ) : (
        <Link to="/login">
          <button>Login</button>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
