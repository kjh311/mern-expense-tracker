import React, { useContext, useState, useEffect } from "react";
import { FadeContext } from "./FadeContext";
import { useNavigate } from "react-router-dom";

const FadeWrapper = ({ children }) => {
  const { triggerFadeOut, setTriggerFadeOut, pendingPath, setPendingPath } =
    useContext(FadeContext);
  const [fadeClass, setFadeClass] = useState("fade-in");
  const navigate = useNavigate();

  useEffect(() => {
    if (triggerFadeOut) {
      setFadeClass("fade-out");
    }
  }, [triggerFadeOut]);

  const handleAnimationEnd = () => {
    if (fadeClass === "fade-out") {
      setFadeClass("fade-in");
      setTriggerFadeOut(false);

      if (pendingPath) {
        navigate(pendingPath);
        setPendingPath(null);
      }
    }
  };

  return (
    <span className={fadeClass} onAnimationEnd={handleAnimationEnd}>
      {children}
    </span>
  );
};

export default FadeWrapper;
