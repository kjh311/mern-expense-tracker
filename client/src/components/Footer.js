import React from "react";

const Footer = () => {
  return (
    <footer className="footer bg-blue-600 text-white py-4 px-2 mt-10 shadow-inner">
      <div className="max-w-4xl mx-auto text-center text-sm sm:text-base">
        &copy; {new Date().getFullYear()}{" "}
        <a
          className="link text-white"
          href="https://kjh311.github.io/new_portfolio/"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          Kevin Huelsmann
        </a>
        . All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
