import React, { useContext, forwardRef } from "react";
import { DayTheme } from "../App";

const Footer = ({ ref }) => {
  const [dayTheme] = useContext(DayTheme);

  return (
    <footer
      id="footer"
      ref={ref}
      className={`footer ${
        dayTheme ? "day-footer" : "night-footer"
      } py-4 px-2 mt-10 shadow-inner`}
    >
      <div className="max-w-4xl mx-auto text-center text-sm sm:text-base">
        &copy; {new Date().getFullYear()}{" "}
        <a
          className={`link ${
            dayTheme ? "day-footer-link" : "night-footer-link"
          }`}
          href="https://kjh311.github.io/new_portfolio/"
          target="_blank"
          rel="noreferrer"
        >
          Kevin Huelsmann
        </a>
        . All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
