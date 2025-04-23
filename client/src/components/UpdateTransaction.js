import React from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";

const handleEdit = () => {
  alert("update this transaction?");
};

const UpdateTransaction = ({ id, fetchExpenses }) => {
  return (
    <button onClick={handleEdit}>
      <FaEdit
        className="react-icon text-blue-500 hover:text-blue-700 transition-all duration-200 absolute bottom-4 right-2 "
        size={25}
      />
    </button>
  );
};

export default UpdateTransaction;
