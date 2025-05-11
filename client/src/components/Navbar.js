import React, { useContext, useEffect, useState, useRef } from "react";
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
// import HamburgerDropdown from "./HamburgerDropdown";
import { Nav, Navbar } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

const MyNavbar = ({ ref, refreshFlag, setRefreshFlag }) => {
  const [loggedIn] = useContext(LoggedInContext);
  const [dayTheme] = useContext(DayTheme);
  const fadeNavigate = useFadeNavigate();
  const location = useLocation();
  // const currentPath = location.pathname;
  // const [currentPathState, setCurrentPathState] = useState(currentPath);
  const { setTriggerFadeOut } = useContext(FadeContext);
  const navigate = useNavigate();
  // const svgUrl = `${window.location.origin}/path-night.svg`;
  const [showModal, setShowModal] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const navbarRef = ref;
  const toggleRef = useRef(null);

  // navigate home
  const handleNavHome = () => {
    setTriggerFadeOut(true);

    setTimeout(() => {
      setTriggerFadeOut(false);
      navigate("/");
    }, 0);
  };

  // useEffect(() => {
  //   setCurrentPathState(currentPath);
  // }, [currentPath]);

  useEffect(() => {
    if (location.hash === "#modal=quick") {
      setExpanded(true);
      setTimeout(() => {
        setShowModal(true);
      }, 50);
    }
  }, [location]);

  const handleClickOutside = (event) => {
    if (
      navbarRef.current &&
      !navbarRef.current.contains(event.target) &&
      toggleRef.current &&
      !toggleRef.current.contains(event.target)
    ) {
      setExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <Navbar
        expanded={expanded}
        onToggle={() => setExpanded((prev) => !prev)}
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
          // onClick={toggleNavbar}
          ref={toggleRef}
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
        <Navbar.Collapse id="responsive-navbar-nav " ref={ref}>
          <Nav className="mr-auto flex justify-around w-100 ">
            <Nav.Item className="nav-item">
              {loggedIn && (
                <QuickTransactionModal
                  refreshFlag={refreshFlag}
                  setRefreshFlag={setRefreshFlag}
                  showModal={showModal}
                  setShowModal={setShowModal}
                  expanded={expanded}
                  setExpanded={setExpanded}
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
