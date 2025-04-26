import { useState, useContext } from "react";
import SubCategoriesWithTransactions from "./SubCategoriesWithTransactions";
import Overview from "./Overview";
import { DayTheme } from "../App";

const Dashboard = () => {
  const [mainAccordionKey, setMainAccordionKey] = useState(null);
  const [userName, setUserName] = useState(
    localStorage.getItem("expense-tracker-username")
  );
  const [dayTheme, setDayTheme] = useContext(DayTheme);

  return (
    <>
      <div
        className={` min-h-screen p-4 flex items-center flex-column ${
          dayTheme ? "login-day-theme-bg" : "login-night-theme-bg"
        }`}
      >
        {userName && (
          <h3
            className={`text-center transition-all duration-300 ${
              dayTheme ? "text-black" : "night-theme-link"
            }`}
          >
            Welcome {userName}!
          </h3>
        )}
        <Overview
          mainKey="0"
          mainAccordionKey={mainAccordionKey}
          setMainAccordionKey={setMainAccordionKey}
        />

        <SubCategoriesWithTransactions
          name={"  💸 EXPENSES"}
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
