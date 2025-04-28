import React, { useState, useRef } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import UpdateHeights from "./components/UpdateHeights";
import { FadeProvider } from "./components/FadeContext";

export const LoggedInContext = React.createContext();
export const TransactionsTotal = React.createContext();
export const DayTheme = React.createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const [dayTheme, setDayTheme] = useState(() => {
    const stored = localStorage.getItem("Expense-Tracker-DayTheme");
    return stored === "true";
  });

  // console.log("Daytheme from appjs: ", dayTheme);

  const [total, setTotal] = useState({
    expenseSpent: 0,
    incomeSpent: 0,
    savingsSpent: 0,
    billsSpent: 0,
    expenseBudget: 0,
    incomeBudget: 0,
    savingsBudget: 0,
    billsBudget: 0,
  });

  const navbarRef = useRef(null);
  const footerRef = useRef(null);
  const [contentHeight, setContentHeight] = useState("100vh");

  return (
    <div className={`App ${dayTheme ? "day-app" : "night-app"}`}>
      <FadeProvider>
        <DayTheme.Provider value={[dayTheme, setDayTheme]}>
          <TransactionsTotal.Provider value={[total, setTotal]}>
            <LoggedInContext.Provider value={[loggedIn, setLoggedIn]}>
              <Router>
                <UpdateHeights
                  navbarRef={navbarRef}
                  footerRef={footerRef}
                  setContentHeight={setContentHeight}
                />
                <Navbar ref={navbarRef} />
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={<Home contentHeight={contentHeight} />}
                  />
                  <Route
                    exact
                    path="/register"
                    element={<Register contentHeight={contentHeight} />}
                  />
                  <Route
                    exact
                    path="/login"
                    element={<Login contentHeight={contentHeight} />}
                  />
                  <Route
                    exact
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard contentHeight={contentHeight} />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </Router>
              <Footer ref={navbarRef} />
            </LoggedInContext.Provider>
          </TransactionsTotal.Provider>
        </DayTheme.Provider>
      </FadeProvider>
    </div>
  );
}

export default App;
