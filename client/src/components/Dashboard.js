import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login"); // Redirect to login if no token
        return;
      }

      try {
        const response = await fetch("api/expenses", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data); // Log the response data here
        if (response.ok) {
          setExpenses(data);
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error("Error fetching expenses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [navigate]);

  return (
    <div className="text-center">
      <h1>Dashboard</h1>
      {loading ? (
        "Fetching Expenses..."
      ) : (
        <div>
          <h2>Your Expenses:</h2>
          <br />
          <ul>
            {expenses.map((expense, id) => {
              return (
                <li key={expense._id}>
                  <p>{expense.description}</p>
                  <p>Amount: {expense.amount}</p>
                  <p>Subcategory: {expense.subcategory}</p>
                  <p>Date: {new Date(expense.date).toLocaleDateString()}</p>
                  <p>User ID: {expense.userId}</p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
