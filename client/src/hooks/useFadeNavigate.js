import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FadeContext } from "../components/FadeContext"; // Adjust path if needed

export const useFadeNavigate = () => {
  const navigate = useNavigate();
  const { setTriggerFadeOut } = useContext(FadeContext);

  const fadeNavigate = (path) => {
    setTriggerFadeOut(true);

    // Wait for fade animation to finish before navigating
    setTimeout(() => {
      navigate(path);
      setTriggerFadeOut(false); // Reset for next time
    }, 300); // <-- Match this to your CSS transition time (e.g., 300ms)
  };

  return fadeNavigate;
};
