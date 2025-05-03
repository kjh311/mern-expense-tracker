import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FadeContext } from "../components/FadeContext";

export const useFadeNavigate = () => {
  const navigate = useNavigate();
  const { triggerFadeOut, setTriggerFadeOut } = useContext(FadeContext);

  const fadeNavigate = (path) => {
    setTriggerFadeOut(true);
    // console.log("TriggerFadeOut: ", triggerFadeOut);

    // Wait for fade animation to finish before navigating
    setTimeout(() => {
      navigate(path);
      setTriggerFadeOut(false);
      // console.log("TriggerFadeOut setTimeout: ", triggerFadeOut);
    }, 300);
  };

  return fadeNavigate;
};
