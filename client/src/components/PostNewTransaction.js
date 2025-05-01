import React, { useState, useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
  const [dateInput, setDateInput] = useState(new Date());

  const disableButton = amount === "" || description === "";
  console.log("Disabled: ", disableButton);

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
          date: dateInput,
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
          className={`my-animation ${
            dayTheme ? "overview-item-day" : "overview-item-night"
          }`}
        >
          <AccordionHeader
            className={`my-animation  accordion-header-${
              dayTheme ? "day" : "night"
            } ${
              dayTheme
                ? `accordion-header-higher-${backgroundColor}`
                : `accordion-header-higher-${backgroundColor}`
            }`}
          >
            <span className="flex justify-start sm:justify-center">
              <h2
                className={`my-animation sm:text-2xl text-sm text-shadow font-semibold  w-full ${
                  dayTheme ? "day-text" : "text-white"
                }`}
              >
                Add New Transaction{" "}
                <span
                  className={`my-animation text-3xl ${
                    dayTheme ? "text-red-500" : "white"
                  }`}
                >
                  +
                </span>
              </h2>
            </span>
          </AccordionHeader>

          <AccordionBody
            className={`my-animation ${
              dayTheme
                ? `my-animation accordion-body-day overview-highest-accordion-body-${backgroundColor}`
                : `my-animation accordion-body-night overview-highest-accordion-body-${backgroundColor}`
            }`}
          >
            <form
              onSubmit={handlePostTransaction}
              className="flex flex-col gap-4 items-center"
            >
              <Input
                type={"text"}
                value={description}
                placeholder={"Description"}
                onChange={(e) => setDescription(e.target.value)}
                required
              />

              <Input
                type={"number"}
                value={amount}
                placeholder={"Amount Spent"}
                onChange={(e) => setAmount(e.target.value)}
                required
              />

              <label
                className={`my-animation text-xl ${
                  dayTheme ? "day-text" : "text-white"
                }`}
              >
                Date:
              </label>
              <DatePicker
                className="p-2  border text-center w-full"
                selected={dateInput}
                onChange={(dateInput) => setDateInput(dateInput)}
              />

              <Button
                type={"submit"}
                text={"Submit"}
                color={dayTheme ? "blue" : "red"}
                // disabled={disableButton}
              />
            </form>
          </AccordionBody>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default PostNewTransaction;
