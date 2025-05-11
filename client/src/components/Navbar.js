import React, { useContext, useEffect, useState } from "react";
import { LoggedInContext, DayTheme } from "../App";
import Logout from "./Logout";
import DayThemeToggle from "./DayThemeToggle";
import Button from "./Button";
import { useFadeNavigate } from "../hooks/useFadeNavigate";
import { useLocation } from "react-router-dom";
import { FadeContext } from "./FadeContext";
import { useNavigate } from "react-router-dom";
import QuickTransactionModal from "./QuickTransactionModal";
// import { useSearchParams } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import HamburgerDropdown from "./HamburgerDropdown";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

const MyNavbar = ({ ref, refreshFlag, setRefreshFlag }) => {
  const [loggedIn] = useContext(LoggedInContext);
  const [dayTheme] = useContext(DayTheme);
  const fadeNavigate = useFadeNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [currentPathState, setCurrentPathState] = useState(currentPath);
  const { setTriggerFadeOut } = useContext(FadeContext);
  const navigate = useNavigate();
  const svgUrl = `${window.location.origin}/path-night.svg`;
  const [showModal, setShowModal] = useState(false);

  // navigate home
  const handleNavHome = () => {
    setTriggerFadeOut(true);

    setTimeout(() => {
      setTriggerFadeOut(false);
      navigate("/");
    }, 0);
  };

  useEffect(() => {
    setCurrentPathState(currentPath);
  }, [currentPath]);

  useEffect(() => {
    if (location.hash === "#modal=quick") {
      setShowModal(true);
    }
  }, [location]);

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        ref={ref}
        id="navbar"
        className={`z-10  w-full sticky top-0 z-50 fixed  nav-bar relative my-animation ${
          dayTheme ? "day-nav text-white" : "night-nav text-blue-100"
        }`}
      >
        <Navbar.Brand>
          <button
            onClick={handleNavHome}
            className={`nav-bar-text text-lg pr-4 sm:px-6 sm:text-2xl font-extrabold tracking-wide  transition ${
              dayTheme ? "text-white text-shadow" : "night-footer-link"
            }`}
          >
            {" "}
            <span>💸</span> Budget Tracker
          </button>
          <DayThemeToggle />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className={`${
            dayTheme
              ? "responsive-navbar-nav-toggle-day"
              : "responsive-navbar-nav-toggle-night"
          }`}
        >
          <svg width="30" height="30" viewBox="0 0 30 30">
            {dayTheme ? (
              <path
                className="my-animation"
                stroke="black"
                strokeWidth="2"
                d="M4 7h22M4 15h22M4 23h22"
              />
            ) : (
              <path
                className="my-animation"
                stroke="white"
                strokeWidth="2"
                d="M4 7h22M4 15h22M4 23h22"
              />
            )}
          </svg>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav ">
          <Nav className="mr-auto flex justify-around w-100 ">
            <Nav.Item className="nav-item">
              {loggedIn && (
                <QuickTransactionModal
                  refreshFlag={refreshFlag}
                  setRefreshFlag={setRefreshFlag}
                  showModal={showModal}
                  setShowModal={setShowModal}
                />
              )}
            </Nav.Item>
            {/* <br /> */}
            <Nav.Item className="flex justify-center nav-item">
              {loggedIn ? (
                <Logout />
              ) : (
                <Button
                  id="login-button"
                  text={"Login"}
                  color={dayTheme ? "white" : "purple"}
                  onClick={() => fadeNavigate("/login")}
                />
              )}
            </Nav.Item>
            {/* <br /> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default MyNavbar;
