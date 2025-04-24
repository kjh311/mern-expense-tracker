import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard"; // example protected page
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";

export const LoggedInContext = React.createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  return (
    <div className="App">
      <LoggedInContext.Provider value={[loggedIn, setLoggedIn]}>
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
        <Footer />
      </LoggedInContext.Provider>
    </div>
  );
}

export default App;
