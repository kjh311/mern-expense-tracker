// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const GetBudget = ({ category }) => {
//   const [budgets, setBudgets] = useState([]);

//   useEffect(() => {
//     const getBudget = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/budget", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//             "Content-Type": "application/json",
//           },
//         });
//         setBudgets(res.data);

//         console.log("Fetched Budgets:", res.data);
//       } catch (err) {
//         console.error("Failed to fetch budgets", err);
//       }
//     };

//     getBudget();
//   }, []);

//   return (
//     <>
//       {budgets.length > 0 ? (
//         budgets
//           .filter((budget) => !category || budget.category === category)
//           .map((budget) => (
//             <h2
//               className="text-2xl font-bold text-indigo-600 m-4"
//               key={budget._id}
//             >
//               <p>Budget: ${budget.amount}</p>
//             </h2>
//           ))
//       ) : (
//         <p>No budgets found.</p>
//       )}
//     </>
//   );
// };

// export default GetBudget;
