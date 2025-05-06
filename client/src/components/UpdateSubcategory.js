import React, { useState, useContext } from "react";
import axios from "axios";
import Button from "./Button";
import { IoCloseCircle } from "react-icons/io5";
import { DayTheme } from "../App";
import Input from "./Input";

const UpdateSubcategory = ({
  id,
  categoryType,
  name,
  budget,
  fetchExpenses,
  setRefreshFlag,
  backgroundColor,
}) => {
  const fixedBudget = budget;
  const [nameInput, setNameInput] = useState(name);
  const [budgetInput, setBudgetInput] = useState(fixedBudget);
  const [dayTheme] = useContext(DayTheme);
  const [editModeSubcategory, setEditModeSubcategory] = useState(false);

  const handleEdit = (e) => {
    e.stopPropagation();
    setEditModeSubcategory(true);
  };

  const url =
    process.env.NODE_ENV === "development"
      ? `http://localhost:5000/api/subcategories/${id}`
      : // : `https://mern-expense-tracker-t3dj.onrender.com/api/subcategories/${id}`;
        `mern-expense-tracker-production-b291.up.railway.app/api/subcategories/${id}`;

  const handleSubcategoryUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        url,
        {
          budget: budgetInput,
          name: nameInput,
          categoryType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Subcategory updated:", res.data);
      await fetchExpenses();
      setRefreshFlag((prev) => !prev);
    } catch (err) {
      console.error("Error updating subcategories", err);
    }

    setEditModeSubcategory(false);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setEditModeSubcategory(false);
  };

  return (
    <>
      {!editModeSubcategory && (
        <Button
          id="update-subcategory"
          type={"submit"}
          onClick={handleEdit}
          text={"Update Category"}
          color={dayTheme ? "blue" : "purple"}
        />
      )}

      {editModeSubcategory && (
        <div
          className={`relative text-center py-4 px-2 outline m-2 rounded-xl w-100 my-animation ${
            dayTheme
              ? `my-animation accordion-body-day overview-accordion-body-${backgroundColor}`
              : `my-animation accordion-body-night overview-accordion-body-${backgroundColor}`
          }`}
        >
          <button
            onClick={handleClose}
            className={`react-icon text-white text-4xl transition-all duration-200 absolute top-2 right-1 sm:right-2`}
          >
            <IoCloseCircle />
          </button>
          <form onSubmit={handleSubcategoryUpdate} className="text-center">
            <label
              className={`my-animation mt-3 sm:mt-0 ${
                dayTheme ? "day-text" : "text-white"
              }`}
            >
              Subcategory Name:
            </label>
            <br />
            <Input
              // className="text-center py-2 m-2 rounded outline"
              type={"text"}
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />
            <br />
            <label
              className={`my-animation ${dayTheme ? "day-text" : "text-white"}`}
            >
              Budget for the month:
            </label>
            <br />
            <Input
              type={"number"}
              value={budgetInput}
              // className="text-center py-2 m-2 outline rounded"
              onChange={(e) => setBudgetInput(e.target.value)}
            />
            <br />
            <br />
            <Button
              type={"submit"}
              text={"Update Category"}
              color={dayTheme ? "blue" : "purple"}
            />
          </form>
        </div>
      )}
    </>
  );
};

export default UpdateSubcategory;
