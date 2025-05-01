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
  required,
}) => {
  const [dayTheme, setDayTheme] = useContext(DayTheme);

  return (
    <input
      className={`input-${
        dayTheme ? "day" : "night"
      } my-animation  text-center  w-full max-w-md  my-2  sm:p-3 p-1 sm:text-lg text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400`}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      maxLength={maxLength}
      minLength={minLength}
      required={required}
      name={name}
      autoComplete="on"
    />
  );
};

export default Input;
