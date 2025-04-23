import React from "react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";

const DeleteTransaction = ({ id, fetchExpenses }) => {
  const handleDeleteTransaction = async () => {
    if (window.confirm("Delete this transaction?")) {
      try {
        const res = await axios.delete(
          `http://localhost:5000/api/transactions/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Deleted:", res.data); // Optional: update your UI here
        fetchExpenses();
      } catch (err) {
        console.error("Failed to delete transaction:", err.message);
      }
    }
  };

  return (
    <button onClick={handleDeleteTransaction}>
      <FaTrash className="text-red-500 hover:text-red-700" />
    </button>
  );
};

export default DeleteTransaction;
