import React from "react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";

const DeleteTransaction = ({
  id,
  fetchExpenses,
  deletingId,
  setDeletingId,
  txId,
  setAnimatingId,
  animatingId,
}) => {
  const handleDeleteTransaction = async () => {
    if (window.confirm("Delete this transaction?")) {
      // Set the transaction to animating state
      setAnimatingId(txId);

      setTimeout(async () => {
        try {
          // Perform the delete operation
          const res = await axios.delete(
            `http://localhost:5000/api/transactions/${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            }
          );
          console.log("Deleted:", res.data);
          fetchExpenses();

          // After delete, reset the animatingId to stop animation
          setAnimatingId(null);
        } catch (err) {
          console.error("Failed to delete transaction:", err.message);
          setAnimatingId(null); // Reset animating state in case of error
        }
      }, 500); // Ensure the animation lasts long enough before deletion
    }
  };

  return (
    <button
      onClick={handleDeleteTransaction}
      className={`transition-all duration-500 ${
        animatingId === txId ? "opacity-0 translate-y-[-10px]" : ""
      }`}
    >
      <FaTrash className="text-red-500 hover:text-red-700" />
    </button>
  );
};

export default DeleteTransaction;
