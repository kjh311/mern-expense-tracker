import React, { useState, useContext, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { DayTheme } from "../App";

const DayThemeToggle = () => {
  const [dayTheme, setDayTheme] = useContext(DayTheme);

  const handleClick = () => {
    setDayTheme(!dayTheme);
    localStorage.setItem("Expense-Tracker-DayTheme", !dayTheme);
  };

  useEffect(() => {
    console.log("Daytheme from daytheme toggle: ", dayTheme);
  }, [dayTheme]);

  return (
    <button
      onClick={handleClick}
      aria-label="Toggle Theme"
      className=" day-theme-button relative w-10 h-10"
    >
      <FaSun
        className={`text-yellow-400 text-3xl absolute top-0 left-0 transition-all duration-500 ease-in-out transform ${
          dayTheme
            ? "opacity-100 rotate-0 scale-100"
            : "opacity-0 rotate-180 scale-90"
        }`}
      />
      <FaMoon
        className={` text-yellow-400 text-3xl absolute top-0 left-0 transition-all duration-500 ease-in-out transform ${
          dayTheme
            ? "opacity-0 rotate-0 scale-90"
            : "opacity-100 rotate-180 scale-100"
        }`}
      />
    </button>
  );
};

export default DayThemeToggle;
