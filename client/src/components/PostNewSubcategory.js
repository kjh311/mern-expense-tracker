import React, { useState, useContext } from "react";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import axios from "axios";
import Input from "./Input";
import Button from "./Button";
import { DayTheme } from "../App";
import {
  PostNewTransactionHeaderColors,
  PostNewTransactionHighestBodyColors,
  PostNewTransactionHighestHeaderColors,
} from "./ActionWords";

const PostNewSubcategory = ({
  fetchExpenses,
  category,
  activeKey,
  setActiveKey,
}) => {
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [dayTheme, setDayTheme] = useContext(DayTheme);

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
        await fetchExpenses();
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
    <AccordionItem eventKey="new" className={`my-animation `}>
      <AccordionHeader
        className={`${
          dayTheme ? "accordion-header-day" : "accordion-header-night"
        } my-animation w-full flex justify-center items-center
          ${PostNewTransactionHighestHeaderColors(category, dayTheme)}
           `}
      >
        <h2
          className={`text-2xl text-shadow font-semibold  text-center w-full my-animation ${
            dayTheme ? "day-text" : "text-white"
          }`}
        >
          Add New Category <span className="text-3xl text-red-500">+</span>
        </h2>
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
            placeholder={"Enter Name of Category"}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            type={"number"}
            value={budget}
            placeholder={"Enter Monthly Budget"}
            required
            onChange={(e) => setBudget(parseFloat(e.target.value) || 0)}
          />
          <Button
            type={"submit"}
            color={dayTheme ? "white" : "purple"}
            text={"Submit"}
          />
        </form>
      </AccordionBody>
    </AccordionItem>
  );
};

export default PostNewSubcategory;
