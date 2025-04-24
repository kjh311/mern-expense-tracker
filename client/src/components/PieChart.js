import { useContext } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { TransactionsTotal } from "../App";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ totals }) => {
  const [total, setTotal] = useContext(TransactionsTotal);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      datalabels: {
        color: "#fff",
        font: {
          weight: "bold",
          size: 14,
        },
        formatter: (value, context) => {
          const label = context.chart.data.labels[context.dataIndex];
          return `${label}\n$${value}`;
        },
      },
    },
  };

  const data = {
    labels: ["Expenses", "Savings", "Bills"],

    datasets: [
      {
        label: "Spent",
        data: [totals.expenseSpent, totals.savingsSpent, totals.billsSpent],
        backgroundColor: ["#c1121f", "#ffb703", "#fb8500"],

        borderWidth: 1,
      },
    ],
  };

  return <Pie className="pie-chart" data={data} options={options} />;
};

export default PieChart;
