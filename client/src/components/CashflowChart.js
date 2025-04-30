import React, { useEffect, useState, useContext } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import { AuthContext } from "./GetMonthlyCashFlows";

Chart.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const CashflowChart = () => {
  const [cashflowData, setCashflowData] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchCashflow = async () => {
      try {
        const res = await axios.get(`/api/cashflow-summary/${currentUser}`);
        setCashflowData(res.data);
      } catch (err) {
        console.error("Failed to fetch cashflow data", err);
      }
    };

    if (currentUser) {
      fetchCashflow();
    }
  }, [currentUser]);

  const chartData = {
    labels: cashflowData.map((item) => item.month),
    datasets: [
      {
        label: "Cashflow ($)",
        data: cashflowData.map((item) => item.cashflow),
        fill: false,
        borderColor: "#36A2EB",
        backgroundColor: "#36A2EB",
        tension: 0.2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
          label: (context) => `$${context.parsed.y.toFixed(2)}`,
        },
      },
    },
    scales: {
      y: {
        title: { display: true, text: "Cashflow ($)" },
        beginAtZero: true,
      },
      x: {
        title: { display: true, text: "Month" },
      },
    },
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Monthly Cashflow</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default CashflowChart;
