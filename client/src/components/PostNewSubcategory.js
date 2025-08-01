import React, { useState, useContext } from "react";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import Accordion from "react-bootstrap/Accordion";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import axios from "axios";
import Input from "./Input";
import Button from "./Button";
import { DayTheme, DateContext } from "../App";
import {
  PostNewTransactionHighestBodyColors,
  PostNewTransactionHighestHeaderColors,
} from "./ActionWords";

const PostNewSubcategory = ({ fetchExpenses, category, setActiveKey }) => {
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [dayTheme] = useContext(DayTheme);
  const [showMessage, setShowMessage] = useState(false);

  const handlePost = (e) => {
    e.preventDefault();

    const postSub = async () => {
      try {
        console.log({
          name,
          categoryType: category,
          budget,
        });

        const url =
          process.env.NODE_ENV === "development"
            ? `http://localhost:8080/api/subcategories`
            : `https://mern-expense-tracker-v5y1.onrender.com/api/subcategories`;
        // : `https://mern-expense-tracker-production-b291.up.railway.app/api/subcategories`;
        // : `https://mern-expense-tracker.fly.dev/api/subcategories`;

        const res = await axios.post(
          url,
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
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 3000);
        await fetchExpenses();

        setActiveKey(null);
      } catch (err) {
        console.error(
          "Failed to post subcategory",
          err.response?.data || err.message
        );
      }
    };

    postSub();
    setName("");
    setBudget("");
  };

  return (
    <Accordion className="mx-2">
      <AccordionItem eventKey="new" className={`my-animation `}>
        <AccordionHeader
          className={`my-animation text-center flex justify-center items-center  ${
            dayTheme ? "accordion-header-day" : "accordion-header-night"
          } my-animation w-full flex justify-center items-center
          ${PostNewTransactionHighestHeaderColors(category, dayTheme)}
           `}
        >
          <span className="flex justify-start  items-center  w-full">
            <h2
              className={`sm:text-2xl text-sm text-shadow font-semibold  w-full my-animation ${
                dayTheme ? "day-text" : "text-white"
              }`}
            >
              Add New Category{" "}
              <span
                className={`my-animation text-3xl ${
                  dayTheme ? "text-red-500" : "text-white"
                }`}
              >
                +
              </span>
            </h2>
          </span>
        </AccordionHeader>
        <AccordionBody
          className={`${
            dayTheme ? "accordion-body-day" : "accordion-body-night"
          } py-6 my-animation  ${PostNewTransactionHighestBodyColors(
            category,
            dayTheme
          )}
           }`}
        >
          <form
            onSubmit={handlePost}
            className="flex flex-col items-center gap-4"
          >
            <Input
              type={"text"}
              placeholder={"Name of Category"}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Input
              type={"number"}
              value={budget}
              placeholder={"Monthly Budget $$"}
              required
              onChange={(e) => setBudget(parseFloat(e.target.value) || 0)}
            />

            <Button
              type={"submit"}
              color={dayTheme ? "white" : "purple"}
              text={"Submit"}
            />

            <div className={`fade-message ${showMessage ? "show" : ""}`}>
              Subcategory Added
            </div>
          </form>
        </AccordionBody>
      </AccordionItem>
    </Accordion>
  );
};

export default PostNewSubcategory;
