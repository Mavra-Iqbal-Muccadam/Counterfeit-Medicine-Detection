import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import { supabase } from "../../../lib/supabaseClient";

// Register necessary Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

const LineChart = () => {
  const [acceptedData, setAcceptedData] = useState([]);
  const [rejectedData, setRejectedData] = useState([]);
  const [pendingData, setPendingData] = useState([]);
  const [labels, setLabels] = useState([]);

  // Fetch data from Supabase and process it
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all manufacturers
        const { data: manufacturers } = await supabase
          .from("manufacturers")
          .select("date_of_issue, status");

        // Process the data
        const monthlyCounts = processManufacturersData(manufacturers);

        // Set labels and data
        const months = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        setLabels(months);
        setAcceptedData(months.map((month) => monthlyCounts[month].accepted));
        setRejectedData(months.map((month) => monthlyCounts[month].rejected));
        setPendingData(months.map((month) => monthlyCounts[month].pending));
      } catch (error) {
        console.error("Error fetching data from Supabase:", error);
      }
    };

    fetchData();
  }, []);

  // Function to process manufacturers data
  const processManufacturersData = (manufacturers) => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    // Initialize an object to store counts for each month
    const monthlyCounts = months.reduce((acc, month) => {
      acc[month] = { pending: 0, accepted: 0, rejected: 0 };
      return acc;
    }, {});

    // Iterate through manufacturers and update counts
    manufacturers.forEach((manufacturer) => {
      const issueDate = new Date(manufacturer.date_of_issue); // Assuming issue_date is a valid date string
      const month = months[issueDate.getMonth()]; // Get the month name (e.g., "Jan", "Feb")

      if (manufacturer.status === "pending") {
        monthlyCounts[month].pending += 1;
      } else if (manufacturer.status === "accepted") {
        monthlyCounts[month].accepted += 1;
      } else if (manufacturer.status === "rejected") {
        monthlyCounts[month].rejected += 1;
      }
    });

    return monthlyCounts;
  };

  // Chart data
  const chartData = {
    labels,
    datasets: [
      {
        label: "Accepted",
        data: acceptedData,
        borderColor: "#FFA726", // Orange
        backgroundColor: "rgb(11, 226, 215)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#FFA726",
      },
      {
        label: "Rejected",
        data: rejectedData,
        borderColor: "#E53935", // Red
        backgroundColor: "rgb(229, 56, 53)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#E53935",
      },
      {
        label: "Pending",
        data: pendingData,
        borderColor: "#3F51B5", // Blue
        backgroundColor: "rgb(63, 81, 181)",
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#3F51B5",
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "black",
          usePointStyle: true,
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: { color: "black" },
        grid: { display: false },
      },
      y: {
        ticks: { color: "black" },
        grid: { color: "rgba(255, 255, 255, 0.2)" },
      },
    },
  };

  return (
    <div style={{ background: "white", color: "black", padding: "20px", borderRadius: "10px", width: "100%", height: "220px" }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;