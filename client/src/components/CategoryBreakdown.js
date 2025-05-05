import React, { useEffect, useContext } from "react";
import { TransactionsTotal, DayTheme, DateContext } from "../App";
import { formattedCurrency } from "./FormattedCurrency";
import { getActionWord, getActionWordPassedTense } from "./ActionWords";
import ProgressBarComponent from "./ProgressBarComponent";

const CategoryBreakdown = ({ category, data }) => {
  const [total, setTotal] = useContext(TransactionsTotal);
  const [dayTheme] = useContext(DayTheme);
  // const [dateState, setDateState] = useContext(DateContext);

  useEffect(() => {
    const totalSpent = data.reduce((acc, sub) => {
      const subTotal = sub.transactions.reduce(
        (sum, tx) => sum + (tx.amount || 0),
        0
      );
      return acc + subTotal;
    }, 0);

    const totalBudget = data.reduce((acc, sub) => acc + (sub.budget || 0), 0);

    setTotal((prevTotal) => ({
      ...prevTotal,
      [`${category}Spent`]: totalSpent,
      [`${category}Budget`]: totalBudget,
    }));
    // }
  }, [data, category, setTotal]);

  if (!data || data.length === 0) {
    return <p className="text-center p-4">No data available.</p>;
  }

  const totalSpent = data.reduce((acc, sub) => {
    const subTotal = sub.transactions.reduce((sum, tx) => sum + tx.amount, 0);
    return acc + subTotal;
  }, 0);

  const totalBudget = data.reduce((acc, sub) => acc + (sub.budget || 0), 0);

  return (
    <span className="w-100">
      <div className="sm:text-center text-start lg:text-xl text-md font-medium p-2 flex flex-col sm:flex-row justify-start sm:justify-evenly items-start sm:items-center w-full">
        <p className="text-center">
          Total {getActionWordPassedTense(category)} this month: <br />
          <span className="ml-4 sm:ml-0">{formattedCurrency(totalSpent)}</span>
        </p>
        <p className="text-center">
          Monthly Budget: <br />{" "}
          <span className="ml-4 sm:ml-0">{formattedCurrency(totalBudget)}</span>
        </p>
        <p className="text-center">
          Left to {getActionWord(category)}: <br />
          <span
            className={`my-animation ${
              totalBudget - totalSpent >= 0
                ? dayTheme
                  ? "text-green-500"
                  : "text-white"
                : dayTheme
                ? "text-red-500"
                : "text-white"
            }`}
          >
            <span className="ml-4 sm:ml-0">
              {formattedCurrency(totalBudget - totalSpent)}
            </span>
          </span>
        </p>
      </div>
      <ProgressBarComponent whole={totalBudget} part={totalSpent} />
    </span>
  );
};

export default CategoryBreakdown;
