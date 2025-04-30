import React, { useState, useEffect, useContext } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { DayTheme } from "../App";

const ProgressBarComponent = ({ whole, part }) => {
  const [percentage, setPercentage] = useState(null);
  const [variant, setVariant] = useState("");
  const [dayTheme, setDayTheme] = useContext(DayTheme);
  const [zero, setZero] = useState(false);

  useEffect(() => {
    setZero(false);
    setPercentage(((part / whole) * 100).toFixed(0));
    console.log("percent: ", percentage);

    if (percentage < 25) {
      setVariant("success");
    } else if (percentage < 50) {
      setVariant("info");
    } else if (percentage < 75) {
      setVariant("warning");
    } else {
      setVariant("danger");
    }

    if (part === 0) {
      setPercentage(0);
      setZero(true);
    }
  }, [whole, part, percentage]);

  return (
    <div className="relative text-center flex justify-center items-center">
      <ProgressBar
        className={`my-2 w-100 my-animation ${
          dayTheme ? "day-progress" : "night-progress"
        }`}
        now={percentage}
        label={`${percentage}% of budget spent`}
        variant={variant}
      />
      {zero ? (
        <span className={`zero-percent my-animation absolute day-text`}>
          0% Spent of budget spent
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProgressBarComponent;
