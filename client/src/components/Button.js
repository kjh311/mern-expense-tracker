import React from "react";

const Button = ({ type, text }) => {
  return (
    <button
      type={type}
      className="animate-button bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md transition duration-200"
    >
      {text}
    </button>
  );
};

export default Button;
