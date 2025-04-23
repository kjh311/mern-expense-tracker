import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "./Button";
import { IoCloseCircle } from "react-icons/io5";

const UpdateTransaction = ({
  id,
  fetchExpenses,
  date,
  amount,
  description,
  recurring,
  editModeTransaction,
  setEditModeTransaction,
}) => {
  const [amountInput, setAmountInput] = useState(amount);
  const [descriptionInput, setDescriptionInput] = useState(description);
  const [recurringInput, setRecurringInput] = useState(recurring);
  const [dateInput, setDateInput] = useState(date);

  const [startDate, setStartDate] = useState(date);

  const handleEdit = () => {
    setEditModeTransaction(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:5000/api/transactions/${id}`,
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
    } catch (err) {
      console.error("Failed to update transaction", err);
    }

    // console.log(
    //   "amount: ",
    //   amountInput,
    //   "description: ",
    //   descriptionInput,
    //   "Recurring: ",
    //   recurringInput,
    //   "date: ",
    //   dateInput
    // );

    setEditModeTransaction(false);
    // setAmountInput(amountInput);
    // setDescriptionInput(descriptionI);
    // setDateInput(date);
    // setRecurringInput(recurring);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setEditModeTransaction(false);
  };

  return (
    <>
      {!editModeTransaction && (
        <button onClick={handleEdit}>
          <FaEdit
            className="react-icon text-blue-500 hover:text-blue-700 transition-all duration-200 absolute bottom-4 right-2 "
            size={25}
          />
        </button>
      )}

      {editModeTransaction && (
        <form onSubmit={handleUpdateSubmit} className="text-center">
          <div className="">
            {" "}
            <button
              onClick={handleClose}
              className={`react-icon text-red-500 text-4xl   transition-all duration-200 absolute top-2 right-2`}
            >
              <IoCloseCircle />
            </button>
          </div>
          <h2>Update transaction:</h2>

          <label htmlFor="descriptionInput">Description:</label>
          <input
            type="text"
            name="descriptionInput"
            value={descriptionInput}
            className="p-2 m-2 border"
            onChange={(e) => setDescriptionInput(e.target.value)}
          />
          <br />
          <label>Amount:</label>
          <input
            type="number"
            value={amountInput.toFixed(2)}
            className="p-2 m-2 border"
            onChange={(e) => setAmountInput(e.target.value)}
          />
          <br />
          <label>Date:</label>
          <DatePicker
            className="p-2 m-2 border text-center"
            selected={dateInput}
            onChange={(dateInput) => setDateInput(dateInput)}
          />
          <br />
          <label>Recurring: </label>
          <input
            type="checkbox"
            value={recurringInput}
            onChange={(e) => setRecurringInput(e.target.value)}
          />
          <br />
          <br />
          <Button type={"submit"} text={"Update"} color={"blue"} />
        </form>
      )}
    </>
  );
};

export default UpdateTransaction;
