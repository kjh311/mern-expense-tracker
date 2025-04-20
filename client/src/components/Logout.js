import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { LoggedInContext } from "../App";

const Logout = () => {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  //   const navigate = useNavigate();

  const handleLogout = () => {
    setLoggedIn(false);
    <Navigate to="/" />;
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
