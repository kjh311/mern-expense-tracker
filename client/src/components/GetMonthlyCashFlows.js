import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import CashflowChart from "./CashflowChart";

export const AuthContext = React.createContext();

const GetMonthlyCashFlows = () => {
  const [setData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = jwtDecode(token);
    const userId = decoded.userId;
    setCurrentUser(userId);

    const fetchCashFlow = async () => {
      try {
        const res = await axios.get(`/api/cashflow-summary/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Cashflows: ", res.data);
        setData(res.data);
      } catch (err) {
        console.error("Error fetching CashFlows", err);
      }
    };

    fetchCashFlow();
  }, []);

  if (!currentUser) return null;

  return (
    <AuthContext.Provider value={{ currentUser }}>
      <CashflowChart />
    </AuthContext.Provider>
  );
};

export default GetMonthlyCashFlows;
