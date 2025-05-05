import React, { useState, useEffect } from "react";

export const FadeContext = React.createContext();

export const FadeProvider = ({ children }) => {
  const [triggerFadeOut, setTriggerFadeOut] = useState(false);
  const [pendingPath, setPendingPath] = useState(null);

  useEffect(() => {}, [triggerFadeOut]);

  return (
    <FadeContext.Provider
      value={{ triggerFadeOut, setTriggerFadeOut, pendingPath, setPendingPath }}
    >
      {children}
    </FadeContext.Provider>
  );
};
