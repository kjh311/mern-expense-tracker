import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import axios from "axios";

const PostNewSubcategory = ({
  fetchExpenses,
  category,
  activeKey,
  setActiveKey,
}) => {
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");

  const handlePost = (e) => {
    e.preventDefault();

    const postSub = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/subcategories",
          {
            name,
            categoryType: category,
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
        fetchExpenses(); // trigger parent update
        setActiveKey(null);
      } catch (err) {
        console.error("Failed to post subcategory", err);
      }
    };

    postSub();
    setName("");
    setBudget("");
  };

  return (
    <AccordionItem eventKey="new">
      <AccordionHeader className="bg-gray-100 w-full flex justify-center items-center">
        <h2 className="text-lg font-semibold text-gray-700 text-center w-full">
          Add New SubCategory <span className="text-3xl">+</span>
        </h2>
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
    </AccordionItem>
  );
};

export default PostNewSubcategory;
