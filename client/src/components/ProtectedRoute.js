import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { LoggedInContext } from "../App";
import React from "react";

const ProtectedRoute = ({ children }) => {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const token = localStorage.getItem("token");
  // console.log("Protected route");

  return token ? children : <Navigate to="/login" />;
};

export default React.memo(ProtectedRoute);
