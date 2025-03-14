"use client";
import React, { useState, useEffect } from "react";
import {
  fetchMedicines,
  fetchMedicineDetails,
  acceptMedicine,
  rejectMedicine,
} from "../../../../lib/adminmedicinefetch";
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
import MedicineSlideshow from "../medicine/medicinetableslideshow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import BarChart from "../../components/barchart";
import PieChart from "../../components/piechart";
import LineChart from "../../components/linechart";
import "../admin.css";

const MedicinePage = ({ activeSection, handleSectionChange }) => {
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [pendingMedicines, setPendingMedicines] = useState([]);
  const [acceptedMedicines, setAcceptedMedicines] = useState([]);
  const [rejectedMedicines, setRejectedMedicines] = useState([]);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectComment, setRejectComment] = useState("");
  const [authenticityScore, setAuthenticityScore] = useState(null);
  const totalMedicines = pendingMedicines.length + acceptedMedicines.length + rejectedMedicines.length;



  const medicines =
    activeSection === "acceptedMedicines"
      ? acceptedMedicines
      : activeSection === "rejectedMedicines"
      ? rejectedMedicines
      : pendingMedicines;

  // Fetch medicines on component mount
  useEffect(() => {
    const loadMedicines = async () => {
      const data = await fetchMedicines();
      const pending = data.filter((m) => m.status === "pending");
      const accepted = data.filter((m) => m.status === "accepted");
      const rejected = data.filter((m) => m.status === "rejected");

      setPendingMedicines(pending);
      setAcceptedMedicines(accepted);
      setRejectedMedicines(rejected);
    };

    loadMedicines();
  }, []);

  // Handle View button click
  const handleView = async (id) => {
    const data = await fetchMedicineDetails(id);
    setSelectedMedicine(data);
  };

  // Handle Accept button click
  const handleAcceptClick = async (id) => {
    await acceptMedicine(id);
    setAcceptedMedicines((prev) => [...prev, selectedMedicine]);
    setPendingMedicines((prev) => prev.filter((m) => m.id !== id));
  };

  // Handle Reject button click
  const handleReject = async (medicine) => {
    setSelectedMedicine(medicine);
    setRejectDialogOpen(true);
  };

  // Handle Reject Dialog Submit
  const handleRejectSubmit = async () => {
    if (!selectedMedicine) return;

    const result = await rejectMedicine(selectedMedicine.id, rejectComment);

    if (result) {
      setRejectedMedicines((prev) => [...prev, { ...selectedMedicine, status: "rejected" }]);
      setPendingMedicines((prev) => prev.filter((m) => m.id !== selectedMedicine.id));
      setRejectDialogOpen(false);
      setRejectComment("");
      setSelectedMedicine(null);
    }
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
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setSidebarVisible(!sidebarVisible)}
            sx={{
              backgroundColor: "#FFFFDD",
              color: "#016A70",
              borderRadius: "50%",
              boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
            }}
          >
            <MenuIcon />
          </IconButton>
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
        activeDashboard="medicines"
      />

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          paddingTop: "80px",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "20px",
          marginLeft: "0px",
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
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1E88E5" }}>
              Admin Details
            </Typography>
            <Typography variant="body1" color="#1E88E5">
              Name: Admin User
            </Typography>
            <Typography variant="body1" color="#1E88E5">
              Email: admin@example.com
            </Typography>
            <Typography variant="body1" color="#1E88E5">
              Role: Administrator
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: "20px", marginLeft: "0px" }}>
          {/* Small Containers in a Row */}
          <Box sx={{ display: "flex", gap: "16px", flexDirection: "row" }}>
            {/* Pending Medicines Container */}
            <Box
              sx={{
                bgcolor: "#FFF3E0",
                padding: "16px",
                borderRadius: "8px",
                border: "1px solid #FFA726",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                height: "160px",
                width: "160px",
              }}
            >
              <Image src="/pendingadmin.jpg" alt="Pending" width={80} height={160} />
              <Box>
                <Typography variant="body1" sx={{ fontWeight: "bold", color: "#EF6C00", fontSize: "0.8rem" }}>
                  Pending
                </Typography>
                <Typography variant="h5" sx={{ color: "#EF6C00", textAlign: "center", fontSize: "1.2rem" }}>
                  {pendingMedicines.length}
                </Typography>
              </Box>
            </Box>
            {/* Accepted Medicines Container */}
            <Box
              sx={{
                bgcolor: "#E8F5E9",
                padding: "16px",
                borderRadius: "8px",
                border: "1px solid #66BB6A",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                height: "160px",
                width: "160px",
              }}
            >
              <Image src="/acceptedadmin.gif" alt="Accepted" width={80} height={160} />
              <Box>
                <Typography variant="body1" sx={{ fontWeight: "bold", color: "#2E7D32", fontSize: "0.8rem" }}>
                  Accepted
                </Typography>
                <Typography variant="h5" sx={{ color: "#2E7D32", textAlign: "center", fontSize: "1.2rem" }}>
                  {acceptedMedicines.length}
                </Typography>
              </Box>
            </Box>
            {/* Rejected Medicines Container */}
            <Box
              sx={{
                bgcolor: "#FFEBEE",
                padding: "16px",
                borderRadius: "8px",
                border: "1px solid #EF5350",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                height: "160px",
                width: "160px",
              }}
            >
              <Image src="/rejectedadmin.png" alt="Rejected" width={80} height={160} />
              <Box>
                <Typography variant="body1" sx={{ fontWeight: "bold", color: "#D32F2F", fontSize: "0.8rem" }}>
                  Rejected
                </Typography>
                <Typography variant="h5" sx={{ color: "#D32F2F", textAlign: "center", fontSize: "1.2rem" }}>
                  {rejectedMedicines.length}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* MedicineSlideshow */}
          <MedicineSlideshow
            medicines={medicines}
            activeSection={activeSection}
            handleView={handleView}
            handleAccept={handleAcceptClick}
            handleReject={handleReject}
            selectedMedicine={selectedMedicine}
            setSelectedMedicine={setSelectedMedicine}
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
            flex: 1,
            bgcolor: "#EEF2F6",
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
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, color: "#016A70" }}>
                Medicines by Status
              </Typography>
              <BarChart
                pending={pendingMedicines.length}
                accepted={acceptedMedicines.length}
                rejected={rejectedMedicines.length}
              />
            </Box>

            {/* Pie Chart and Total Medicines */}
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
              <Typography variant="h6" sx={{ fontWeight: "bold", color: "#016A70", mb: 2 }}>
                Total Medicines: {totalMedicines}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "20px", width: "100%", height: "100%" }}>
                <Box sx={{ width: "60%", height: "100%" }}>
                  <PieChart
                    pending={pendingMedicines.length}
                    accepted={acceptedMedicines.length}
                    rejected={rejectedMedicines.length}
                  />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {/* Pending Label */}
                  <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Box sx={{ width: "20px", height: "20px", bgcolor: "#059212", borderRadius: "4px" }} />
                      <Typography variant="body1" sx={{ color: "#059212", fontWeight: "bold" }}>
                        Pending
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: "#555", textAlign: "left", fontSize: "20px", pl: "28px" }}>
                      {pendingMedicines.length}
                    </Typography>
                  </Box>
                  {/* Accepted Label */}
                  <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Box sx={{ width: "20px", height: "20px", bgcolor: "#982176", borderRadius: "4px" }} />
                      <Typography variant="body1" sx={{ color: "#982176", fontWeight: "bold" }}>
                        Accepted
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: "#555", fontSize: "20px", textAlign: "left", pl: "28px" }}>
                      {acceptedMedicines.length}
                    </Typography>
                  </Box>
                  {/* Rejected Label */}
                  <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Box sx={{ width: "20px", height: "20px", bgcolor: "#F5004F", borderRadius: "4px" }} />
                      <Typography variant="body1" sx={{ color: "#F5004F", fontWeight: "bold" }}>
                        Rejected
                      </Typography>
                    </Box>
                    <Typography variant="body2" sx={{ color: "#555", textAlign: "left", fontSize: "20px", pl: "28px" }}>
                      {rejectedMedicines.length}
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
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, color: "#016A70", textAlign: "center" }}>
                Medicines Status Over Time
              </Typography>
              <LineChart />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MedicinePage;