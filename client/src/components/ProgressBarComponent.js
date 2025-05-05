import React, { useState, useEffect, useContext } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { DayTheme } from "../App";
import { IoTrendingUp } from "react-icons/io5";

const ProgressBarComponent = ({ whole, part }) => {
  const [percentage, setPercentage] = useState(null);
  const [variant, setVariant] = useState("");
  const [dayTheme] = useContext(DayTheme);
  const [exclamation, setExclamation] = useState("");
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    setExclamation("");
    setPulse(false);
    setPercentage(((part / whole) * 100).toFixed(0));

    if (percentage < 25) {
      setVariant("success");
    } else if (percentage < 50) {
      setVariant("info");
    } else if (percentage < 75) {
      setVariant("warning");
    } else if (percentage < 100) {
      setVariant("danger");
    } else if (percentage >= 100) {
      setVariant("danger");
      setExclamation("!!!");
      setPulse(IoTrendingUp);
    }

    if (part === 0) {
      setPercentage(0);
    }
  }, [whole, part, percentage]);

  return (
    <div className="relative text-center flex justify-center items-center">
      <ProgressBar
        className={`my-2 w-100 my-animation  ${
          dayTheme ? "day-progress" : "night-progress"
        }`}
        now={percentage}
        variant={variant}
        // animated
      />
      <span
        className={`zero-percent my-animation absolute ${pulse && "pulse"} ${
          dayTheme ? "day-text" : "text-white"
        }`}
      >
        {percentage}% of budget{exclamation}
      </span>
    </div>
  );
};

export default ProgressBarComponent;
