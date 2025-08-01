import React from "react";
import axios from "axios";
import Button from "./Button";

const DeleteSubcategory = ({ id, fetchExpenses, setRefreshFlag }) => {
  const url =
    process.env.NODE_ENV === "development"
      ? ` http://localhost:8080/api/subcategories/${id}`
      : `https://mern-expense-tracker-v5y1.onrender.com/api/subcategories/${id}`;
  // : `https://mern-expense-tracker-production-b291.up.railway.app/api/subcategories/${id}`;
  //  : `https://https://mern-expense-tracker.fly.dev/api/subcategories/${id}`;

  const handleDeleteSubcategory = async () => {
    if (window.confirm("Delete this Category?")) {
      try {
        const res = await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        console.log("Deleted:", res.data);
        await fetchExpenses();
        setRefreshFlag((prev) => !prev);
      } catch (err) {
        console.error("Failed to delete transaction:", err.message);
      }
    }
  };

  return (
    <Button
      type={"submit"}
      text={"Delete Category"}
      onClick={handleDeleteSubcategory}
      color={"red"}
    ></Button>
  );
};

export default DeleteSubcategory;
