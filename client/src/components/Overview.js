import React, { useState, useContext } from "react";
import { TransactionsTotal } from "../App";
import PieChart from "./PieChart";

const Overview = () => {
  const [total, setTotal] = useContext(TransactionsTotal);

  return (
    <div className="text-center p-2 m-2 outline rounded bg-blue-200 text-center">
      <h1>OverView</h1>
      <PieChart totals={total} />
      <div className=" flex justify-evenly">
        {/* <div className="outline p-2 m-2 rounded bg-white">
          <p>Total Expenses:</p>
          <p>${total.expenseSpent}</p>
          <p>Budget:</p>
          <p>${total.expenseBudget.toFixed(2)}</p>
        </div>
        <div className="outline p-2 m-2 rounded bg-white">
          <p>Total Bills:</p>
          <p>${total.billsSpent}</p>
          <p>Budget:</p>
          <p>${total.billsBudget.toFixed(2)}</p>
        </div>
        <div className="outline p-2 m-2 rounded bg-white">
          <p>Total Income:</p>
          <p>${total.incomeSpent}</p>
          <p>Budget:</p>
          <p>${total.incomeBudget.toFixed(2)}</p>
        </div>
        <div className="outline p-2 m-2 rounded bg-white">
          <p>Total Savings:</p>
          <p>${total.savingsSpent}</p>
          <p>Budget:</p>
          <p>${total.savingsBudget.toFixed(2)}</p>
        </div> */}
        <div className="outline p-2 m-2 rounded bg-white">
          <p>
            Total Expenses: $
            {total.billsSpent + total.savingsSpent + total.expenseSpent}
          </p>
          <p>
            Cashflow: $
            {(
              total.incomeSpent -
              total.billsSpent +
              total.savingsSpent +
              total.expenseSpent
            ).toFixed(2)}
          </p>
          <p>Total Budget:</p>
          <p>
            ${total.billsBudget + total.savingsBudget + total.expenseBudget}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
