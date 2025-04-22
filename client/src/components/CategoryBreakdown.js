import React, { useState, useEffect } from "react";
import axios from "axios";

const CategoryBreakdown = ({ category, fetchExpenses }) => {
  const [data, setData] = useState([]);
  const [totalTransactions, setTotalTransactions] = useState();

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

  if (!data || data.length === 0) return <p>No data</p>;

  const totalSpent = data.reduce((acc, sub) => {
    const subTotal = sub.transactions.reduce((sum, tx) => sum + tx.amount, 0);
    return acc + subTotal;
  }, 0);

  const totalBudget = data.reduce((acc, sub) => acc + (sub.budget || 0), 0);

  return (
    <div className="text-sm text-gray-600 font-medium p-2 flex flex-col sm:flex-row justify-around w-full">
      <p>
        Total Budget: <br /> ${totalBudget.toFixed(2)}
      </p>
      <p>
        Total Spent: <br />${totalSpent.toFixed(2)}
      </p>
      <p>
        Left to Spend: <br />{" "}
        <span
          className={`${
            totalBudget - totalSpent < 0 ? "text-red-500" : "text-gray-600"
          }`}
        >
          ${(totalBudget - totalSpent).toFixed(2)}
        </span>
      </p>
    </div>
  );
};

export default CategoryBreakdown;
