import { Accordion } from "react-bootstrap";
import { TransactionsTotal, DayTheme } from "../App";
import PieChart from "./PieChart";
import { useRef, useEffect, useContext } from "react";
import { formattedCurrency } from "./FormattedCurrency";

const Overview = ({ mainKey, mainAccordionKey, setMainAccordionKey }) => {
  const [total] = useContext(TransactionsTotal);
  const isOpen = mainAccordionKey === mainKey;
  const mainAccordionRef = useRef(null);
  const [dayTheme, setDayTheme] = useContext(DayTheme);

  useEffect(() => {
    if (isOpen && mainAccordionRef.current) {
      const yOffset = -80;
      const y =
        mainAccordionRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;

      setTimeout(() => {
        window.scrollTo({ top: y, behavior: "smooth" });
      }, 150);
    }
  }, [isOpen]);

  const totalExpenses =
    total.billsSpent + total.savingsSpent + total.expenseSpent;

  const cashflow =
    total.incomeSpent -
    (total.billsSpent + total.savingsSpent + total.expenseSpent);
  const totalIncome = total.incomeSpent;

  const totalBudget =
    total.billsBudget + total.savingsBudget + total.expenseBudget;

  return (
    <div
      className={` max-w-[1400px]  w-full  m-10  p-4 rounded my-animation ${
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
            <div
              className={`flex flex-col items-center w-full my-animation ${
                dayTheme ? "day-text" : "text-white"
              }`}
            >
              <h2 className="text-center lg:text-4xl xs:text-2xl font-bold text-shadow m-4">
                💼 Monthly Overview
              </h2>
              <div className="my-animation text-center flex  flex-col sm:flex-row justify-around items-center w-full gap-2 sm:gap-4 lg:text-xl xs:text-sm">
                <span
                  className={`my-animation ${
                    dayTheme ? "day-text" : "text-white"
                  } font-semibold`}
                >
                  <span className="my-animation text-3xl">💵</span> Cashflow:
                  <br />
                  <span
                    className={`my-animation ${
                      cashflow > 0 ? "text-blue-800" : "text-red-500"
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
          </Accordion.Header>

          <Accordion.Body
            className={`my-animation ${
              dayTheme
                ? "overview-accordion-body-day"
                : "overview-accordion-body-night"
            }`}
          >
            <div className="p-4  rounded shadow-md">
              <h2
                className={`text-xl font-bold mb-4 text-center my-animation ${
                  dayTheme ? "day-text" : "text-white"
                }`}
              >
                Overview Charts
              </h2>
              <PieChart totals={total} />
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Overview;
