import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import Button from "./Button";

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
  const [categoryTypeInput, setCategoryTypeInput] = useState(categoryType);
  const [budgetInput, setBudgetInput] = useState(fixedBudget);

  const handleEdit = (e) => {
    e.stopPropagation();
    setEditModeSubcategory(true);
    console.log("edit mode");
    // console.log(typeof budget, budget.toFixed(2));
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
      {/* <div> */}
      {editModeSubcategory && (
        <form onSubmit={handleSubcategoryUpdate} className="text-center">
          <label>Subcategory Name:</label>
          <br />
          <input
            className="text-center p-2 m-2 border"
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
            className="text-center p-2 m-2 border"
            onChange={(e) => setBudgetInput(e.target.value)}
          />
          <br />
          <Button type={"submit"} text={"Update SubCategory"} color={"blue"} />
        </form>
      )}
      {/* </div> */}
    </>
  );
};

export default UpdateSubcategory;
