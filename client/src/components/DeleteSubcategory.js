import React from "react";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import Button from "./Button";

const DeleteSubcategory = ({
  id,
  fetchExpenses,
  deletingId,
  setDeletingId,
  setAnimatingId,
  animatingId,
  setRefreshFlag,
}) => {
  const handleDeleteSubcategory = async () => {
    // event.stopPropagation();
    if (window.confirm("Delete this Category?")) {
      //   setAnimatingId(id);

      //   setTimeout(async () => {

      try {
        // Perform the delete operation
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

        // After delete, reset the animatingId to stop animation
        //   setAnimatingId(null);
      } catch (err) {
        console.error("Failed to delete transaction:", err.message);
        //   setAnimatingId(null); // Reset animating state in case of error
      }
      //   }, 500); // Ensure the animation lasts long enough before deletion
    }
  };

  return (
    <Button
      type={"submit"}
      text={"Delete Category"}
      onClick={handleDeleteSubcategory}
      color={"red"}
    >
      {/* <FaTrash
        className="react-icon text-red-500 hover:text-red-700 transition-all duration-200 absolute top-4 left-2"
        size={25}
      /> */}
    </Button>
  );
};

export default DeleteSubcategory;
