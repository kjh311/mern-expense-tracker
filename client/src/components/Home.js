import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { DayTheme, LoggedInContext } from "../App";

const Home = ({ contentHeight }) => {
  const [dayTheme, setDayTheme] = useContext(DayTheme);
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);

  return (
    <div
      className="home-container text-center flex flex-column justify-center align-center"
      style={{ minHeight: contentHeight }}
    >
      <h1 style={styles.heading}>Welcome to Budget Tracker!</h1>
      <p className="text-center" style={styles.subheading}>
        Stay on top of your expenses, savings, and goals all in one place.
      </p>
      <Link to={`${loggedIn ? "./dashboard" : "/login"}`}>
        {/* Get Started */}
        <Button
          text={"Get Started"}
          color={`${dayTheme ? "blue" : "purple"}`}
        />
      </Link>
    </div>
  );
};

const styles = {
  container: {},
  heading: {
    fontSize: "3rem",
    marginBottom: "1rem",
    color: "#333",
  },
  subheading: {
    fontSize: "1.5rem",
    marginBottom: "2rem",
    color: "#666",
    // textAlign: "center",
    // maxWidth: "600px",
  },
  // button: {
  //   // backgroundColor: "#007bff",
  //   color: "#fff",
  //   padding: "12px 24px",
  //   borderRadius: "8px",
  //   textDecoration: "none",
  //   fontSize: "1.2rem",
  // },
};

export default Home;
