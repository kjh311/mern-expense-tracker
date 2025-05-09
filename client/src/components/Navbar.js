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
import { useSearchParams } from "react-router-dom";

const Navbar = ({ ref, refreshFlag, setRefreshFlag }) => {
  const [loggedIn] = useContext(LoggedInContext);
  const [dayTheme] = useContext(DayTheme);
  const fadeNavigate = useFadeNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [currentPathState, setCurrentPathState] = useState(currentPath);
  const { setTriggerFadeOut } = useContext(FadeContext);
  const navigate = useNavigate();
  const svgUrl = `${window.location.origin}/path-night.svg`;
  const [searchParams] = useSearchParams();
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
    if (searchParams.get("modal") === "quick") {
      setShowModal(true);
    }
  }, [searchParams]);

  return (
    <nav
      ref={ref}
      id="navbar"
      className={`z-10 w-full sticky top-0 nav-bar relative my-animation ${
        dayTheme ? "day-nav text-white" : "night-nav text-blue-100"
      }`}
    >
      {/* <div
        className="nav-svg-after"
        style={{ "--svg-url": `url("${svgUrl}")` }} // ✅ Only double quotes inside
      ></div> */}

      <div className=" mx-auto px-2 py-3 flex items-center justify-start sm:justify-around">
        <button
          onClick={handleNavHome}
          className={`nav-bar-text text-lg pr-4 sm:px-6 sm:text-2xl font-extrabold tracking-wide  transition ${
            dayTheme ? "text-white text-shadow" : "night-footer-link"
          }`}
        >
          {" "}
          <span>💸</span> Budget Tracker
        </button>

        {loggedIn && (
          <QuickTransactionModal
            refreshFlag={refreshFlag}
            setRefreshFlag={setRefreshFlag}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}

        <div>
          {loggedIn ? (
            <Logout />
          ) : (
            <Button
              text={"Login"}
              color={dayTheme ? "white" : "purple"}
              onClick={() => fadeNavigate("/login")}
            />
          )}
        </div>
      </div>
      <DayThemeToggle />
    </nav>
  );
};

export default Navbar;
