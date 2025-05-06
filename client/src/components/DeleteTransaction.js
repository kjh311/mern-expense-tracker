import React, { useContext } from "react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { DayTheme } from "../App";

const DeleteTransaction = ({
  id,
  deletingId,
  setDeletingId,
  txId,
  setAnimatingId,
  animatingId,
  setRefreshFlag,
  fetchExpenses,
}) => {
  const [dayTheme, setDayTheme] = useContext(DayTheme);

  const url =
    process.env.NODE_ENV === "development"
      ? `http://localhost:5000/api/transactions/${id}`
      : // : `https://mern-expense-tracker-t3dj.onrender.com/api/transactions/${id}`;
        `https://mern-expense-tracker-production-b291.up.railway.app/api/transactions/${id}`;

  const handleDeleteTransaction = async () => {
    if (window.confirm("Delete this transaction?")) {
      setAnimatingId(txId);

      setTimeout(async () => {
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

          setAnimatingId(null);
        } catch (err) {
          console.error("Failed to delete transaction:", err.message);
          setAnimatingId(null);
        }
      }, 500);
    }
  };

  return (
    <>
      <button
        onClick={handleDeleteTransaction}
        className={` ${
          animatingId === txId ? "opacity-0 translate-y-[-10px]" : ""
        }`}
      >
        <FaTrash
          className={`react-icon ${
            dayTheme ? "text-red-500" : "text-white"
          } transition-all duration-200 absolute top-4 right-2`}
          size={25}
        />
      </button>
    </>
  );
};

export default DeleteTransaction;
