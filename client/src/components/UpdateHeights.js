import { useEffect } from "react";

const UpdateHeights = ({ navbarRef, footerRef, setContentHeight }) => {
  useEffect(() => {
    const updateHeights = () => {
      const navHeight = navbarRef.current?.offsetHeight || 0;
      const footerHeight = footerRef.current?.offsetHeight || 0;
      const newHeight = `calc(100vh - ${navHeight * 2 + footerHeight}px)`;
      setContentHeight(newHeight);
    };

    updateHeights();

    window.addEventListener("resize", updateHeights);
    return () => window.removeEventListener("resize", updateHeights);
  }, [navbarRef, footerRef, setContentHeight]);

  return null;
};

export default UpdateHeights;
