import React, { useContext } from "react";
import { DayTheme } from "../App";

const Input = ({
  placeholder,
  onChange,
  value,
  maxLength,
  minLength,
  name,
  type,
}) => {
  const [dayTheme, setDayTheme] = useContext(DayTheme);

  return (
    <input
      className={`input-${
        dayTheme ? "day" : "night"
      } my-animation  text-center  w-full max-w-md  my-2  p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400`}
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
