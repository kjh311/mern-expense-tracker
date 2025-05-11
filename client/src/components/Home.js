import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { DayTheme, LoggedInContext } from "../App";
import { Player } from "@lottiefiles/react-lottie-player";
import moneyAnimation from "../assets/Money-Animation.json";
import FadeWrapper from "./FadeWrapper";
import { FadeContext } from "./FadeContext";

const Home = ({ contentHeight }) => {
  const [dayTheme] = useContext(DayTheme);
  const [loggedIn] = useContext(LoggedInContext);
  const [localStorageName] = useState(
    localStorage.getItem("expense-tracker-username") || ""
  );
  const navigate = useNavigate();
  const { triggerFadeOut, setTriggerFadeOut } = useContext(FadeContext);

  const handleStartClick = () => {
    setTriggerFadeOut(true);
    setTimeout(() => {
      if (localStorageName !== "") {
        navigate(loggedIn ? "/dashboard" : "/login");
      } else {
        navigate(loggedIn ? "/dashboard" : "/register");
      }
      setTriggerFadeOut(false);
    }, 100);
  };

  return (
    <FadeWrapper triggerFadeOut={triggerFadeOut}>
      {" "}
      <div
        className={`${
          dayTheme ? "login-day-theme-bg" : "login-night-theme-bg"
        } home-container text-center flex flex-column justify-center align-center`}
        style={{ minHeight: contentHeight }}
      >
        <br />
        <br />
        <br />
        <h1 className="home-heading text-2xl sm:text-6xl text-white p-4">
          Welcome to Budget Tracker
          {localStorageName !== "" && `, ${localStorageName}`}!
        </h1>
        <p className="text-center text-lg sm:text-4xl text-white mx-10 ">
          Stay on top of your expenses, savings, bills, and income all in one
          place.
        </p>
        <Player
          autoplay
          loop
          src={moneyAnimation}
          className="flying-cash-animation mb-2"
        />
        <span onClick={handleStartClick}>
          <Button
            text={`${loggedIn ? "Dashboard" : "Get Started"}`}
            color={`${dayTheme ? "blue" : "purple"}`}
          />
        </span>
      </div>
    </FadeWrapper>
  );
};

export default Home;
