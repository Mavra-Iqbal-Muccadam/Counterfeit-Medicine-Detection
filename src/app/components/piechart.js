import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ pending, accepted, rejected }) => {
  const total = pending + accepted + rejected;

  // Define ring properties
  const outerRadius = 90; // Outer edge of the first ring
  const thickness = 40; // Fixed thickness for each ring

  const datasets = [
    {
      label: "Pending",
      data: [pending, total - pending],
      backgroundColor: ["#059212", "#ededed"], // Pastel Blue + Grey
      borderWidth: 3,
      borderRadius: 10,
      borderAlign: "inner",
      circumference: 360, // Full circle
      cutout: `${outerRadius - 1 * thickness}%`, // Outer ring
      hoverBackgroundColor: ["#A3C4F3", "#ededed"], // Disable hover color change
      hoverBorderWidth: 0, // Disable hover border
    },
    {
      label: "Accepted",
      data: [accepted, total - accepted],
      backgroundColor: ["#982176", "#ededed"], // Pastel Orange + Grey
      borderWidth: 3,
      borderRadius: 10,
      borderAlign: "inner",
      circumference: 360, // Full circle
      cutout: `${outerRadius - 1 * thickness}%`, // Middle ring
      hoverBackgroundColor: ["#FFD699", "#ededed"], // Disable hover color change
      hoverBorderWidth: 0, // Disable hover border
    },
    {
      label: "Rejected",
      data: [rejected, total - rejected],
      backgroundColor: ["#F5004F", "#ededed"], // Pastel Red + Grey
      borderWidth: 3,
      borderRadius: 10,
      borderAlign: "inner",
      circumference: 360, // Full circle
      cutout: `${outerRadius - 1 * thickness}%`, // Inner ring
      hoverBackgroundColor: ["#FFA8A8", "#ededed"], // Disable hover color change
      hoverBorderWidth: 0, // Disable hover border
    },
  ];

  const chartData = {
    labels: ["Pending", "Accepted", "Rejected"],
    datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to stretch
    rotation: 0, // Align rings properly
    circumference: 360, // Ensures full rings
    plugins: {
      legend: { display: false }, // Hide default legend
      tooltip: {
        enabled: false, // Disable tooltips on hover
      },
    },
    // Disable hover effects globally
    hover: {
      mode: null, // Disable hover mode
    },
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Pie data={chartData} options={options} />
      {/* Center text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "18px", fontWeight: "bold", color: "#555" }}>Total</p>
        <p style={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}>{total}</p>
      </div>
    </div>
  );
};

export default PieChart;