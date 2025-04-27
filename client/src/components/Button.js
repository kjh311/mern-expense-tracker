import React, { useContext } from "react";
import { DayTheme } from "../App";

const Button = ({ type, text, onClick, color }) => {
  const [dayTheme, setDayTheme] = useContext(DayTheme);

  // console.log("Button.js");

  return (
    <>
      <button
        type={type}
        onClick={onClick}
        className={`
          ${dayTheme ? "button-shadow" : "button-glow"}
          ${
            { color }
              ? `bg-${color}-200 hover:bg-${color}-700 animate-button-${color}`
              : ` `
          } font-semibold py-2 px-6 rounded-md transition duration-200 animate-button`}
      >
        {text}
      </button>
    </>
  );
};

export default React.memo(Button);
