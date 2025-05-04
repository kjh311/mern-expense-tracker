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
import { TransactionsTotal, DateContext } from "../App";
import ExpenseLineChart from "./ExpenseLineChart";
import { AccordionBody, AccordionHeader, AccordionItem } from "react-bootstrap";
import SubCategoryBarChart from "./SubCategoryBarChart";
import { formattedCurrency } from "./FormattedCurrency";
import { DayTheme } from "../App";
import MonthToggle from "./MonthToggle";
import ProgressBarComponent from "./ProgressBarComponent";
// import { executeScroll } from "./ExcecuteScroll";

const SubCategoriesWithTransactions = ({
  name,
  category,
  backgroundColor,
  mainKey,
  mainAccordionKey,
  setMainAccordionKey,
  refreshFlag,
  setRefreshFlag,
  // currentMonthIndex,
}) => {
  const [data, setData] = useState([]);
  const [activeKey, setActiveKey] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [animatingId, setAnimatingId] = useState(null);
  // const [editModeTransaction, setEditModeTransaction] = useState(false);
  const [total, setTotal] = useContext(TransactionsTotal);
  const [editModeSubcategory, setEditModeSubcategory] = useState(false);
  const isOpen = mainAccordionKey === mainKey;
  const allTransactions = data.flatMap((sub) => sub.transactions);
  const [dayTheme, setDayTheme] = useContext(DayTheme);

  const myRefMain = useRef(null);

  const executeScroll = () => {
    setTimeout(() => {
      console.log("Scroll");

      myRefMain.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }, "200");
  };

  // const [currentMonthIndex, setCurrentMonthIndex] = useContext(DateContext);
  const [dateState, setDateState] = useContext(DateContext);
  const { month: currentMonthIndex, year: currentYear } = dateState;

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

      // FILTER BASED ON MONTH SELECTED
      const filteredData = res.data.map((item) => {
        const filteredTransactions = (item.transactions || []).filter(
          (transaction) => {
            const date = new Date(transaction.date);
            return (
              date.getMonth() === currentMonthIndex &&
              date.getFullYear() === currentYear
            );
          }
        );

        console.log("FetchExpenses");

        return {
          ...item,
          transactions: filteredTransactions,
        };
      });

      setData(filteredData);
    } catch (err) {
      console.error("Failed to fetch expenses", err);
    }
  }, [category, currentMonthIndex, currentYear, refreshFlag]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses, currentMonthIndex, currentYear]);

  return (
    <div
      className={`category-card max-w-[1400px] myBorder w-full mx-auto ${backgroundColor} shadow-md m-1 p-3 sm:m-2 sm:p-4 my-animation ${
        dayTheme ? "category-card-day" : "category-card-night"
      }`}
    >
      <Accordion
        activeKey={isOpen ? "main" : null}
        onSelect={() => setMainAccordionKey(isOpen ? null : mainKey)}
        onClick={executeScroll}
      >
        <Accordion.Item
          eventKey="main"
          className={`my-animation ${
            dayTheme ? "accordion-item-day" : "accordion-item-night"
          }`}
        >
          <Accordion.Header
            className={`my-animation accordion-header-${
              dayTheme ? "day" : "night"
            } ${
              dayTheme
                ? `accordion-header-${backgroundColor}`
                : `accordion-header-${backgroundColor}`
            }`}
          >
            <div
              className={`my-animation flex flex-col items-center w-full ${
                dayTheme ? "day-text" : "text-white"
              }`}
            >
              <h2 className="text-center sm:text-4xl text-2xl font-bold text-shadow m-1 sm:m-4">
                {name}
              </h2>
              <CategoryBreakdown
                category={category}
                refreshFlag={refreshFlag}
                currentMonthIndex={currentMonthIndex}
                currentYear={currentYear}
                data={data}
              />
            </div>
          </Accordion.Header>

          <Accordion.Body
            ref={myRefMain}
            className={` ${
              dayTheme
                ? `my-animation accordion-body-day overview-accordion-body-${backgroundColor}`
                : `my-animation accordion-body-night overview-accordion-body-${backgroundColor}`
            }`}
          >
            <MonthToggle color={`${dayTheme ? "day-text" : "text-white"}`} />
            {data.length > 0 && (
              <SubCategoryBarChart
                data={data.map((sub) => ({
                  name: sub.name,
                  spent: sub.transactions.reduce(
                    (sum, tx) => sum + tx.amount,
                    0
                  ),
                  budget: sub.budget || 0,
                }))}
                category={category}
                dayTheme={dayTheme}
              />
            )}

            <h2
              className={`my-animation text-center text-shadow mb-3 text-md sm:text-4xl ${
                dayTheme ? "day-text" : "text-white"
              }`}
            >
              Categories:
            </h2>

            <PostNewSubcategory
              fetchExpenses={fetchExpenses}
              category={category}
              activeKey={activeKey}
              setActiveKey={setActiveKey}
              // setRefreshFlag={setRefreshFlag}
            />

            <Accordion
              activeKey={activeKey}
              onSelect={(eventKey) => setActiveKey(eventKey)}
              className=""
            >
              {data.map((sub, idx) => (
                <Accordion.Item
                  eventKey={idx.toString()}
                  key={sub._id}
                  className={`mx-2 my-4 my-animation ${
                    dayTheme ? "accordion-item-day" : "accordion-item-night"
                  }`}
                >
                  <Accordion.Header
                    className={`my-animation  accordion-header-${
                      dayTheme ? "day" : "night"
                    } ${
                      dayTheme
                        ? `accordion-header-higher-${backgroundColor}`
                        : `accordion-header-higher-${backgroundColor}`
                    }`}
                  >
                    <div
                      className={`my-animation flex flex-col w-full gap-4 px-2 ${
                        dayTheme ? "day-text" : "text-white"
                      }`}
                    >
                      {/* NAME */}
                      <div className="flex justify-center  items-center w-full">
                        <span className="sm:text-4xl text-2xl break  text-shadow">
                          {sub.name} 🏷️
                        </span>
                      </div>

                      <>
                        {/* TOTAL SPENT, BUDGET, and LEFT TO SPEND/ EARN */}
                        <div className="text-start sm:text-center flex flex-col sm:flex-row justify-around  w-full gap-2 sm:gap-4 sm:text-xl text-sm">
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
                                  ? `my-animation ${
                                      dayTheme ? "text-red-600" : "text-white"
                                    } font-bold`
                                  : `my-animation ${
                                      dayTheme ? "text-green-600" : "text-white"
                                    }`
                              }`}
                            >
                              <span
                                className={`my-animation ${
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
                        <ProgressBarComponent
                          whole={sub.budget}
                          part={sub.transactions.reduce(
                            (sum, tx) => sum + tx.amount,
                            0
                          )}
                        />
                      </>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body
                    className={` ${
                      dayTheme
                        ? `my-animation accordion-body-day overview-higher-accordion-body-${backgroundColor}`
                        : `my-animation accordion-body-night overview-higher-accordion-body-${backgroundColor}`
                    }`}
                  >
                    <div className="flex justify-around flex-wrap gap-2 mb-2">
                      {!editModeSubcategory && (
                        <DeleteSubcategory
                          id={sub._id}
                          fetchExpenses={fetchExpenses}
                          deletingId={deletingId}
                          setDeletingId={setDeletingId}
                          setAnimatingId={setAnimatingId}
                          animatingId={animatingId}
                          setRefreshFlag={setRefreshFlag}
                        />
                      )}
                      <UpdateSubcategory
                        id={sub._id}
                        fetchExpenses={fetchExpenses}
                        categoryType={category}
                        name={sub.name}
                        budget={sub.budget}
                        // editModeSubcategory={editModeSubcategory}
                        // setEditModeSubcategory={setEditModeSubcategory}
                        setRefreshFlag={setRefreshFlag}
                        backgroundColor={backgroundColor}
                      />
                    </div>

                    <MonthToggle
                      color={`${dayTheme ? "day-text" : "text-white"}`}
                    />

                    {/* LINE CHART */}
                    {sub.transactions.length > 0 && (
                      <ExpenseLineChart transactions={sub.transactions} />
                    )}

                    <h2
                      className={`my-animation text-center text-shadow ${
                        dayTheme ? "day-text" : "text-white"
                      }`}
                    >
                      Transactions:
                    </h2>
                    <br />

                    <PostNewTransaction
                      subcategory={sub._id}
                      setRefreshFlag={setRefreshFlag}
                      fetchExpenses={fetchExpenses}
                      backgroundColor={backgroundColor}
                      // maxLength={40}
                    />

                    {sub.transactions.length === 0 ? (
                      <p
                        className={`${
                          dayTheme ? "day-text" : "text-white"
                        } text-center italic my-animation no-transactions`}
                      >
                        No Transactions 📉
                      </p>
                    ) : (
                      <ul className="space-y-2">
                        {sub.transactions.map((tx) => (
                          <li
                            key={tx._id}
                            className={`transaction-item relative rounded-2xl my-3 p-3  my-animation ease-in-out ${
                              dayTheme
                                ? `my-animation accordion-body-day overview-highest-accordion-body-${backgroundColor}`
                                : `my-animation accordion-body-night overview-highest-accordion-body-${backgroundColor}`
                            }
                            ${
                              animatingId === tx._id
                                ? "opacity-0 -translate-y-2 scale-95"
                                : ""
                            }`}
                          >
                            {/* Top: Description */}
                            {/* {!editModeTransaction && ( */}
                            <>
                              <div>
                                <span
                                  className={`font-semibold pr-8 sm:pr-0  break text-shadow text-base sm:text-lg lg:text-3xl block text-left sm:text-center my-animation ${
                                    dayTheme ? "day-text" : "text-white"
                                  }`}
                                >
                                  {tx.description} 🛒
                                </span>
                              </div>

                              <div
                                className={`flex flex-col sm:flex-row justify-around items-start sm:items-center mt-2 gap-1 lg:text-lg sm:text-sm my-animation ${
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

                              {/* <DeleteTransaction
                                id={tx._id}
                                fetchExpenses={fetchExpenses}
                                deletingId={deletingId}
                                setDeletingId={setDeletingId}
                                txId={tx._id}
                                setAnimatingId={setAnimatingId}
                                setRefreshFlag={setRefreshFlag}
                              /> */}
                            </>
                            {/* )} */}
                            <UpdateTransaction
                              updateId={tx._id}
                              fetchExpenses={fetchExpenses}
                              date={tx.date}
                              amount={tx.amount}
                              description={tx.description}
                              subcategory={tx.subcategory}
                              recurring={tx.recurring}
                              // editModeTransaction={editModeTransaction}
                              // setEditModeTransaction={setEditModeTransaction}
                              setRefreshFlag={setRefreshFlag}
                              deletingId={deletingId}
                              setDeletingId={setDeletingId}
                              txId={tx._id}
                              id={tx._id}
                              setAnimatingId={setAnimatingId}
                            />
                          </li>
                        ))}
                      </ul>
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default SubCategoriesWithTransactions;
