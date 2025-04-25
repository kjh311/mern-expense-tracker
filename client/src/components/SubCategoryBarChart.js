import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const SubcategoryBarChart = ({ transactions, selectedCategory }) => {
  // Group by subcategory and sum amounts
  const subcategoryTotals = transactions
    .filter((tx) => tx.category === selectedCategory)
    .reduce((acc, tx) => {
      acc[tx.subcategory] = (acc[tx.subcategory] || 0) + Number(tx.amount);
      return acc;
    }, {});

  const labels = Object.keys(subcategoryTotals);
  const dataValues = Object.values(subcategoryTotals);

  const data = {
    labels,
    datasets: [
      {
        label: `Total by Subcategory (${selectedCategory})`,
        data: dataValues,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `$${Number(context.raw).toFixed(2)} - ${context.label}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Subcategory",
          font: {
            size: 16,
          },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Total Amount ($)",
          font: {
            size: 16,
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default SubcategoryBarChart;
