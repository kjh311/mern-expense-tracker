import React, { useState, useContext, useEffect } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { DayTheme, DateContext } from "../App";

const MonthToggle = () => {
  //   const [currentMonthIndex, setCurrentMonthIndex] = useContext(DateContext);
  const [dateState, setDateState] = useContext(DateContext);
  const { month: currentMonthIndex, year: currentYear } = dateState;

  const [dayTheme, setDayTheme] = useContext(DayTheme);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleLeftButton = () => {
    setDateState((prev) => {
      let newMonth = prev.month - 1;
      let newYear = prev.year;
      if (newMonth < 0) {
        newMonth = 11; // December
        newYear -= 1;
      }
      return { month: newMonth, year: newYear };
    });
  };

  const handleRightButton = () => {
    setDateState((prev) => {
      let newMonth = prev.month + 1;
      let newYear = prev.year;
      if (newMonth > 11) {
        newMonth = 0; // January
        newYear += 1;
      }
      return { month: newMonth, year: newYear };
    });
  };

  return (
    <div
      style={{
        filter: `${
          dayTheme ? "drop-shadow(1px 1px 1px rgba(0, 0, 0, 1))" : ""
        }`,
      }}
      className={`my-animation flex items-center gap-2 justify-center ${
        dayTheme ? "day-text " : "text-white"
      }`}
    >
      <FaArrowAltCircleLeft
        onClick={handleLeftButton}
        className="cursor-pointer mx-4 month-arrow my-animation"
      />

      <h2>
        {months[currentMonthIndex]}, {currentYear}
      </h2>
      <FaArrowAltCircleRight
        onClick={handleRightButton}
        className="cursor-pointer mx-4 month-arrow my-animation"
      />
    </div>
  );
};

export default MonthToggle;
