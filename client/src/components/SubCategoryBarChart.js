import React, { useContext } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; // <-- import datalabels
import { DayTheme } from "../App";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  ChartDataLabels
);

const SubCategoryBarChart = ({ data, category }) => {
  const [dayTheme] = useContext(DayTheme);

  const textColor = dayTheme ? "black" : "white"; // for labels and numbers

  const chartData = {
    labels: data.map((d) => d.name),
    datasets: [
      {
        label: "Total Spent",
        data: data.map((d) => d.spent),
        backgroundColor: "rgba(75, 192, 192, 1)", // full teal
      },
      {
        label: "Budget",
        data: data.map((d) => d.budget),
        backgroundColor: "rgba(153, 102, 255, 1)", // full purple
      },
    ],
  };

  const options = {
    responsive: true,
    animation: {
      duration: 300,
      easing: "easeInOutQuad",
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: textColor,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `$${context.parsed.y.toFixed(2)}`;
          },
        },
        backgroundColor: dayTheme ? "white" : "black",
        titleColor: dayTheme ? "black" : "white",
        bodyColor: dayTheme ? "black" : "white",
      },
      datalabels: {
        color: "white",
        anchor: "end",
        align: "end",
        backgroundColor: `${dayTheme ? "rgb(0,129,168,1)" : "rgba(0,0,0,0.8)"}`,
        borderColor: dayTheme ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.6)",
        borderWidth: 1, // thickness of the border
        borderRadius: 4,
        formatter: function (value) {
          return `$${value.toFixed(2)}`;
        },
        font: {
          weight: "bold",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: textColor,
        },
        grid: {
          color: dayTheme ? "#555" : "#ddd",
        },
      },
      x: {
        ticks: {
          color: textColor,
        },
        grid: {
          color: dayTheme ? "#555" : "#ddd",
        },
      },
    },
  };

  return (
    <div className="my-8 my-animation hidden sm:block">
      <h3
        className="text-center text-2xl font-bold mb-4"
        style={{ color: textColor, transition: "color 0.3s ease" }}
      >
        {category.charAt(0).toUpperCase() + category.slice(1)} Overview 📊
      </h3>
      <Bar
        className="subcategory-bar-chart"
        data={chartData}
        options={options}
        plugins={[ChartDataLabels]} // <-- attach the datalabels plugin
      />
    </div>
  );
};

export default SubCategoryBarChart;
