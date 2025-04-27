import React, { useState, useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import axios from "axios";
import Button from "./Button";
import Input from "./Input";
import { DayTheme } from "../App";
import { getActionWord, getActionWordPassedTense } from "./ActionWords";

const PostNewTransaction = ({
  subcategory,
  setRefreshFlag,
  fetchExpenses,
  backgroundColor,
}) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [dayTheme, setDayTheme] = useContext(DayTheme);

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
      await fetchExpenses();
      setRefreshFlag((prev) => !prev);
    } catch (err) {
      console.error("Failed to post transaction", err);
    }
  };

  return (
    <div className="flex justify-center">
      <Accordion className="mb-2 lg:w-50 sm:w-full">
        <AccordionItem
          eventKey="newTransaction"
          className={`transition-all duration-300 ${
            dayTheme ? "overview-item-day" : "overview-item-night"
          }`}
        >
          <AccordionHeader
            className={`transition-all duration-300  accordion-header-${
              dayTheme ? "day" : "night"
            } ${
              dayTheme
                ? `accordion-header-higher-${backgroundColor}`
                : `accordion-header-higher-${backgroundColor}`
            }`}
          >
            <h2
              className={`transition-all duration-300 text-2xl text-shadow font-semibold text-center w-full ${
                dayTheme ? "day-text" : "text-white"
              }`}
            >
              Add New Transaction{" "}
              <span
                className={`transition-all duration-300 text-3xl ${
                  dayTheme ? "text-red-500" : "white"
                }`}
              >
                +
              </span>
            </h2>
          </AccordionHeader>

          <AccordionBody
            className={`transition-all duration-300 ${
              dayTheme
                ? `transition-all duration-300 accordion-body-day overview-highest-accordion-body-${backgroundColor}`
                : `transition-all duration-300 accordion-body-night overview-highest-accordion-body-${backgroundColor}`
            }`}
          >
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
                placeholder={"Enter Amount Spent"}
                onChange={(e) => setAmount(e.target.value)}
                required
              />

              {/* <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={recurring}
                  onChange={(e) => setRecurring(e.target.checked)}
                />
                Recurring Transaction
              </label> */}

              <Button
                type={"submit"}
                text={"Submit"}
                color={dayTheme ? "blue" : "red"}
              />
            </form>
          </AccordionBody>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default PostNewTransaction;
