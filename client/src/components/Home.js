import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { DayTheme } from "../App";

const Home = () => {
  const [dayTheme, setDayTheme] = useContext(DayTheme);

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Budget Tracker!</h1>
      <p style={styles.subheading}>
        Stay on top of your expenses, savings, and goals all in one place.
      </p>
      <Link to="/login">
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
  container: {
    minHeight: "85vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "center",
    // backgroundColor: "#f0f4f8",
    padding: "20px",
  },
  heading: {
    fontSize: "3rem",
    marginBottom: "1rem",
    color: "#333",
  },
  subheading: {
    fontSize: "1.5rem",
    marginBottom: "2rem",
    color: "#666",
    textAlign: "center",
    maxWidth: "600px",
  },
  button: {
    // backgroundColor: "#007bff",
    color: "#fff",
    padding: "12px 24px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "1.2rem",
  },
};

export default Home;
