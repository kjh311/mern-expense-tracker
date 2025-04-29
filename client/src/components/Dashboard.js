import { useState, useContext, useEffect } from "react";
import SubCategoriesWithTransactions from "./SubCategoriesWithTransactions";
import Overview from "./Overview";
import { DayTheme, DateContext } from "../App";
import { FadeContext } from "./FadeContext";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

const Dashboard = ({ contentHeight }) => {
  const [mainAccordionKey, setMainAccordionKey] = useState(null);
  const [userName] = useState(
    localStorage.getItem("expense-tracker-username") || ""
  );
  const [dayTheme] = useContext(DayTheme);
  const { triggerFadeOut } = useContext(FadeContext);
  const [fadeClass, setFadeClass] = useState("fade-in");
  const [currentMonthIndex, setCurrentMonthIndex] = useContext(DateContext);

  const months = [
    "January",
    "Febuary",
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

  useEffect(() => {
    setFadeClass(triggerFadeOut ? "fade-out" : "fade-in");
  }, [triggerFadeOut]);

  const handleLeftButton = () => {
    setCurrentMonthIndex((prev) => Math.max(0, prev - 1));
  };

  const handleRightButton = () => {
    setCurrentMonthIndex((prev) => Math.min(11, prev + 1));
  };

  return (
    <div
      style={{ minHeight: contentHeight }}
      className={`p-4 flex items-center flex-column ${fadeClass} ${
        dayTheme ? "login-day-theme-bg" : "login-night-theme-bg"
      }`}
    >
      {userName && (
        <h2
          className={`text-center my-animation ${
            dayTheme ? "text-blue-800" : "night-theme-link"
          }`}
        >
          Welcome, {userName}!
        </h2>
      )}

      <div
        className={`my-animation flex items-center gap-2 ${
          dayTheme ? "text-blue-800" : "night-theme-link"
        }`}
      >
        <FaArrowAltCircleLeft
          size={30}
          onClick={handleLeftButton}
          className="cursor-pointer mx-2"
        />
        {new Date().getFullYear()}
        <h2>{months[currentMonthIndex]}</h2>
        <FaArrowAltCircleRight
          size={30}
          onClick={handleRightButton}
          className="cursor-pointer mx-2"
        />
      </div>

      <Overview
        mainKey="0"
        mainAccordionKey={mainAccordionKey}
        setMainAccordionKey={setMainAccordionKey}
        currentMonthIndex={currentMonthIndex}
      />

      <SubCategoriesWithTransactions
        name="💸 EXPENSES"
        category="expense"
        backgroundColor={dayTheme ? "day-red" : "night-red"}
        mainKey="1"
        mainAccordionKey={mainAccordionKey}
        setMainAccordionKey={setMainAccordionKey}
        currentMonthIndex={currentMonthIndex}
      />
      <br />
      <SubCategoriesWithTransactions
        name="🧾 BILLS"
        category="bills"
        backgroundColor={dayTheme ? "day-orange" : "night-orange"}
        mainKey="2"
        mainAccordionKey={mainAccordionKey}
        setMainAccordionKey={setMainAccordionKey}
      />
      <br />
      <SubCategoriesWithTransactions
        name="🏦 SAVINGS"
        category="savings"
        backgroundColor={dayTheme ? "day-yellow" : "night-yellow"}
        mainKey="3"
        mainAccordionKey={mainAccordionKey}
        setMainAccordionKey={setMainAccordionKey}
      />
      <br />
      <SubCategoriesWithTransactions
        name="💰 INCOME"
        category="income"
        backgroundColor={dayTheme ? "day-green" : "night-green"}
        mainKey="4"
        mainAccordionKey={mainAccordionKey}
        setMainAccordionKey={setMainAccordionKey}
      />
    </div>
  );
};

export default Dashboard;
