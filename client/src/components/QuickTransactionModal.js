import React, { useState, useContext, useCallback, useEffect } from "react";
import Button from "./Button";
import { DayTheme, DateContext } from "../App";
import { IoCloseCircle } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Input from "./Input";
import axios from "axios";

const QuickTransactionModal = ({ setRefreshFlag, showModal, setShowModal }) => {
  //   const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState("");
  const [dayTheme, setDayTheme] = useContext(DayTheme);
  //   const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [dateInput, setDateInput] = useState(new Date());
  //   const [dateState, setDateState] = useContext(DateContext);
  const [description, setDescription] = useState("");
  //   const { month: currentMonthIndex, year: currentYear } = dateState;
  const [recurring, setRecurring] = useState(false);

  //   console.log("showmodal: ", showModal);

  const getSubcategoriesUrl =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8080/api/subcategories/${selectedCategory}-with-transactions`
      : `https://mern-expense-tracker-v5y1.onrender.com/api/subcategories/${selectedCategory}-with-transactions`;
  // : `https://mern-expense-tracker-production-b291.up.railway.app/api/subcategories/${selectedCategory}-with-transactions`;
  // : `https://mern-expense-tracker.fly.dev/api/subcategories/${selectedCategory}-with-transactions`;

  const handleGetSubcategories = useCallback(async () => {
    try {
      const res = await axios.get(getSubcategoriesUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setData(res.data);
    } catch (err) {
      console.error("Failed to fetch subcategories", err);
    }
  }, [selectedCategory]);

  useEffect(() => {
    selectedCategory !== "" && handleGetSubcategories();
  }, [selectedCategory]);

  const handleClose = () => {
    setShowModal(false);
  };

  const quickTransactionPostUrl =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8080/api/transactions`
      : `https://mern-expense-tracker-v5y1.onrender.com/api/transactions`;
  // : `https://mern-expense-tracker-production-b291.up.railway.app/api/transactions`;
  //  : `https://mern-expense-tracker.fly.dev/api/transactions`;

  const handleQuickTransactionSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        quickTransactionPostUrl,
        {
          description,
          amount: amount,
          subcategory: selectedSubCategoryId,
          recurring,
          date: dateInput,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Transaction posted:", res.data);
      console.log("Posting:", {
        description,
        amount: parseFloat(amount),
        subcategory: selectedSubCategory,
        recurring,
        date: dateInput.toISOString(),
      });

      // Clear form
      setDescription("");
      setAmount("");
      // setRecurring(false);
      //   await fetchExpenses();
      await setRefreshFlag((prev) => !prev);
    } catch (err) {
      console.error("Failed to post quick transaction", err);
    }
    console.log(
      "selectedCategory: ",
      selectedCategory,
      " selectedSubCategory: ",
      selectedSubCategory,
      "typeof subcategory: ",
      typeof selectedSubCategory,
      " dateInput: ",
      dateInput,
      "amount: ",
      amount,
      "description: ",
      description
    );
  };

  return (
    <div
      className={`flex justify-center flex-column   ${
        dayTheme ? "day-text" : "night-text"
      }`}
    >
      <Button
        onClick={() => setShowModal(true)}
        text={"Quick Transaction"}
        color={dayTheme ? "white" : "purple"}
      />
      {showModal && (
        <div
          className={`quick-modal-backdrop text-center z-10  ${
            dayTheme ? "day-text" : "night-text"
          }`}
        >
          <div
            className={`quick-modal relative ${
              dayTheme ? "quick-modal-day" : "quick-modal-night"
            }`}
          >
            <button
              onClick={handleClose}
              className={`react-icon 
                            text-white text-4xl transition-all duration-200 absolute top-2 right-2`}
            >
              <IoCloseCircle />
            </button>

            <h3 className="text-white">Quick Add Transaction</h3>

            <form onSubmit={handleQuickTransactionSubmit}>
              <select
                className={`${dayTheme ? "day-text" : "text-gray-900"}`}
                value={selectedCategory}
                required
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedSubCategory("");
                }}
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="expense">Expenses</option>
                <option value="bills">Bills</option>
                <option value="savings">Savings</option>
                <option value="income">Income</option>
              </select>

              <select
                className={`${dayTheme ? "day-text" : "text-gray-900"} p-2`}
                value={selectedSubCategory}
                onChange={(e) => {
                  const selectedName = e.target.value;
                  setSelectedSubCategory(selectedName);
                  // Find the corresponding item object to get its _id
                  const selectedItem = data.find(
                    (item) => item.name === selectedName
                  );
                  if (selectedItem && selectedItem._id) {
                    setSelectedSubCategoryId(selectedItem._id);
                  } else {
                    setSelectedSubCategoryId(null); // Or some default value if _id is missing
                  }
                }}
                required
              >
                <option value="" disabled>
                  Select Subcategory
                </option>
                {[...data]
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((item) => (
                    <option key={item._id || item.name} value={item.name}>
                      {item.name}
                    </option>
                  ))}
              </select>

              <Input
                className={`${
                  dayTheme
                    ? "quick-modal-amount-day"
                    : "quick-modal-amount-night"
                }`}
                type={"text"}
                value={description}
                placeholder={"Description"}
                onChange={(e) => setDescription(e.target.value)}
                required
              />

              <Input
                className={`${
                  dayTheme
                    ? "quick-modal-amount-day"
                    : "quick-modal-amount-night"
                }`}
                type={"number"}
                value={amount}
                placeholder={"Amount $$"}
                onChange={(e) => setAmount(e.target.value)}
                required
              />

              <DatePicker
                className={`p-2  date-picker text-center w-full ${
                  dayTheme ? "day-text" : "text-gray-900"
                }`}
                selected={dateInput}
                onChange={(dateInput) => setDateInput(dateInput)}
              />
              <br />
              <Button
                type={"submit"}
                text={"Submit"}
                // onClick={handleQuickPostTransaction}
                color={dayTheme ? "blue" : "purple"}
              ></Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickTransactionModal;
