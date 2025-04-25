import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import axios from "axios";
import Button from "./Button";
import Input from "./Input";

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
          subcategory,
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
    <div className="flex justify-center">
      <Accordion className="my-4 lg:w-50 sm:w-full">
        <AccordionItem eventKey="newTransaction">
          <AccordionHeader className="bg-gray-100 w-full flex justify-center items-center">
            <h2 className="text-lg font-semibold text-gray-700 text-center w-full">
              Add New Transaction{" "}
              <span className="text-3xl text-red-500">+</span>
            </h2>
          </AccordionHeader>

          <AccordionBody className="bg-white px-6 py-4">
            <form
              onSubmit={handlePostTransaction}
              className="flex flex-col gap-4 items-center"
            >
              <Input
                type={"text"}
                value={description}
                placeholder={"Enter Description"}
                onChange={(e) => setDescription(e.target.value)}
                required
              />

              <Input
                type={"number"}
                value={amount}
                placeholder={"Enter Amount"}
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

              <Button type={"submit"} text={"Submit"} color={"blue"} />
            </form>
          </AccordionBody>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default PostNewTransaction;
