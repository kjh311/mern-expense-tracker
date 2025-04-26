import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);

const SubCategoryBarChart = ({ data, category }) => {
  const chartData = {
    labels: data.map((d) => d.name),
    datasets: [
      {
        label: "Total Spent",
        data: data.map((d) => d.spent),
        backgroundColor: "rgba(75, 192, 192, 0.6)", // teal
      },
      {
        label: "Budget",
        data: data.map((d) => d.budget),
        backgroundColor: "rgba(153, 102, 255, 0.6)", // purple
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `$${context.parsed.y.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="my-8">
      <h3 className="text-center text-2xl font-bold mb-4">
        {category.charAt(0).toUpperCase() + category.slice(1)} Overview 📊
      </h3>
      <Bar
        className="subcategory-bar-chart"
        data={chartData}
        options={options}
      />
    </div>
  );
};

export default SubCategoryBarChart;
