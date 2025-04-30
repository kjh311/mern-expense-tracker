import { Accordion } from "react-bootstrap";
import { TransactionsTotal, DayTheme, DateContext } from "../App";
import PieChart from "./PieChart";
import { useRef, useEffect, useContext, useState } from "react";
import { formattedCurrency } from "./FormattedCurrency";
import MonthToggle from "./MonthToggle";
import GetMonthlyCashFlows from "./GetMonthlyCashFlows";
import ProgressBarComponent from "./ProgressBarComponent";

const Overview = ({
  mainKey,
  mainAccordionKey,
  setMainAccordionKey,
  currentMonthIndex,
}) => {
  const [total] = useContext(TransactionsTotal);
  const isOpen = mainAccordionKey === mainKey;
  const mainAccordionRef = useRef(null);
  const [dayTheme] = useContext(DayTheme);

  const [cashflow, setCashflow] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  // const [currentMonthIndex, setCurrentMonthIndex] = useContext(DateContext);

  useEffect(() => {
    if (total) {
      // <- safe guard if total is null
      const expenses =
        (total.billsSpent || 0) +
        (total.savingsSpent || 0) +
        (total.expenseSpent || 0);
      const income = total.incomeSpent || 0;
      const budget =
        (total.billsBudget || 0) +
        (total.savingsBudget || 0) +
        (total.expenseBudget || 0);

      setTotalExpenses(expenses);
      setCashflow(income - expenses);
      setTotalIncome(income);
      setTotalBudget(budget);
    }
  }, [total, currentMonthIndex]); // <= notice both in dependencies!

  // useEffect(() => {
  //   if (isOpen && mainAccordionRef.current) {
  //     const yOffset = -80;
  //     const y =
  //       mainAccordionRef.current.getBoundingClientRect().top +
  //       window.pageYOffset +
  //       yOffset;

  //     setTimeout(() => {
  //       window.scrollTo({ top: y, behavior: "smooth" });
  //     }, 150);
  //   }
  // }, [isOpen]);
  // useEffect(() => {})

  // useEffect(() => {
  //   console.log("Overview");
  // }, [currentMonthIndex]);

  // const totalExpenses =
  //   total.billsSpent + total.savingsSpent + total.expenseSpent;

  // const cashflow =
  //   total.incomeSpent -
  //   (total.billsSpent + total.savingsSpent + total.expenseSpent);
  // const totalIncome = total.incomeSpent;

  // const totalBudget =
  //   total.billsBudget + total.savingsBudget + total.expenseBudget;

  // const currentMonthIndex = new Date().getMonth();

  return (
    <div
      className={` max-w-[1400px]  w-full  m-4 sm:m-10  p-4 rounded my-animation ${
        dayTheme ? "overview-category-card-day" : "overview-category-card-night"
      }`}
    >
      <Accordion
        className="accordion-day"
        activeKey={isOpen ? "main" : null}
        onSelect={() => setMainAccordionKey(isOpen ? null : mainKey)}
      >
        <Accordion.Item
          eventKey="main"
          ref={mainAccordionRef}
          className={`my-animation ${
            dayTheme ? "overview-item-day" : "overview-item-night"
          }`}
        >
          <Accordion.Header
            className={`my-animation ${
              dayTheme
                ? "accordion-header-day-overview"
                : "accordion-header-night-overview"
            }`}
          >
            <div className="w-100">
              <div
                className={`flex flex-col mb-2 items-center w-full my-animation ${
                  dayTheme ? "day-text" : "text-white"
                }`}
              >
                <h2 className="text-center lg:text-4xl text-lg font-bold text-shadow sm:m-4 m-2 ">
                  💼 MONTHLY OVERVIEW
                </h2>
                <div className="my-animation sm:text-center text-left flex  flex-col sm:flex-row justify-around items-start sm:items-center w-full gap-2 sm:gap-4 lg:text-xl xs:text-sm">
                  <span
                    className={`my-animation ${
                      dayTheme ? "day-text" : "text-white"
                    } font-semibold`}
                  >
                    <span className="my-animation text-3xl">💵</span> Cashflow:
                    <br />
                    <span
                      className={`my-animation ${
                        cashflow > 0 ? "text-blue-800" : "text-white"
                      }`}
                    >
                      {formattedCurrency(cashflow)}
                    </span>
                  </span>
                  <span
                    className={`my-animation ${
                      dayTheme ? "day-text" : "text-white"
                    } font-semibold`}
                  >
                    <span className="text-3xl">📊</span> Total Spending Budget:
                    <br /> {formattedCurrency(totalBudget)}
                  </span>
                  <span
                    className={`my-animation ${
                      dayTheme ? "day-text" : "text-white"
                    } font-semibold`}
                  >
                    <span className="text-3xl">💰</span> Total Income:
                    <br />
                    {formattedCurrency(totalIncome)}
                  </span>
                  <span
                    className={`my-animation ${
                      dayTheme ? "day-text" : "text-white"
                    } font-semibold`}
                  >
                    <span className="text-3xl">💸</span> Total Expenses:
                    <br />
                    {formattedCurrency(totalExpenses)}
                  </span>
                </div>
              </div>
              <ProgressBarComponent whole={totalBudget} part={totalExpenses} />
            </div>
          </Accordion.Header>

          <Accordion.Body
            className={`my-animation ${
              dayTheme
                ? "overview-accordion-body-day"
                : "overview-accordion-body-night"
            }`}
          >
            <MonthToggle color={`${dayTheme ? "day-text" : "text-white"}`} />
            <>
              <div className="p-4  rounded shadow-md flex justify-center flex-col items-center">
                {/* <h2
                  className={`text-xl font-bold mb-1 sm:mb-4 text-center my-animation ${
                    dayTheme ? "day-text" : "text-white"
                  }`}
                >
                  Overview Chart
                </h2> */}

                {totalExpenses > 0 ? (
                  <PieChart totals={total} />
                ) : (
                  <p
                    className={`${
                      dayTheme ? "day-text" : "text-white"
                    } text-center my-animation`}
                  >
                    No Data for Chart
                  </p>
                )}

                {/* <GetMonthlyCashFlows /> */}
              </div>
            </>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Overview;
