import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { TransactionsTotal, DayTheme, DateContext } from "../App";
import { formattedCurrency } from "./FormattedCurrency";
import { getActionWord, getActionWordPassedTense } from "./ActionWords";
import ProgressBarComponent from "./ProgressBarComponent";

const CategoryBreakdown = ({ category, refreshFlag }) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useContext(TransactionsTotal);
  const [dayTheme] = useContext(DayTheme);
  // const [currentMonthIndex] = useContext(DateContext);
  const [dateState, setDateState] = useContext(DateContext);
  const { month: currentMonthIndex, year: currentYear } = dateState;

  const [noData, setNoData] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get(`/api/...`); // Your API call

  //       const filteredData = res.data
  //         .filter((item) => {
  //           return (
  //             item.month === currentMonthIndex + 1 && item.year === currentYear
  //           );
  //         })
  //         .map((item) => {
  //           const filteredTransactions = item.transactions.filter(
  //             (transaction) => {
  //               const transactionDate = new Date(transaction.date);
  //               return (
  //                 transactionDate.getMonth() === currentMonthIndex &&
  //                 transactionDate.getFullYear() === currentYear
  //               );
  //             }
  //           );

  //           return {
  //             ...item,
  //             transactions: filteredTransactions,
  //           };
  //         })
  //         .filter((item) => item.transactions.length > 0);

  //       console.log(
  //         `Category breakdown filtered data: ${category}`,
  //         filteredData
  //       );
  //       setData(filteredData);
  //     } catch (err) {
  //       console.error("Error fetching category breakdown", err);
  //     }
  //   };

  //   fetchData();
  // }, [category, refreshFlag, currentMonthIndex, currentYear]);

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

        const filteredData = res.data
          .map((item) => {
            const filteredTransactions = item.transactions.filter(
              (transaction) => {
                const transactionMonth = Number(transaction.date.slice(5, 7));
                const transactionYear = Number(transaction.date.slice(0, 4));
                const now = new Date();
                return (
                  transactionMonth === currentMonthIndex + 1 &&
                  transactionYear === currentYear
                );
              }
            );

            return {
              ...item,
              transactions: filteredTransactions,
            };
          })
          .filter((item) => item.transactions.length > 0);

        // console.log(
        //   `Category breakdown filtered data: ${category}`,
        //   filteredData
        // );
        setData(filteredData);
      } catch (err) {
        console.error("Error fetching category breakdown", err);
      }
    };

    fetchData();
  }, [category, refreshFlag, currentMonthIndex, currentYear]);

  useEffect(() => {
    // if (data && data.length > 0) {
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
    // setNoData(true);
    return <p className="text-center p-4">No data available.</p>;
  }

  const totalSpent = data.reduce((acc, sub) => {
    const subTotal = sub.transactions.reduce((sum, tx) => sum + tx.amount, 0);
    return acc + subTotal;
  }, 0);

  const totalBudget = data.reduce((acc, sub) => acc + (sub.budget || 0), 0);

  return (
    <span className="w-100">
      <div className="sm:text-center text-start lg:text-xl text-md font-medium p-2 flex flex-col sm:flex-row justify-start sm:justify-around items-start sm:items-center w-full">
        <p>
          Monthly Budget: <br /> {formattedCurrency(totalBudget)}
        </p>
        <p>
          Total {getActionWordPassedTense(category)} this month: <br />
          {formattedCurrency(totalSpent)}
        </p>
        <p>
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
            {formattedCurrency(totalBudget - totalSpent)}
          </span>
        </p>
      </div>
      <ProgressBarComponent whole={totalBudget} part={totalSpent} />
    </span>
  );
};

export default CategoryBreakdown;
