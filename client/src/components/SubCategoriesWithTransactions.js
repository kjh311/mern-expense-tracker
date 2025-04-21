import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";

const ExpenseList = ({ name, category }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/subcategories/${category}-with-transactions`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setData(res.data);
    };

    fetchExpenses();
  }, []);

  return (
    <div className="border m-2 p-2 z-0">
      <h2>{name}</h2>
      <Accordion>
        {data.map((sub, idx) => (
          <Accordion.Item eventKey={idx.toString()} key={sub._id}>
            <Accordion.Header>
              <h2 className="">
                <span>{sub.name}</span>
                <span>
                  <p>
                    Total: $
                    {sub.transactions
                      .reduce((sum, tx) => sum + tx.amount, 0)
                      .toFixed(2)}
                  </p>
                </span>
              </h2>
            </Accordion.Header>
            <Accordion.Body>
              {sub.transactions.length === 0 ? (
                <p>No transactions</p>
              ) : (
                <ul>
                  {sub.transactions.map((tx) => (
                    <li key={tx._id}>
                      <strong>${tx.amount.toFixed(2)}</strong> -{" "}
                      {tx.description} on{" "}
                      {new Date(tx.date).toLocaleDateString()}
                    </li>
                  ))}
                </ul>
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default ExpenseList;
