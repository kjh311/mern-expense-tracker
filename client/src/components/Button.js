import React, { useContext } from "react";
import { DayTheme } from "../App";

const Button = ({ type, text, onClick, color, disabled }) => {
  const [dayTheme, setDayTheme] = useContext(DayTheme);

  return (
    <>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`
          ${
            dayTheme
              ? !disabled
                ? "button-shadow"
                : "text-white"
              : "button-glow text-white"
          }
          
          ${
            disabled
              ? "bg-gray-500"
              : color
              ? `bg-${color}-200 hover:bg-${color}-700 animate-button-${color}`
              : "animate-button"
          }
          

          font-semibold py-1 px-3 lg:py-2 lg:px-6 rounded-md my-animation `}
      >
        {text}
      </button>
    </>
  );
};

export default React.memo(Button);
