import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useCallback,
} from "react";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";
import PostNewSubcategory from "./PostNewSubcategory";
import PostNewTransaction from "./PostNewTransaction";
import CategoryBreakdown from "./CategoryBreakdown";
import { getActionWord, getActionWordPassedTense } from "./ActionWords";
import DeleteTransaction from "./DeleteTransaction";
import UpdateTransaction from "./UpdateTransaction";
import DeleteSubcategory from "./DeleteSubcategory";
import UpdateSubcategory from "./UpdateSubcategory";
import { TransactionsTotal } from "../App";
import ExpenseLineChart from "./ExpenseLineChart";
import { AccordionBody, AccordionHeader, AccordionItem } from "react-bootstrap";
import SubcategoryBarChart from "./SubCategoryBarChart";
import { formattedCurrency } from "./FormattedCurrency";
import { DayTheme } from "../App";

const ExpenseList = ({
  name,
  category,
  backgroundColor,
  mainKey,
  mainAccordionKey,
  setMainAccordionKey,
}) => {
  const [data, setData] = useState([]);
  const [activeKey, setActiveKey] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [animatingId, setAnimatingId] = useState(null);
  const [editModeTransaction, setEditModeTransaction] = useState(false);
  const [total, setTotal] = useContext(TransactionsTotal);
  const [editModeSubcategory, setEditModeSubcategory] = useState(false);
  const isOpen = mainAccordionKey === mainKey;
  const allTransactions = data.flatMap((sub) => sub.transactions);
  const [dayTheme, setDayTheme] = useContext(DayTheme);

  const fetchExpenses = useCallback(async () => {
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
  }, [category]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return (
    <div
      className={`category-card max-w-[1400px] myBorder w-full mx-auto ${backgroundColor} shadow-md m-2 p-4 transition-all duration-300 ${
        dayTheme ? "category-card-day" : "category-card-night"
      }`}
    >
      <Accordion
        activeKey={isOpen ? "main" : null}
        onSelect={() => setMainAccordionKey(isOpen ? null : mainKey)}
      >
        <Accordion.Item eventKey="main">
          <Accordion.Header
            className={`transition-all duration-300 ${
              dayTheme
                ? `accordion-header-day-${category}`
                : `accordion-header-night-${category}`
            }`}
          >
            <div
              className={`transition-all duration-300 flex flex-col items-center w-full ${
                dayTheme ? "day-text" : "text-white"
              }`}
            >
              <h2 className="text-center lg:text-4xl xs:text-2xl font-bold  m-4">
                {name}
              </h2>
              <CategoryBreakdown
                category={category}
                fetchExpenses={fetchExpenses}
              />
            </div>
          </Accordion.Header>

          <Accordion.Body
            className={`transition-all duration-300 ${
              dayTheme
                ? "overview-accordion-body-day"
                : "overview-accordion-body-night"
            }`}
          >
            <Accordion
              activeKey={activeKey}
              onSelect={(eventKey) => setActiveKey(eventKey)}
              className=""
            >
              {data.map((sub, idx) => (
                <Accordion.Item
                  eventKey={idx.toString()}
                  key={sub._id}
                  className="mb-3 border rounded-lg overflow-hidden accordion-item transition-all duration-300 ease-in-out  "
                >
                  <Accordion.Header
                    className={`transition-all duration-300 accordion-header-day ${
                      dayTheme
                        ? `accordion-header-day-${category}`
                        : `accordion-header-night-${category}`
                    }`}
                  >
                    <div
                      className={`transition-all duration-300 flex flex-col w-full gap-4 px-2 ${
                        dayTheme ? "day-text" : "text-white"
                      }`}
                    >
                      {/* NAME */}
                      <div className="flex justify-center items-center w-full">
                        <span className="lg:text-2xl sm:text-lg ">
                          {sub.name} 🏷️
                        </span>
                      </div>

                      {/* TOTAL SPENT, BUDGET, and LEFT TO SPEND/ EARN */}
                      <div className="text-center flex flex-col sm:flex-row justify-around items-center w-full gap-2 sm:gap-4 lg:text-xl xs:text-sm">
                        {/* Total Spent */}
                        <span className="">
                          💵 Total {getActionWordPassedTense(category)}:
                          {formattedCurrency(
                            sub.transactions.reduce(
                              (sum, tx) => sum + tx.amount,
                              0
                            )
                          )}
                        </span>

                        {/* Budget */}
                        {sub.budget && (
                          <span className=" ">
                            💰 Budget: {formattedCurrency(sub.budget)}
                          </span>
                        )}

                        {/* Left to Spend/Earn */}
                        {sub.budget && (
                          <span
                            className={`${
                              sub.budget -
                                sub.transactions.reduce(
                                  (sum, tx) => sum + tx.amount,
                                  0
                                ) <
                              0
                                ? "text-red-400 font-bold"
                                : "text-green-600"
                            }`}
                          >
                            <span
                              className={`transition-all duration-300 ${
                                dayTheme ? "day-text" : "text-white"
                              }`}
                            >
                              🏦 Left to {getActionWord(category)}:
                            </span>{" "}
                            {formattedCurrency(
                              sub.budget -
                                sub.transactions.reduce(
                                  (sum, tx) => sum + tx.amount,
                                  0
                                )
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body
                    className={`transition-all duration-300 ${
                      dayTheme
                        ? "overview-accordion-body-day"
                        : "overview-accordion-body-night"
                    }`}
                  >
                    <div className="flex justify-around flex-wrap">
                      {!editModeSubcategory && (
                        <DeleteSubcategory
                          id={sub._id}
                          fetchExpenses={fetchExpenses}
                          deletingId={deletingId}
                          setDeletingId={setDeletingId}
                          setAnimatingId={setAnimatingId}
                          animatingId={animatingId}
                        />
                      )}
                      <UpdateSubcategory
                        id={sub._id}
                        fetchExpenses={fetchExpenses}
                        categoryType={category}
                        name={sub.name}
                        budget={sub.budget}
                        editModeSubcategory={editModeSubcategory}
                        setEditModeSubcategory={setEditModeSubcategory}
                      />
                    </div>

                    {/* LINE CHART */}
                    {sub.transactions.length > 0 && (
                      <ExpenseLineChart transactions={sub.transactions} />
                    )}

                    <PostNewTransaction
                      subcategory={sub._id}
                      fetchExpenses={fetchExpenses}
                    />

                    {sub.transactions.length === 0 ? (
                      <p className="text-gray-500 italic">No Transactions 📉</p>
                    ) : (
                      <ul className="space-y-2">
                        {sub.transactions.map((tx) => (
                          <li
                            key={tx._id}
                            className={`transaction-item relative  rounded-md p-3  transition-all duration-300 ease-in-out ${
                              dayTheme
                                ? "overview-accordion-body-day"
                                : "overview-accordion-body-night"
                            } ${
                              animatingId === tx._id
                                ? "opacity-0 -translate-y-2 scale-95"
                                : ""
                            }`}
                          >
                            {/* Top: Description */}
                            {!editModeTransaction && (
                              <>
                                <div>
                                  <span
                                    className={`font-semibold  text-base sm:text-lg lg:text-2xl block text-center sm:text-left transition-all duration-300 ${
                                      dayTheme ? "day-text" : "text-white"
                                    }`}
                                  >
                                    {tx.description}
                                  </span>
                                </div>

                                <div
                                  className={`flex flex-col sm:flex-row justify-around items-center mt-2 gap-1 lg:text-lg sm:text-sm transition-all duration-300 ${
                                    dayTheme ? "day-text" : "text-white"
                                  }`}
                                >
                                  <span className="  ">
                                    {formattedCurrency(tx.amount)}
                                  </span>
                                  <span className="  ">
                                    {new Date(tx.date).toLocaleDateString()} 📅
                                  </span>
                                </div>

                                <DeleteTransaction
                                  id={tx._id}
                                  fetchExpenses={fetchExpenses}
                                  deletingId={deletingId}
                                  setDeletingId={setDeletingId}
                                  txId={tx._id}
                                  setAnimatingId={setAnimatingId}
                                />
                              </>
                            )}
                            <UpdateTransaction
                              id={tx._id}
                              fetchExpenses={fetchExpenses}
                              date={tx.date}
                              amount={tx.amount}
                              description={tx.description}
                              subcategory={tx.subcategory}
                              recurring={tx.recurring}
                              editModeTransaction={editModeTransaction}
                              setEditModeTransaction={setEditModeTransaction}
                            />
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
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default ExpenseList;
