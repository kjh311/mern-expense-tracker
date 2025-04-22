import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import axios from "axios";

const PostNewSubcategory = ({ fetchExpenses }) => {
  //   const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [categoryType, setCategoryType] = useState("");
  const [budget, setBudget] = useState("");

  const handlePost = (e) => {
    e.preventDefault();
    console.log("name", name, "categoryType", categoryType, "budget", budget);

    const postSub = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/subcategories", // Adjust your endpoint as needed
          {
            name,
            categoryType,
            budget,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Subcategory posted:", res.data);
        fetchExpenses();
      } catch (err) {
        console.error("Failed to post subcategory", err);
      }
    };

    postSub();

    setName("");
    setCategoryType("");
    setBudget("");
  };

  const handleDropDownChange = (e) => {
    setCategoryType(e.target.value);
  };

  return (
    <Accordion className="text-center">
      <AccordionHeader className="bg-gray-100 py-3">
        <h1 className="text-lg font-semibold text-gray-700">
          Add New Subcategory +
        </h1>
      </AccordionHeader>
      <AccordionBody className="bg-white p-6">
        <form
          onSubmit={handlePost}
          className="flex flex-col items-center gap-4"
        >
          <input
            type="text"
            className="w-full max-w-md border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter name of subcategory"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select
            className="w-full max-w-md border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleDropDownChange}
            name="category"
            id="category-dropdown"
            value={categoryType}
            required
          >
            <option value="">-- Select a Category --</option>
            <option value="expense">Expenses</option>
            <option value="savings">Savings</option>
            <option value="income">Income</option>
            <option value="bills">Bills</option>
          </select>

          <input
            type="number"
            value={budget}
            placeholder="Enter Monthly Budget"
            required
            className="w-full max-w-md border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => setBudget(parseFloat(e.target.value) || 0)}
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition duration-200"
          >
            Submit
          </button>
        </form>
      </AccordionBody>
    </Accordion>
  );
};

export default PostNewSubcategory;
