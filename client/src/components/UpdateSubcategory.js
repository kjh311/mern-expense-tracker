import React, { useState, useContext } from "react";
import axios from "axios";
import Button from "./Button";
import { IoCloseCircle } from "react-icons/io5";
import { formattedCurrency } from "./FormattedCurrency";
import { DayTheme } from "../App";

const UpdateSubcategory = ({
  id,
  categoryType,
  name,
  budget,
  editModeSubcategory,
  setEditModeSubcategory,
  fetchExpenses,
  setRefreshFlag,
  backgroundColor,
}) => {
  const fixedBudget = budget;
  const [nameInput, setNameInput] = useState(name);
  const [budgetInput, setBudgetInput] = useState(fixedBudget);
  const [dayTheme, setDayTheme] = useContext(DayTheme);

  const handleEdit = (e) => {
    e.stopPropagation();
    setEditModeSubcategory(true);
  };

  const handleSubcategoryUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:5000/api/subcategories/${id}`,
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
          text={"Update SubCategory"}
          color={"blue"}
        />
      )}

      {editModeSubcategory && (
        <div
          className={`relative text-center p-4 outline m-2 rounded-xl w-100 transition-all duration-300 ${
            dayTheme
              ? `transition-all duration-300 accordion-body-day overview-accordion-body-${backgroundColor}`
              : `transition-all duration-300 accordion-body-night overview-accordion-body-${backgroundColor}`
          }`}
        >
          <button
            onClick={handleClose}
            className={`react-icon text-white text-4xl transition-all duration-200 absolute top-2 right-2`}
          >
            <IoCloseCircle />
          </button>
          <form onSubmit={handleSubcategoryUpdate} className="text-center">
            <label
              className={`transition-all duration-300 ${
                dayTheme ? "day-text" : "text-white"
              }`}
            >
              Subcategory Name:
            </label>
            <br />
            <input
              className="text-center p-2 m-2 rounded outline"
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />
            <br />
            <label
              className={`transition-all duration-300 ${
                dayTheme ? "day-text" : "text-white"
              }`}
            >
              Budget for the month:
            </label>
            <br />
            <input
              type="number"
              value={budgetInput}
              className="text-center p-2 m-2 outline rounded"
              onChange={(e) => setBudgetInput(e.target.value)}
            />
            <br />
            <br />
            <Button
              type={"submit"}
              text={"Update SubCategory"}
              color={"blue"}
            />
          </form>
        </div>
      )}
    </>
  );
};

export default UpdateSubcategory;
