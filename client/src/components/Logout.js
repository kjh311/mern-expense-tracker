import React, { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { LoggedInContext } from "../App";
import { jwtDecode } from "jwt-decode";

const Logout = () => {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  //   const navigate = useNavigate();

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("token");
    console.log("User logged out");

    <Navigate to="/" />;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const { exp } = jwtDecode(token);
      if (Date.now() >= exp * 5000) {
        handleLogout();
      }
    }
  }, []);

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
