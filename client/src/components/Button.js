import React from "react";

const Button = ({ type, text, onClick, color }) => {
  return (
    <>
      {/* {color} */}
      <button
        type={type}
        onClick={onClick}
        className={`
          ${
            { color }
              ? `bg-${color}-200 hover:bg-${color}-700 animate-button-${color}`
              : `bg-blue-100 hover:bg-blue-700`
          } font-semibold py-2 px-6 rounded-md transition duration-200 animate-button`}
      >
        {text}
      </button>
    </>
  );
};

export default Button;
