import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import DeleteSubcategory from "./DeleteSubcategory";
import { TransactionsTotal } from "../App";
import {
  getActionWord,
  getActionWordPassedTense,
  getColorActionWords,
} from "./ActionWords";

const CategoryBreakdown = ({ category, fetchExpenses }) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useContext(TransactionsTotal);

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
  }, [category, fetchExpenses]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

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

      setTotal((prevTotal) => {
        const newTotal = {
          ...prevTotal,
          [`${category}Spent`]: totalSpent,
          [`${category}Budget`]: totalBudget,
        };

        if (
          prevTotal[`${category}Spent`] !== totalSpent ||
          prevTotal[`${category}Budget`] !== totalBudget
        ) {
          return newTotal;
        }

        return prevTotal;
      });
    }
  }, [data, category, setTotal]);

  if (!data || data.length === 0) return <p>No data</p>;

  const totalSpent = data.reduce((acc, sub) => {
    const subTotal = sub.transactions.reduce((sum, tx) => sum + tx.amount, 0);
    return acc + subTotal;
  }, 0);

  const totalBudget = data.reduce((acc, sub) => acc + (sub.budget || 0), 0);

  return (
    <div className=" text-center lg:text-lg xs:text-sm text-gray-600 font-medium p-2 flex flex-col sm:flex-row justify-around w-full ">
      <p>
        Total Budget: <br /> ${totalBudget.toFixed(2)}
      </p>
      <p>
        Total {getActionWordPassedTense(category)}: <br />$
        {totalSpent.toFixed(2)}
      </p>
      <p>
        Left to {getActionWord(category)} <br />{" "}
        <span
          className={`${
            category === "income" && totalBudget - totalSpent > 0
              ? "text-red-500 text-lg"
              : totalBudget - totalSpent < 0
              ? "text-red-500 text-lg"
              : "text-green-600"
          }`}
        >
          ${(totalBudget - totalSpent).toFixed(2)}
        </span>
      </p>
    </div>
  );
};

export default CategoryBreakdown;
