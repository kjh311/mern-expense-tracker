import { useState, useContext, useEffect } from "react";
import SubCategoriesWithTransactions from "./SubCategoriesWithTransactions";
import Overview from "./Overview";
import { DayTheme } from "../App";
import { FadeContext } from "./FadeContext"; // Import your FadeContext!

const Dashboard = ({ contentHeight }) => {
  const [mainAccordionKey, setMainAccordionKey] = useState(null);
  const [userName, setUserName] = useState(
    localStorage.getItem("expense-tracker-username") || ""
  );
  const [dayTheme, setDayTheme] = useContext(DayTheme);
  const { triggerFadeOut, setTriggerFadeOut } = useContext(FadeContext); // Use FadeContext!

  const [fadeClass, setFadeClass] = useState("fade-in"); // Start with fade-in

  useEffect(() => {
    if (triggerFadeOut) {
      setFadeClass("fade-out");
    } else {
      setFadeClass("fade-in");
    }
  }, [triggerFadeOut]);

  return (
    <>
      <div
        style={{ minHeight: contentHeight }}
        className={`p-4 flex items-center flex-column ${fadeClass} ${
          dayTheme ? "login-day-theme-bg" : "login-night-theme-bg"
        }`}
      >
        {userName !== "" && (
          <h2
            className={`text-center my-animation ${
              dayTheme ? "text-blue-800" : "night-theme-link"
            }`}
          >
            Welcome, {userName}!
          </h2>
        )}

        <Overview
          mainKey="0"
          mainAccordionKey={mainAccordionKey}
          setMainAccordionKey={setMainAccordionKey}
        />

        <SubCategoriesWithTransactions
          name={"💸 EXPENSES"}
          category={"expense"}
          backgroundColor={`${dayTheme ? "day-red" : "night-red"}`}
          mainKey="1"
          mainAccordionKey={mainAccordionKey}
          setMainAccordionKey={setMainAccordionKey}
        />
        <br />
        <SubCategoriesWithTransactions
          name={"🧾 BILLS"}
          category={"bills"}
          backgroundColor={`${dayTheme ? "day-orange" : "night-orange"}`}
          mainKey="2"
          mainAccordionKey={mainAccordionKey}
          setMainAccordionKey={setMainAccordionKey}
        />
        <br />
        <SubCategoriesWithTransactions
          name={"🏦 SAVINGS"}
          category={"savings"}
          backgroundColor={`${dayTheme ? "day-yellow" : "night-yellow"}`}
          mainKey="3"
          mainAccordionKey={mainAccordionKey}
          setMainAccordionKey={setMainAccordionKey}
        />
        <br />
        <SubCategoriesWithTransactions
          name={"💰 INCOME"}
          category={"income"}
          backgroundColor={`${dayTheme ? "day-green" : "night-green"}`}
          mainKey="4"
          mainAccordionKey={mainAccordionKey}
          setMainAccordionKey={setMainAccordionKey}
        />
      </div>
    </>
  );
};

export default Dashboard;
