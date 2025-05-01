import React, { useState, useContext, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { DayTheme } from "../App";
import { Player } from "@lottiefiles/react-lottie-player";
import sunAnimation from "../assets/Sun-Animation.json";
import moonAnimation from "../assets/Moon-Animation.json";

const DayThemeToggle = () => {
  const [dayTheme, setDayTheme] = useContext(DayTheme);

  const handleClick = () => {
    setDayTheme(!dayTheme);
    localStorage.setItem("Expense-Tracker-DayTheme", !dayTheme);
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Toggle Theme"
      className=" day-theme-button relative w-10 h-10"
    >
      <Player
        className={`theme-icon sun-icon absolute  daytheme-icon-animation transform ${
          dayTheme
            ? "opacity-100 rotate-0 scale-100"
            : "opacity-0 rotate-180 scale-50"
        }`}
        autoplay
        loop
        src={sunAnimation}
      />
      <Player
        className={`theme-icon moon-icon absolute  daytheme-icon-animation transform ${
          dayTheme
            ? "opacity-0 rotate-0 scale-50"
            : "opacity-100 rotate-180 scale-80"
        }`}
        autoplay
        loop
        src={moonAnimation}
      />
    </button>
  );
};

export default DayThemeToggle;
