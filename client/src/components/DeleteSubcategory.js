import React from "react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import Button from "./Button";

const DeleteSubcategory = ({ id, fetchExpenses, setRefreshFlag }) => {
  const handleDeleteSubcategory = async () => {
    if (window.confirm("Delete this Category?")) {
      try {
        const res = await axios.delete(
          `http://localhost:5000/api/subcategories/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
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
