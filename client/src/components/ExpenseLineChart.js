import React, { useContext } from "react";

import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { DayTheme } from "../App";

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
  const [dayTheme, setDayTheme] = useContext(DayTheme);

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

  const fontColor = dayTheme ? "#333" : "#fff";

  const options = {
    layout: {
      padding: {
        top: 30,
      },
    },
    animation: {
      duration: 300,
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
        labels: {
          color: fontColor,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      datalabels: {
        display: true,
        align: "middle",
        borderColor: dayTheme ? "#333" : "#fff",
        borderWidth: 1,
        borderRadius: 4,
        anchor: "middle",
        backgroundColor: dayTheme ? "rgba(0,129,168,1)" : "rgba(0, 0, 0, 0.7)",
        padding: {
          top: 2,
          bottom: 2,
          left: 4,
          right: 4,
        },
        formatter: function (value, context) {
          const tx = sorted[context.dataIndex];
          const wrapAt = 20;
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
          lines.push(`$${Number(tx.amount).toFixed(2)}`);
          return lines;
        },
        font: {
          size: 14,
          weight: "bold",
        },
        color: "white",
      },

      tooltip: {
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            const tx = sorted[index];
            return `${tx.description}: $${Number(tx.amount).toLocaleString(
              undefined,
              {
                minimumFractionDigits: 2,
              }
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
          color: fontColor,
          font: {
            size: 14,
          },
        },
        title: {
          display: true,
          text: "Date",
          color: fontColor,
          font: {
            size: 16,
          },
        },
        grid: {
          color: dayTheme ? "#ddd" : "#444",
        },
      },
      y: {
        ticks: {
          color: fontColor,
          font: {
            size: 14,
          },
        },
        title: {
          display: true,
          text: "Amount ($)",
          color: fontColor,
          font: {
            size: 16,
          },
        },
        grid: {
          color: dayTheme ? "#ddd" : "#444",
        },
      },
    },
  };

  return <Line className="line-chart" data={data} options={options} />;
};

export default ExpenseLineChart;
