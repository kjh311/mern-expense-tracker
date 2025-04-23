import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";
import PostNewSubcategory from "./PostNewSubcategory";
import PostNewTransaction from "./PostNewTransaction";
import CategoryBreakdown from "./CategoryBreakdown";
// import GetBudget from "./GetBudget";
import { getActionWord, getActionWordPassedTense } from "./ActionWords";
import DeleteTransaction from "./DeleteTransaction";
import UpdateTransaction from "./UpdateTransaction";

const ExpenseList = ({ name, category }) => {
  const [data, setData] = useState([]);
  const [activeKey, setActiveKey] = useState(null);
  // const [isDeleting, setIsDeleting] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [animatingId, setAnimatingId] = useState(null);

  // useEffect(() => {
  const fetchExpenses = async () => {
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
      console.error("Failed to fetch expenses", err);
    }
  };

  // fetchExpenses();
  // }, [category]);

  useEffect(() => {
    fetchExpenses();
  }, [category]);

  return (
    <div className="max-w-[1200px] myBorder mx-auto bg-red-300 shadow-md m-2 p-4 ">
      <Accordion className="">
        <Accordion.Header className="">
          <div className="flex flex-col items-center w-full ">
            <h2 className="text-center text-2xl font-bold text-indigo-600 m-4">
              {name}
            </h2>
            <CategoryBreakdown
              category={category}
              fetchExpenses={fetchExpenses}
            />
          </div>
        </Accordion.Header>

        <Accordion.Body>
          <Accordion>
            {data.map((sub, idx) => (
              <Accordion.Item
                eventKey={idx.toString()}
                key={sub._id}
                className="mb-3 border rounded-lg overflow-hidden accordion-item transition-all duration-300 ease-in-out hover:bg-blue-200 "
              >
                <Accordion.Header>
                  <div className="flex flex-col w-full gap-4 px-2 ">
                    {/* NAME */}
                    <div className="flex justify-center items-center w-full mb-4 ">
                      <span className="text-lg font-medium text-gray-700">
                        {sub.name}
                      </span>
                    </div>

                    {/* TOTAL SPENT, BUDGET, and LEFT TO SPEND/ EARN */}
                    <div className="flex flex-col sm:flex-row justify-around items-center w-full gap-2 sm:gap-4 ">
                      {/* Total Spent */}
                      <span className="text-gray-500 font-bold">
                        Total {getActionWordPassedTense(category)}: $
                        {sub.transactions
                          .reduce((sum, tx) => sum + tx.amount, 0)
                          .toFixed(2)}
                      </span>

                      {/* Budget */}
                      {sub.budget && (
                        <span className="text-sm text-gray-500">
                          Budget: ${sub.budget.toFixed(2)}
                        </span>
                      )}

                      {/* Left to Spend/Earn */}
                      {sub.budget && (
                        <span
                          className={`text-sm ${
                            (
                              sub.budget -
                              sub.transactions.reduce(
                                (sum, tx) => sum + tx.amount,
                                0
                              )
                            ).toFixed(2) < 0
                              ? "text-red-400 font-bold"
                              : "text-green-600"
                          }`}
                        >
                          Left to {getActionWord(category)}: $
                          {(
                            sub.budget -
                            sub.transactions.reduce(
                              (sum, tx) => sum + tx.amount,
                              0
                            )
                          ).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </Accordion.Header>

                <Accordion.Body className="bg-blue-200">
                  <PostNewTransaction
                    subcategory={sub._id}
                    fetchExpenses={fetchExpenses}
                  />

                  {sub.transactions.length === 0 ? (
                    <p className="text-gray-500 italic">No transactions</p>
                  ) : (
                    <ul className="space-y-2">
                      {sub.transactions.map((tx) => (
                        <li
                          key={tx._id}
                          className={`relative border border-gray-200 rounded-md p-3 bg-white shadow-sm transition-all duration-300 ease-in-out ${
                            animatingId === tx._id
                              ? "opacity-0 -translate-y-2 scale-95"
                              : ""
                          }`}
                        >
                          {/* Top: Description */}
                          <div>
                            <span className="font-semibold text-green-600 text-base sm:text-lg block text-center sm:text-left">
                              {tx.description}
                            </span>
                          </div>

                          {/* Bottom: Amount & Date */}
                          <div className="flex flex-col sm:flex-row justify-around items-center mt-2 gap-1 pr-10">
                            <span className="text-gray-700 text-sm sm:text-base">
                              ${tx.amount.toFixed(2)}
                            </span>
                            <span className="text-sm text-gray-500">
                              {new Date(tx.date).toLocaleDateString()}
                            </span>
                          </div>

                          {/* Icons: Absolute on the right */}
                          <div className="absolute top-2 right-2 flex gap-2">
                            <UpdateTransaction
                              id={tx._id}
                              fetchExpenses={fetchExpenses}
                            />
                            <DeleteTransaction
                              id={tx._id}
                              fetchExpenses={fetchExpenses}
                              deletingId={deletingId}
                              setDeletingId={setDeletingId}
                              txId={tx._id}
                              setAnimatingId={setAnimatingId}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            ))}
            <PostNewSubcategory
              fetchExpenses={fetchExpenses}
              category={category}
              activeKey={activeKey}
              setActiveKey={setActiveKey}
            />
          </Accordion>
        </Accordion.Body>
      </Accordion>
    </div>
  );
};

export default ExpenseList;
