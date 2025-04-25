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

const ExpenseLineChart = ({ transactions }) => {
  const sorted = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const data = {
    labels: sorted.map((tx) => new Date(tx.date).toLocaleDateString()),
    datasets: [
      {
        label: "Expense Amount",
        data: sorted.map((tx) =>
          tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })
        ),
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
    layout: {
      padding: {
        top: 30,
      },
    },
    animation: {
      duration: 1500,
      easing: "easeOutQuart",
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
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
      datalabels: {
        display: true,
        align: "top",
        anchor: "end",
        formatter: function (value, context) {
          const tx = sorted[context.dataIndex];
          const wrapAt = 20; // characters per line
          const words = tx.description.split(" ");
          const lines = [];
          let line = "";

          for (const word of words) {
            if ((line + word).length <= wrapAt) {
              line += word + " ";
            } else {
              lines.push(line.trim());
              line = word + " ";
            }
          }
          if (line) lines.push(line.trim());

          lines.push(
            `$${Number(tx.amount).toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}`
          );
          return lines;
        },
        font: {
          size: 14,
          weight: "bold",
        },
        color: "#444",
      },

      tooltip: {
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            const tx = sorted[index];
            return `${tx.description}: $${Number(tx.amount).toLocaleString(
              undefined,
              { minimumFractionDigits: 2 }
            )}`;
          },
        },
        bodyFont: {
          size: 14,
        },
        titleFont: {
          size: 16,
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
