import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import axios from "axios";

const PostNewTransaction = ({ subcategory, fetchExpenses }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [recurring, setRecurring] = useState(false);

  const handlePostTransaction = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:5000/api/transactions`,
        {
          description,
          amount,
          subcategory, // This can be an ID or full object depending on backend expectations
          recurring,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Transaction posted:", res.data);

      // Clear form
      setDescription("");
      setAmount("");
      setRecurring(false);
      fetchExpenses();
    } catch (err) {
      console.error("Failed to post transaction", err);
    }
  };

  return (
    <Accordion className="my-4">
      <AccordionItem eventKey="newTransaction">
        <AccordionHeader className="bg-gray-100 w-full flex justify-center items-center">
          <h2 className="text-lg font-semibold text-gray-700 text-center w-full">
            Add New Transaction <span className="text-3xl">+</span>
          </h2>
        </AccordionHeader>

        <AccordionBody className="bg-white px-6 py-4">
          <form
            onSubmit={handlePostTransaction}
            className="flex flex-col gap-4 items-center"
          >
            <input
              type="text"
              value={description}
              className="w-full max-w-md border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Description"
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <input
              type="number"
              value={amount}
              className="w-full max-w-md border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter Amount"
              onChange={(e) => setAmount(e.target.value)}
              required
            />

            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={recurring}
                onChange={(e) => setRecurring(e.target.checked)}
              />
              Recurring Transaction
            </label>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition duration-200"
            >
              Submit
            </button>
          </form>
        </AccordionBody>
      </AccordionItem>
    </Accordion>
  );
};

export default PostNewTransaction;
