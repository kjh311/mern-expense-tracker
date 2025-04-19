// src/Router.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {" "}
        {/* Use Routes instead of Switch */}
        <Route exact path="/register" element={<Register />} />{" "}
        {/* Use element instead of component */}
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
