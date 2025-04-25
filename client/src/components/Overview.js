import React, { useContext } from "react";
import { Accordion } from "react-bootstrap";
import { TransactionsTotal } from "../App";
import PieChart from "./PieChart";
import { useRef, useEffect } from "react";

const Overview = ({ mainKey, mainAccordionKey, setMainAccordionKey }) => {
  const [total] = useContext(TransactionsTotal);
  const isOpen = mainAccordionKey === mainKey;
  const mainAccordionRef = useRef(null);

  useEffect(() => {
    if (isOpen && mainAccordionRef.current) {
      const yOffset = -80; // Adjust this to your navbar height
      const y =
        mainAccordionRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;

      setTimeout(() => {
        window.scrollTo({ top: y, behavior: "smooth" });
      }, 150); // slight delay ensures accordion is expanded first
    }
  }, [isOpen]);

  const totalExpenses =
    total.billsSpent + total.savingsSpent + total.expenseSpent;

  const cashflow = (
    total.incomeSpent -
    (total.billsSpent + total.savingsSpent + total.expenseSpent)
  ).toFixed(2);

  const totalIncome = total.incomeSpent.toFixed(2);

  const totalBudget =
    total.billsBudget + total.savingsBudget + total.expenseBudget;

  return (
    <div className="category-card max-w-[1200px] myBorder mx-auto bg-blue-100 shadow-md  m-10 p-4 rounded">
      <Accordion
        activeKey={isOpen ? "main" : null}
        onSelect={() => setMainAccordionKey(isOpen ? null : mainKey)}
      >
        <Accordion.Item eventKey="main" ref={mainAccordionRef}>
          <Accordion.Header>
            <div className="flex flex-col items-center w-full">
              <h2 className="text-center lg:text-4xl xs:text-2xl font-bold text-indigo-600 m-4">
                💼 Monthly Overview
              </h2>
              <div className="text-center flex flex-col sm:flex-row justify-around items-center w-full gap-2 sm:gap-4 lg:text-xl xs:text-sm">
                <span className="text-blue-800 font-semibold">
                  💵 Cashflow:
                  <br /> ${cashflow}
                </span>
                <span className="text-blue-800 font-semibold">
                  📊 Total Budget:
                  <br /> ${totalBudget}
                </span>
                <span className="text-blue-800 font-semibold">
                  📊 Total Income:
                  <br /> ${totalIncome}
                </span>
                <span className="text-blue-800 font-semibold">
                  💸 Total Expenses:
                  <br /> ${totalExpenses}
                </span>
              </div>
            </div>
          </Accordion.Header>
          <Accordion.Body className="bg-blue-200">
            <div className="p-4 bg-white rounded shadow-md">
              <h2 className="text-xl font-bold mb-4 text-center text-blue-700">
                Overview Chart
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
