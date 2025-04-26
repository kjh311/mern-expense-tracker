import React from "react";

const Input = ({
  placeholder,
  onChange,
  value,
  maxLength,
  minLength,
  name,
  type,
}) => {
  return (
    <input
      className="text-black text-center placeholder-gray-400 w-full max-w-md border  p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      maxLength={maxLength}
      minLength={minLength}
      name={name}
    />
  );
};

export default Input;
