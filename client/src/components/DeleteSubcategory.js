import React from "react";
import axios from "axios";
import Button from "./Button";

const DeleteSubcategory = ({ id, fetchExpenses, setRefreshFlag }) => {
  const url =
    process.env.NODE_ENV === "development"
      ? ` http://${process.env.REACT_APP_API_URL}/api/subcategories/${id}`
      : `https://mern-expense-tracker-t3dj.onrender.com/api/subcategories/${id}`;

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
