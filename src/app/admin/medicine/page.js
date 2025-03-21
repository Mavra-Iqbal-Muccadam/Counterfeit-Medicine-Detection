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
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Image from "next/image";
import MedicineSlideshow from "../medicine/MedicineSlideshow";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import ChartsSection from "./ChartsSection";
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

  const handleView = async (id) => {
    const data = await fetchMedicineDetails(id);
    setSelectedMedicine(data);
  };

  const handleAcceptClick = async (id) => {
    await acceptMedicine(id);
    setAcceptedMedicines((prev) => [...prev, selectedMedicine]);
    setPendingMedicines((prev) => prev.filter((m) => m.id !== id));
  };

  const handleReject = async (medicine) => {
    setSelectedMedicine(medicine);
    setRejectDialogOpen(true);
  };

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
        width: "100%", // Set width to 100%
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
          marginLeft: "-30px",
          width: "100%", // Set width to 100%
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

        {/* Conditional Rendering */}
        {activeSection === "pendingMedicines" ||
        activeSection === "acceptedMedicines" ||
        activeSection === "rejectedMedicines" ? (
          <MedicineSlideshow
            medicines={
              activeSection === "acceptedMedicines"
                ? acceptedMedicines
                : activeSection === "rejectedMedicines"
                ? rejectedMedicines
                : pendingMedicines
            }
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
        ) : activeSection === "medicineAnalytics" ? (
          <ChartsSection
            pendingMedicines={pendingMedicines}
            acceptedMedicines={acceptedMedicines}
            rejectedMedicines={rejectedMedicines}
            totalMedicines={totalMedicines}
          />
        ) : null}
      </Box>
    </Box>
  );
};

export default MedicinePage;