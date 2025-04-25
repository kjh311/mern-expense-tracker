import React from "react";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  TimeScale,
  ChartDataLabels
);

const ExpenseLineChart = ({ transactions, subcategoryName }) => {
  const sorted = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const data = {
    labels: sorted.map((tx) => new Date(tx.date).toLocaleDateString()),
    datasets: [
      {
        label: "Expense Amount",
        data: sorted.map((tx) => tx.amount.toFixed(2)),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.3,
        pointRadius: 20,
        pointHoverRadius: 20,
        pointStyle: "rectRounded",
      },
    ],
  };

  const options = {
    animation: {
      duration: 1500,
      easing: "easeOutQuart", // smooth and polished
    },
    elements: {
      point: {
        radius: 5,
        backgroundColor: "rgb(75, 192, 192)",
      },
      line: {
        tension: 0.3,
      },
    },
    responsive: true,
    plugins: {
      datalabels: {
        display: true,
        align: "top",
        anchor: "end",
        formatter: function (value, context) {
          const tx = sorted[context.dataIndex];
          return `$${Number(tx.amount).toFixed(2)}\n${subcategoryName}`;
        },
        font: {
          size: 12,
          weight: "bold",
        },
        color: "#444",
      },
      legend: {
        labels: {
          font: {
            size: 16, // Legend font size
          },
        },
      },
      tooltip: {
        bodyFont: {
          size: 14, // Tooltip text size
        },
        titleFont: {
          size: 16, // Tooltip title font size
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 14, // X-axis labels
          },
        },
        title: {
          display: true,
          text: "Date",
          font: {
            size: 16,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 14, // Y-axis labels
          },
        },
        title: {
          display: true,
          text: "Amount ($)",
          font: {
            size: 16,
          },
        },
      },
    },
  };

  return <Line className="line-chart" data={data} options={options} />;
};

export default ExpenseLineChart;
