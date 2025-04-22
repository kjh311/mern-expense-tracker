import React, { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { LoggedInContext } from "../App";
import { jwtDecode } from "jwt-decode";

const Logout = () => {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("token");
    console.log("User logged out");

    <Navigate to="/login" />;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const { exp } = jwtDecode(token);
      console.log("Token Expiration (ms):", exp * 1000);
      console.log("Current Time (ms):", Date.now());
      if (Date.now() >= exp * 1000) {
        handleLogout(); // Call logout if the token is expired
      }
    }
  }, []);

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
