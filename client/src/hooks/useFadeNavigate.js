import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FadeContext } from "../components/FadeContext";

export const useFadeNavigate = () => {
  const navigate = useNavigate();
  const { setTriggerFadeOut, setPendingPath } = useContext(FadeContext);

  const fadeNavigate = (path) => {
    setPendingPath(path);
    setTriggerFadeOut(true);
  };

  return fadeNavigate;
};
