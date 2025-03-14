// components/BarChart.js
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ pending, accepted, rejected }) => {
  const chartData = {
    labels: ["Pending", "Accepted", "Rejected"],
    datasets: [
      {
        label: "Manufacturers",
        data: [pending, accepted, rejected],
        backgroundColor: ["#FFA726", "#66BB6A", "#EF5350"], // Colors for each category
        borderColor: ["#EF6C00", "#2E7D32", "#D32F2F"], // Border colors
        borderWidth: 1,
        barThickness: 70, // Make bars slim
        categoryPercentage: 0.3, // Increase this to make bars closer within a category
        barPercentage: 1, // Increase this to make bars wider relative to the available space
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      
    },
    scales: {
      x: {
        grid: {
          display: false, // Remove grid lines for X-axis
        },
      },
      y: {
        beginAtZero: true, // Start Y-axis from 0
        grid: {
          display: false, // Remove grid lines for Y-axis
        },
        ticks: {
          stepSize: 1, // Ensure whole numbers on Y-axis
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;