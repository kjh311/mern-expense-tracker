import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FadeContext } from "../components/FadeContext";

export const useFadeNavigate = () => {
  const navigate = useNavigate();
  const { setTriggerFadeOut } = useContext(FadeContext);

  const fadeNavigate = (path) => {
    setTriggerFadeOut(true);

    // Wait for fade animation to finish before navigating
    setTimeout(() => {
      navigate(path);
      setTriggerFadeOut(false);
    }, 300);
  };

  return fadeNavigate;
};
