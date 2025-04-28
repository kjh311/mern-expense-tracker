import React, { useState, useEffect } from "react";

const FadeWrapper = ({ children, triggerFadeOut, onFadeOutComplete }) => {
  const [fadeClass, setFadeClass] = useState("fade-in");

  useEffect(() => {
    if (triggerFadeOut) {
      setFadeClass("fade-out");
    }
  }, [triggerFadeOut]);

  const handleAnimationEnd = () => {
    if (fadeClass === "fade-out" && onFadeOutComplete) {
      onFadeOutComplete();
    }
  };

  return (
    <div className={fadeClass} onAnimationEnd={handleAnimationEnd}>
      {children}
    </div>
  );
};

export default FadeWrapper;
