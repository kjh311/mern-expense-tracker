// import logo from "./logo.svg";
import React, { useState } from "react";
import "./App.css";
// import AppRouter from "./components/Router";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard"; // example protected page
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";

export const LoggedInContext = React.createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  return (
    <LoggedInContext.Provider value={[loggedIn, setLoggedIn]}>
      {/* <div className="App">
        <h1 className="text-3xl font-bold underline">
          Hello world!
          <br />
        </h1>

      </div> */}
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </LoggedInContext.Provider>
  );
}

export default App;
