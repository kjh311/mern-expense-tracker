import React, { useState, useRef } from "react";
import "./styles/App.css";
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
import "bootstrap/dist/css/bootstrap.min.css";
import QuickTransactionModal from "./components/QuickTransactionModal";

export const LoggedInContext = React.createContext();
export const TransactionsTotal = React.createContext();
export const DayTheme = React.createContext();
export const DateContext = React.createContext();
// export const DataContext = React.createContext();

function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  // const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dayTheme, setDayTheme] = useState(() => {
    const stored = localStorage.getItem("Expense-Tracker-DayTheme");
    return stored === "true";
  });
  const now = new Date();
  const [dateState, setDateState] = useState({
    month: now.getMonth(),
    year: now.getFullYear(),
  });

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

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // console.log("NODE: ", process.env.NODE_ENV);

  const navbarRef = useRef(null);
  const footerRef = useRef(null);
  const [contentHeight, setContentHeight] = useState("100vh");
  const [refreshFlag, setRefreshFlag] = useState(false);

  return (
    <div className={`App ${dayTheme ? "day-app" : "night-app"}`}>
      <FadeProvider>
        {/* <DataContext.Provider value={[data, setData]}> */}
        <DateContext.Provider value={[dateState, setDateState]}>
          <DayTheme.Provider value={[dayTheme, setDayTheme]}>
            <TransactionsTotal.Provider value={[total, setTotal]}>
              <LoggedInContext.Provider value={[loggedIn, setLoggedIn]}>
                <Router>
                  <UpdateHeights
                    navbarRef={navbarRef}
                    footerRef={footerRef}
                    setContentHeight={setContentHeight}
                  />
                  <Navbar
                    ref={navbarRef}
                    refreshFlag={refreshFlag}
                    setRefreshFlag={setRefreshFlag}
                  />
                  <Routes>
                    <Route
                      exact
                      path="/"
                      element={<Home contentHeight={contentHeight} />}
                    />
                    <Route
                      exact
                      path="/register"
                      element={
                        <Register
                          contentHeight={contentHeight}
                          formData={formData}
                          setFormData={setFormData}
                          refreshFlag={refreshFlag}
                          setRefreshFlag={setRefreshFlag}
                          loading={loading}
                          setLoading={setLoading}
                        />
                      }
                    />
                    <Route
                      exact
                      path="/login"
                      element={
                        <Login
                          contentHeight={contentHeight}
                          formData={formData}
                          setFormData={setFormData}
                          refreshFlag={refreshFlag}
                          setRefreshFlag={setRefreshFlag}
                          loading={loading}
                          setLoading={setLoading}
                        />
                      }
                    />
                    <Route path="/quick" element={<QuickTransactionModal />} />
                    <Route
                      exact
                      path="/dashboard"
                      element={
                        <ProtectedRoute>
                          <Dashboard
                            contentHeight={contentHeight}
                            refreshFlag={refreshFlag}
                            setRefreshFlag={setRefreshFlag}
                          />
                          ;
                        </ProtectedRoute>
                      }
                    />
                  </Routes>
                </Router>
                <Footer ref={navbarRef} />
              </LoggedInContext.Provider>
            </TransactionsTotal.Provider>
          </DayTheme.Provider>
        </DateContext.Provider>
        {/* </DataContext.Provider> */}
      </FadeProvider>
    </div>
  );
}

export default App;
