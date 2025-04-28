import { createContext, useState } from "react";

export const FadeContext = createContext();

export const FadeProvider = ({ children }) => {
  const [triggerFadeOut, setTriggerFadeOut] = useState(false);
  const [pendingPath, setPendingPath] = useState(null);

  return (
    <FadeContext.Provider
      value={{ triggerFadeOut, setTriggerFadeOut, pendingPath, setPendingPath }}
    >
      {children}
    </FadeContext.Provider>
  );
};
