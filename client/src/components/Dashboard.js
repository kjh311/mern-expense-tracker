import { useState, useContext, useEffect } from "react";
import SubCategoriesWithTransactions from "./SubCategoriesWithTransactions";
import Overview from "./Overview";
import { DayTheme, DateContext } from "../App";
import { FadeContext } from "./FadeContext";
import MonthToggle from "./MonthToggle";

const Dashboard = ({ contentHeight }) => {
  const [mainAccordionKey, setMainAccordionKey] = useState(null);
  const [userName] = useState(
    localStorage.getItem("expense-tracker-username") || ""
  );
  const [dayTheme] = useContext(DayTheme);
  const { triggerFadeOut } = useContext(FadeContext);
  const [fadeClass, setFadeClass] = useState("fade-in");
  // const [currentMonthIndex, setCurrentMonthIndex] = useContext(DateContext);
  const [dateState, setDateState] = useContext(DateContext);
  const { month: currentMonthIndex, year: currentYear } = dateState;

  useEffect(() => {
    setFadeClass(triggerFadeOut ? "fade-out" : "fade-in");
  }, [triggerFadeOut]);

  return (
    <div
      style={{ minHeight: contentHeight }}
      className={`p-4 flex items-center flex-column ${fadeClass} ${
        dayTheme ? "login-day-theme-bg" : "login-night-theme-bg"
      }`}
    >
      {userName && (
        <h1
          className={`text-center my-animation ${
            dayTheme ? "day-text text-shadow" : "text-white"
          }`}
        >
          Welcome, {userName}!
        </h1>
      )}

      <MonthToggle />

      <Overview
        mainKey="0"
        mainAccordionKey={mainAccordionKey}
        setMainAccordionKey={setMainAccordionKey}
        // currentMonthIndex={currentMonthIndex}
        dateState={dateState}
      />

      <SubCategoriesWithTransactions
        name="💸 EXPENSES"
        category="expense"
        backgroundColor={dayTheme ? "day-red" : "night-red"}
        mainKey="1"
        mainAccordionKey={mainAccordionKey}
        setMainAccordionKey={setMainAccordionKey}
        dateState={dateState}
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
