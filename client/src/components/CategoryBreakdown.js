import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import DeleteSubcategory from "./DeleteSubcategory";
import { TransactionsTotal, DayTheme } from "../App";
import { formattedCurrency } from "./FormattedCurrency";
import {
  getActionWord,
  getActionWordPassedTense,
  getColorActionWords,
} from "./ActionWords";

const CategoryBreakdown = ({ category, refreshFlag }) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useContext(TransactionsTotal);
  const [dayTheme, setDayTheme] = useContext(DayTheme);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/subcategories/${category}-with-transactions`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setData(res.data);
      } catch (err) {
        console.error("Error fetching category breakdown", err);
      }
    };

    fetchData();
  }, [category, refreshFlag]);

  //pass totals and budgets to App.js Context
  useEffect(() => {
    if (data && data.length > 0) {
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
    }
    console.log("Category Breakdown UseEffect Ran");
  }, [data, category, setTotal]);

  if (!data || data.length === 0) return <p>No data</p>;

  const totalSpent = data.reduce((acc, sub) => {
    const subTotal = sub.transactions.reduce((sum, tx) => sum + tx.amount, 0);
    return acc + subTotal;
  }, 0);

  const totalBudget = data.reduce((acc, sub) => acc + (sub.budget || 0), 0);

  return (
    <div className=" text-center lg:text-xl  xs:text-sm  font-medium p-2 flex flex-col sm:flex-row justify-around w-full ">
      <p>
        📊 Monthly Budget: <br /> {formattedCurrency(totalBudget)}
      </p>
      <p>
        Total {getActionWordPassedTense(category)} this month: <br />
        {formattedCurrency(totalSpent)}
      </p>
      <p>
        Left to {getActionWord(category)}: <br />{" "}
        <span
          className={`${
            category === "expense" && totalBudget - totalSpent > 0
              ? `transition-all duration-300 text-green-${
                  dayTheme ? "700" : "300"
                }`
              : totalBudget - totalSpent < 0
              ? `transition-all duration-300 text-green-${
                  dayTheme ? "700" : "300"
                }`
              : `transition-all duration-300 text-red-${
                  dayTheme ? "700" : "300"
                }`
          }`}
        >
          {formattedCurrency(totalBudget - totalSpent)}
        </span>
      </p>
    </div>
  );
};

export default CategoryBreakdown;
