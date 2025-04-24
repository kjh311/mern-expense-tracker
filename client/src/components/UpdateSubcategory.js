import React, { useState } from "react";
import axios from "axios";
import Button from "./Button";
import { IoCloseCircle } from "react-icons/io5";

const UpdateSubcategory = ({
  id,
  categoryType,
  name,
  budget,
  editModeSubcategory,
  setEditModeSubcategory,
}) => {
  const fixedBudget = budget.toFixed(2);
  const [nameInput, setNameInput] = useState(name);
  const [budgetInput, setBudgetInput] = useState(fixedBudget);

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
          type={"submit"}
          onClick={handleEdit}
          text={"Update SubCategory"}
          color={"blue"}
        />
      )}

      {editModeSubcategory && (
        <div className="relative text-center bg-gray-100 p-4 outline m-2 rounded-xl w-100">
          <button
            onClick={handleClose}
            className={`react-icon text-red-500 text-4xl transition-all duration-200 absolute top-2 right-2`}
          >
            <IoCloseCircle />
          </button>
          <form onSubmit={handleSubcategoryUpdate} className="text-center">
            <label>Subcategory Name:</label>
            <br />
            <input
              className="text-center p-2 m-2 rounded outline"
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />
            <br />
            <label>Budget for the month:</label>
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
