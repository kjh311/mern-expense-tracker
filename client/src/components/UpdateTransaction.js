import React from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";

const handleEdit = () => {
  alert("update this transaction?");
};

const UpdateTransaction = ({ id, fetchExpenses }) => {
  return (
    <button onClick={handleEdit}>
      <FaEdit className="text-blue-500 hover:text-blue-700" />
    </button>
  );
};

export default UpdateTransaction;
