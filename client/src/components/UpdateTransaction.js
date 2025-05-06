import React, { useState, useContext } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "./Button";
import { IoCloseCircle } from "react-icons/io5";
import { DayTheme } from "../App";
import Input from "./Input";
import DeleteTransaction from "./DeleteTransaction";

const UpdateTransaction = ({
  updateId,
  date,
  amount,
  description,
  recurring,
  fetchExpenses,
  setRefreshFlag,
  txId,
  id,
  setAnimatingId,
}) => {
  const [amountInput, setAmountInput] = useState(amount);
  const [descriptionInput, setDescriptionInput] = useState(description);
  const [recurringInput] = useState(recurring);
  const [dateInput, setDateInput] = useState(date);
  const [dayTheme] = useContext(DayTheme);
  const [editModeTransaction, setEditModeTransaction] = useState(false);

  const handleEdit = () => {
    setEditModeTransaction(true);
  };

  const url =
    process.env.NODE_ENV === "development"
      ? `http://localhost:5000/api/transactions/${updateId}`
      : `https://mern-expense-tracker-t3dj.onrender.com/api/transactions/${updateId}`;

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        url,
        {
          description: descriptionInput,
          amount: amountInput,
          date: dateInput,
          recurring: recurringInput,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Transaction updated:", res.data);
      await fetchExpenses();
      setRefreshFlag((prev) => !prev);
    } catch (err) {
      console.error("Failed to update transaction", err);
    }

    setEditModeTransaction(false);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setEditModeTransaction(false);
  };

  return (
    <>
      {!editModeTransaction && (
        <>
          <button onClick={handleEdit}>
            <FaEdit
              className={`react-icon ${
                dayTheme ? "text-blue-500" : "text-white"
              } transition-all duration-200 absolute bottom-4 right-2`}
              size={25}
            />
          </button>
          <DeleteTransaction
            id={id}
            fetchExpenses={fetchExpenses}
            // deletingId={deletingId}
            // setDeletingId={setDeletingId}
            txId={txId}
            setAnimatingId={setAnimatingId}
            setRefreshFlag={setRefreshFlag}
          />
        </>
      )}

      {editModeTransaction && (
        <form onSubmit={handleUpdateSubmit} className="text-center">
          <div className="">
            {" "}
            <button
              onClick={handleClose}
              className={`react-icon 
                text-white text-4xl transition-all duration-200 absolute top-2 right-2`}
            >
              <IoCloseCircle />
            </button>
          </div>
          <h2
            className={`pb-3 my-animation ${
              dayTheme ? "day-text" : "text-white"
            }`}
          >
            Update transaction:
          </h2>

          <label
            htmlFor="descriptionInput"
            className={`my-animation ${dayTheme ? "day-text" : "text-white"}`}
          >
            Description:
          </label>
          <br />
          <Input
            type={"text"}
            name={"descriptionInput"}
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
          />

          <br />
          <br />
          <label
            className={`my-animation ${dayTheme ? "day-text" : "text-white"}`}
          >
            Amount $$:
          </label>
          <br />

          <Input
            type={"number"}
            value={amountInput}
            onChange={(e) => setAmountInput(e.target.value)}
          />
          <br />
          {/* <br /> */}
          <label
            className={`my-animation m-2 ${
              dayTheme ? "day-text" : "text-white"
            }`}
          >
            Date:
          </label>
          <br />
          <DatePicker
            className="p-2 m-2 date-picker border text-center w-full"
            selected={dateInput}
            onChange={(dateInput) => setDateInput(dateInput)}
          />
          <br />

          {/* <br /> */}
          <br />
          <Button type={"submit"} text={"Update"} color={"blue"} />
        </form>
      )}
    </>
  );
};

export default UpdateTransaction;
