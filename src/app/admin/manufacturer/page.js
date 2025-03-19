"use client";
import React, { useState, useEffect } from "react";
import {
  fetchManufacturers,
  fetchManufacturerDetails,
  acceptManufacturer,
  getAdminDetails,
  rejectManufacturer,
} from "../../../../lib/adminmanufacturerfetch";
import Sidebar from "../sidebar";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Image from "next/image";
import axios from "axios";
import ManufacturerSlideshow from "../manufacturer/manufacturertableslideshow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import handleAccept from "../../blockchain/handleaccept";
import BarChart from "../../components/barchart"; // Adjust the import path as needed
import PieChart from "../../components/piechart"; // Adjust the import path as needed
import LineChart from "../../components/linechart"; // Import the LineChart component
import "../admin.css";
const ManufacturerPage = ({ activeSection, handleSectionChange }) => {
  const [selectedManufacturer, setSelectedManufacturer] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [pendingManufacturers, setPendingManufacturers] = useState([]);
  const [acceptedManufacturers, setAcceptedManufacturers] = useState([]);
  const [rejectedManufacturers, setRejectedManufacturers] = useState([]);
  const [showWalletAddress, setShowWalletAddress] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectComment, setRejectComment] = useState("");
  const [authenticityScore, setAuthenticityScore] = useState(null);
  const totalManufacturers =
    pendingManufacturers.length +
    acceptedManufacturers.length +
    rejectedManufacturers.length;

  

  const manufacturers =
    activeSection === "acceptedManufacturers"
      ? acceptedManufacturers
      : activeSection === "rejectedManufacturers"
      ? rejectedManufacturers
      : pendingManufacturers;

  const [adminDetails, setAdminDetails] = useState({
    name: "",
    email: "", // Add email here
    role: "",
  });

  useEffect(() => {
    const fetchAdminData = async () => {
      const adminEmail = localStorage.getItem("adminEmail"); // Get the logged-in admin's email
      if (adminEmail) {
        const data = await getAdminDetails(adminEmail); // Ensure this function is correctly imported
        if (data) {
          setAdminDetails({
            name: data.name || "Admin User",
            email: data.email || "N/A",
            role: data.role || "Administrator",
          });
        }
      }
    };

    fetchAdminData();
  }, []);

  // Fetch manufacturers on component mount
  useEffect(() => {
    const loadManufacturers = async () => {
      const data = await fetchManufacturers();
      const pending = data.filter((m) => m.status === "pending");
      const accepted = data.filter((m) => m.status === "accepted");
      const rejected = data.filter((m) => m.status === "rejected");

      setPendingManufacturers(pending);
      setAcceptedManufacturers(accepted);
      setRejectedManufacturers(rejected);
    };

    loadManufacturers();
  }, []);

  // Handle View button click
  const handleView = async (id) => {
    const data = await fetchManufacturerDetails(id);
    setSelectedManufacturer(data);
    setShowWalletAddress(false);

    if (data.website_url) {
      checkWebsiteAuthenticity(data.website_url);
    } else {
      setAuthenticityScore(0);
    }
  };

  const handleAcceptClick = async (id) => {
    await handleAccept(id, setAcceptedManufacturers, setPendingManufacturers);
  };

  const handleReject = async (manufacturer) => {
    console.log("📌 handleReject called with:", manufacturer);

    if (!manufacturer || !manufacturer.manufacturer_id) {
      console.error(
        "❌ Invalid manufacturer data - missing manufacturer_id:",
        manufacturer
      );
      return;
    }

    // Set the selected manufacturer and open the reject dialog
    setSelectedManufacturer(manufacturer);
    setRejectDialogOpen(true);
  };

  // Handle Reject Dialog Submit
  const handleRejectSubmit = async () => {
    if (!selectedManufacturer) return;

    // Call the API to reject the manufacturer
    const result = await rejectManufacturer(
      selectedManufacturer.manufacturer_id,
      rejectComment
    );

    if (result) {
      console.log("✅ Manufacturer rejected:", result);

      // Update the rejected manufacturers list
      setRejectedManufacturers((prev) => [
        ...prev,
        { ...selectedManufacturer, status: "rejected" },
      ]);

      // Remove the manufacturer from the pending list
      setPendingManufacturers((prev) =>
        prev.filter(
          (m) => m.manufacturer_id !== selectedManufacturer.manufacturer_id
        )
      );

      // Close the reject dialog and reset the comment
      setRejectDialogOpen(false);
      setRejectComment("");

      // Go back to the main table
      setSelectedManufacturer(null);
    } else {
      console.error("❌ Failed to update manufacturer status");
    }
  };

  const checkWebsiteAuthenticity = async (websiteUrl) => {
    try {
      const response = await axios.post("/api/genai/authenticmedicinewebsite", {
        website: websiteUrl,
      });
      const { probability } = response.data;
      setAuthenticityScore(parseInt(probability, 10)); // Convert probability to a number
    } catch (error) {
      // Do not log the error to the console
      setAuthenticityScore(0); // Set score to 0% on error
    }
  };

  // Reset selected manufacturer when switching sections
  const handleListItemClick = (section) => {
    setActiveSection(section);
    setSelectedManufacturer(null); // Reset view details when switching sections
    setSidebarVisible(false); // Close sidebar after selection
  };

  // Toggle Sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // Toggle wallet address visibility
  const toggleWalletAddressVisibility = () => {
    setShowWalletAddress((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vh",
        fontFamily: "sans-serif",
      }}
    >
      {/* Navbar */}
      <Box
        sx={{
          width: "100%",
          bgcolor: "#EEF2F6",
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "fixed",
          top: 0,
          zIndex: 1500,
          height: "60px",
        }}
      >
        {/* Left Side: Menu Icon and Navigation Links */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          {/* Menu Button (Inside Navbar) */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleSidebar}
            sx={{
              backgroundColor: "#FFFFDD",
              color: "#016A70",
              borderRadius: "50%",
              boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Navigation Links */}
          <Typography variant="body1">Home</Typography>
          <Typography variant="body1">Contact Us</Typography>
          <Typography variant="body1">About Us</Typography>
        </Box>

        {/* Right Side: Logo & Website Name */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Image src="/healthcare (1).png" alt="Logo" width={50} height={50} />
          <Typography variant="h6" sx={{ ml: 1 }}>
            MediCare
          </Typography>
        </Box>
      </Box>

      <Sidebar
        handleSectionChange={handleSectionChange}
        activeDashboard="manufacturers"
      />

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          paddingTop: "80px",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "20px",
          marginLeft: "0px", // Add this line to push content beside the sidebar
        }}
      >
        {/* Admin Details Section */}
        <Box
          sx={{
            bgcolor: "#E0F7FA",
            padding: "10px",
            borderRadius: "8px",
            display: "flex",
            height: "120px",
            width: "100%",
            border: "1px solid #81D4FA",
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#1E88E5" }}
            >
              Admin Details
            </Typography>
            <Typography variant="body1" color="#1E88E5">
              Name: {adminDetails.name}
            </Typography>
            <Typography variant="body1" color="#1E88E5">
              Email: {adminDetails.email}
            </Typography>
            <Typography variant="body1" color="#1E88E5">
              Role: {adminDetails.role}
            </Typography>
          </Box>
          {/* <Image
            src="/LALA.GPG.jpg"
            alt="Admin"
            width={120}
            height={120}
            style={{ objectFit: "contain", marginLeft: "auto" }}
          /> */}
        </Box>

        <Box sx={{ display: "flex", gap: "20px", marginLeft: "0px" }}>
          {/* Small Containers in a Row */}
          <Box sx={{ display: "flex", gap: "16px", flexDirection: "row" }}>
            {" "}
            {/* Reduced gap by 20% */}
            {/* Pending Manufacturers Container */}
            <Box
              sx={{
                bgcolor: "#FFF3E0",
                padding: "16px", // Reduced padding by 20%
                borderRadius: "8px",
                border: "1px solid #FFA726",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px", // Reduced gap by 20%
                height: "160px", // Reduced height by 20%
                width: "160px", // Reduced width by 20%
              }}
            >
              <Image
                src="/pendingadmin.jpg"
                alt="Pending"
                width={80}
                height={160}
              />{" "}
              {/* Reduced image size by 20% */}
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    color: "#EF6C00",
                    fontSize: "0.8rem",
                  }}
                >
                  {" "}
                  {/* Reduced font size by 20% */}
                  Pending
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: "#EF6C00",
                    textAlign: "center",
                    fontSize: "1.2rem",
                  }}
                >
                  {" "}
                  {/* Reduced font size by 20% */}
                  {pendingManufacturers.length}
                </Typography>
              </Box>
            </Box>
            {/* Accepted Manufacturers Container */}
            <Box
              sx={{
                bgcolor: "#E8F5E9",
                padding: "16px", // Reduced padding by 20%
                borderRadius: "8px",
                border: "1px solid #66BB6A",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px", // Reduced gap by 20%
                height: "160px", // Reduced height by 20%
                width: "160px", // Reduced width by 20%
              }}
            >
              <Image
                src="/acceptedadmin.gif"
                alt="Accepted"
                width={80}
                height={160}
              />{" "}
              {/* Reduced image size by 20% */}
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    color: "#2E7D32",
                    fontSize: "0.8rem",
                  }}
                >
                  {" "}
                  {/* Reduced font size by 20% */}
                  Accepted
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: "#2E7D32",
                    textAlign: "center",
                    fontSize: "1.2rem",
                  }}
                >
                  {" "}
                  {/* Reduced font size by 20% */}
                  {acceptedManufacturers.length}
                </Typography>
              </Box>
            </Box>
            {/* Rejected Manufacturers Container */}
            <Box
              sx={{
                bgcolor: "#FFEBEE",
                padding: "16px", // Reduced padding by 20%
                borderRadius: "8px",
                border: "1px solid #EF5350",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px", // Reduced gap by 20%
                height: "160px", // Reduced height by 20%
                width: "160px", // Reduced width by 20%
              }}
            >
              <Image
                src="/rejectedadmin.png"
                alt="Rejected"
                width={80}
                height={160}
              />{" "}
              {/* Reduced image size by 20% */}
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: "bold",
                    color: "#D32F2F",
                    fontSize: "0.8rem",
                  }}
                >
                  {" "}
                  {/* Reduced font size by 20% */}
                  Rejected
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: "#D32F2F",
                    textAlign: "center",
                    fontSize: "1.2rem",
                  }}
                >
                  {" "}
                  {/* Reduced font size by 20% */}
                  {rejectedManufacturers.length}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* ManufacturerSlideshow */}
          <ManufacturerSlideshow
            manufacturers={
              activeSection === "acceptedManufacturers"
                ? acceptedManufacturers
                : activeSection === "rejectedManufacturers"
                ? rejectedManufacturers
                : pendingManufacturers
            }
            activeSection={activeSection}
            handleView={handleView}
            handleAccept={handleAcceptClick}
            handleReject={handleReject}
            selectedManufacturer={selectedManufacturer}
            setSelectedManufacturer={setSelectedManufacturer}
            authenticityScore={authenticityScore}
            rejectDialogOpen={rejectDialogOpen}
            setRejectDialogOpen={setRejectDialogOpen}
            rejectComment={rejectComment}
            setRejectComment={setRejectComment}
            handleRejectSubmit={handleRejectSubmit}
          />
        </Box>

        {/* Charts Section */}
        <Box
          sx={{
            flex: 1, // Take up remaining space
            bgcolor: "#EEF2F6", // White background
            paddingLeft: "0px",
            paddingBottom: "20px",
            borderRadius: "8px",
          }}
        >
          <Box sx={{ display: "flex", gap: "10px", height: "300px" }}>
            {/* Bar Chart */}

            <Box
              sx={{
                flex: 1,
                bgcolor: "#ffffff",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                padding: "20px",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mb: 2, color: "#016A70" }}
              >
                Manufacturers by Status
              </Typography>
              <BarChart
                pending={pendingManufacturers.length}
                accepted={acceptedManufacturers.length}
                rejected={rejectedManufacturers.length}
              />
            </Box>

            {/* Pie Chart and Total Manufacturers */}
            <Box
              sx={{
                flex: 1,
                bgcolor: "#ffffff",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Heading */}
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#016A70", mb: 2 }}
              >
                Total Manufacturers: {totalManufacturers}
              </Typography>

              {/* Row Container for Chart and Labels */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "20px", // Reduced spacing between chart and labels
                  width: "100%", // Ensure the row takes full width
                  height: "100%", // Ensure the row takes full height
                }}
              >
                {/* Pie Chart */}
                <Box sx={{ width: "60%", height: "100%" }}>
                  <PieChart
                    pending={pendingManufacturers.length}
                    accepted={acceptedManufacturers.length}
                    rejected={rejectedManufacturers.length}
                  />
                </Box>

                {/* Labels in Column */}
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
                >
                  {/* Pending Label */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: "8px" }}
                    >
                      <Box
                        sx={{
                          width: "20px",
                          height: "20px",
                          bgcolor: "#059212",
                          borderRadius: "4px",
                        }}
                      />{" "}
                      {/* Larger Square */}
                      <Typography
                        variant="body1"
                        sx={{ color: "#059212", fontWeight: "bold" }}
                      >
                        Pending
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#555",
                        textAlign: "left",
                        fontSize: "20px",
                        pl: "28px",
                      }}
                    >
                      {pendingManufacturers.length}
                    </Typography>
                  </Box>

                  {/* Accepted Label */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: "8px" }}
                    >
                      <Box
                        sx={{
                          width: "20px",
                          height: "20px",
                          bgcolor: "#982176",
                          borderRadius: "4px",
                        }}
                      />{" "}
                      {/* Larger Square */}
                      <Typography
                        variant="body1"
                        sx={{ color: "#982176", fontWeight: "bold" }}
                      >
                        Accepted
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#555",
                        fontSize: "20px",
                        textAlign: "left",
                        pl: "28px",
                      }}
                    >
                      {acceptedManufacturers.length}
                    </Typography>
                  </Box>

                  {/* Rejected Label */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: "8px" }}
                    >
                      <Box
                        sx={{
                          width: "20px",
                          height: "20px",
                          bgcolor: "#F5004F",
                          borderRadius: "4px",
                        }}
                      />{" "}
                      {/* Larger Square */}
                      <Typography
                        variant="body1"
                        sx={{ color: "#F5004F", fontWeight: "bold" }}
                      >
                        Rejected
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#555",
                        textAlign: "left",
                        fontSize: "20px",
                        pl: "28px",
                      }}
                    >
                      {rejectedManufacturers.length}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Line Chart */}
            <Box
              sx={{
                flex: 1,
                bgcolor: "#ffffff",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
                padding: "20px",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  mb: 2,
                  color: "#016A70",
                  textAlign: "center",
                }}
              >
                Manufacturers Status Over Time
              </Typography>
              <LineChart />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ManufacturerPage;
