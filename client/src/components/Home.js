import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { DayTheme, LoggedInContext } from "../App";
import { Player } from "@lottiefiles/react-lottie-player";
import moneyAnimation from "../assets/Money-Animation.json";
import FadeWrapper from "./FadeWrapper"; // import FadeWrapper

const Home = ({ contentHeight }) => {
  const [dayTheme, setDayTheme] = useContext(DayTheme);
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  const [localStorageName, setLocalStorageName] = useState(
    localStorage.getItem("expense-tracker-username") || ""
  );
  const navigate = useNavigate();
  const [triggerFadeOut, setTriggerFadeOut] = useState(false);

  const handleStartClick = () => {
    setTriggerFadeOut(true);
    setTimeout(() => {
      if (localStorageName !== "") {
        navigate(loggedIn ? "/dashboard" : "/login");
      } else {
        navigate(loggedIn ? "/dashboard" : "/register");
      }
    }, 300);
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
        <h1 style={styles.heading}>
          Welcome to Budget Tracker
          {localStorageName !== "" && `, ${localStorageName}`}!
        </h1>
        <p className="text-center" style={styles.subheading}>
          Stay on top of your expenses, savings, bills, and income all in one
          place.
        </p>
        <Player
          autoplay
          loop
          src={moneyAnimation}
          style={{ height: "300px", width: "300px" }}
        />
        <span onClick={handleStartClick}>
          <Button
            text={"Get Started"}
            color={`${dayTheme ? "blue" : "purple"}`}
          />
        </span>
      </div>
    </FadeWrapper>
  );
};

const styles = {
  heading: {
    fontSize: "3rem",
    marginBottom: "1rem",
    color: "white",
  },
  subheading: {
    fontSize: "1.5rem",
    marginBottom: "2rem",
    color: "white",
  },
};

export default Home;
