import React, { useContext } from "react";
import axios from "axios";
import { DayTheme, DateContext } from "../App";
import Button from "./Button";

const ExportCSV = () => {
  const [dateState, setDateState] = useContext(DateContext);
  const { month: currentMonthIndex, year: currentYear } = dateState;
  const [dayTheme] = useContext(DayTheme);

  const urlExport =
    process.env.NODE_ENV === "development"
      ? `http://localhost:8080/api/export/monthly-data?month=${currentMonthIndex}&year=${currentYear}`
      : `https://mern-expense-tracker-v5y1.onrender.com/api/export/monthly-data?month=${currentMonthIndex}&year=${currentYear}`;
  //: `https://mern-expense-tracker-production-b291.up.railway.app/api/auth/login`;
  // : `https://mern-expense-tracker.fly.dev/api/auth/login`;

  const handleExportCSV = async () => {
    try {
      // 1. Get the authentication token from localStorage
      //    (Adjust 'token' if you store it under a different key)
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You are not logged in. Please log in to export data.");
        // Optionally redirect to login page
        // navigate('/login');
        return;
      }

      // Make an API call to your backend export endpoint
      const response = await axios.get(urlExport, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`, // <--- ADD THIS LINE
        },
      });

      // Create a Blob from the response data
      const blob = new Blob([response.data], { type: "text/csv" });

      // Create a link element
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `monthly_financial_summary_${currentYear}-${
        currentMonthIndex + 1
      }.csv`; // Dynamic filename
      document.body.appendChild(a);
      a.click(); // Programmatically click the link to trigger download
      document.body.removeChild(a); // Clean up
      window.URL.revokeObjectURL(url); // Release the object URL

      console.log("CSV exported successfully!");
    } catch (error) {
      console.error("Error exporting CSV:", error);
      // Handle error, e.g., display a toast notification to the user
      // Check for 401 specifically
      if (error.response && error.response.status === 401) {
        alert("Unauthorized: Please log in again.");
        // Optionally clear token and redirect to login
        // localStorage.removeItem('token');
        // navigate('/login');
      } else {
        alert("Failed to export CSV. Please try again.");
      }
    }
  };

  return (
    <div>
      <Button
        onClick={handleExportCSV}
        text={"Export to CSV"}
        color={dayTheme ? "white" : "purple"}
      ></Button>
    </div>
  );
};

export default ExportCSV;
