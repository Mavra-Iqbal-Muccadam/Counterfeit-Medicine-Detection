"use client";
import React, { useState, useEffect } from "react";
import {
  fetchManufacturers,
  fetchManufacturerDetails,
  acceptManufacturer,
  rejectManufacturer,
} from "../../../lib/admindatafetch";
import IconButton from "@mui/material/IconButton";
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
import handleAccept from '../blockchain/handleaccept'





const AdminPage = () => {
  const [activeSection, setActiveSection] = useState("pendingManufacturers");
  const [selectedManufacturer, setSelectedManufacturer] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [pendingManufacturers, setPendingManufacturers] = useState([]);
  const [acceptedManufacturers, setAcceptedManufacturers] = useState([]);
  const [rejectedManufacturers, setRejectedManufacturers] = useState([]);

  // Fetch manufacturers on component mount
  useEffect(() => {
    const loadManufacturers = async () => {
      const data = await fetchManufacturers();
      console.log("Data from fetchManufacturers:", data); // Log the fetched data

      const pending = data.filter((m) => m.status === "pending");
      const accepted = data.filter((m) => m.status === "accepted");
      const rejected = data.filter((m) => m.status === "rejected");

      console.log("Pending Manufacturers:", pending);
      console.log("Accepted Manufacturers:", accepted);
      console.log("Rejected Manufacturers:", rejected);

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
  };


  const handleAcceptClick = async (id) => {
    await handleAccept(id, setAcceptedManufacturers, setPendingManufacturers);
  };

  // Handle Accept button click
  // const handleAccept = async (id) => {
  //   const manufacturer = pendingManufacturers.find((m) => m.manufacturer_id === id);
  //   if (manufacturer) {
  //     // Update status in the database
  //     const result = await acceptManufacturer(id);
  //     if (result) {
  //       // Update local state
  //       setAcceptedManufacturers((prev) => [...prev, { ...manufacturer, status: "accepted" }]);
  //       setPendingManufacturers((prev) => prev.filter((m) => m.manufacturer_id !== id));
  //     }
  //   }
  // };


  

















  // Handle Reject button click
  const handleReject = async (id) => {
    const manufacturer = pendingManufacturers.find((m) => m.manufacturer_id === id);
    if (manufacturer) {
      // Update status in the database
      const result = await rejectManufacturer(id);
      if (result) {
        // Update local state
        setRejectedManufacturers((prev) => [...prev, { ...manufacturer, status: "rejected" }]);
        setPendingManufacturers((prev) => prev.filter((m) => m.manufacturer_id !== id));
      }
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

  const adminDetails = {
    name: "Admin User",
    experience: "5 years",
    role: "Administrator",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        fontFamily: "sans-serif",
      }}
    >
      {/* Navbar */}
      <Box
        sx={{
          width: "100%",
          bgcolor: "#f0f0f0",
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

      {/* Sidebar (Appears Below Navbar) */}
      <Box
        sx={{
          position: "fixed",
          top: "60px",
          left: sidebarVisible ? 0 : "-250px",
          width: "250px",
          height: "calc(100vh - 60px)",
          bgcolor: "#ffffff",
          borderRight: "1px solid #dee2e6",
          transition: "left 0.3s ease-in-out",
          zIndex: 1400,
          boxShadow: sidebarVisible
            ? "2px 0px 10px rgba(0, 0, 0, 0.2)"
            : "none",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        {/* Close Button */}
        <IconButton
          edge="end"
          color="inherit"
          onClick={toggleSidebar}
          sx={{ position: "absolute", top: 10, right: 10 }}
        >
          <CloseIcon />
        </IconButton>

        {/* Sidebar Content */}
        <Typography
          variant="h6"
          sx={{ p: 2, fontWeight: "bold", color: "#016A70" }}
        >
          Admin Panel
        </Typography>
        <List>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleListItemClick("acceptedManufacturers")}
              sx={{ "&:hover": { bgcolor: "#B2EBF2" } }}
            >
              <ListItemText primary="Accepted Manufacturers" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleListItemClick("rejectedManufacturers")}
              sx={{ "&:hover": { bgcolor: "#B2EBF2" } }}
            >
              <ListItemText primary="Rejected Manufacturers" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleListItemClick("pendingManufacturers")}
              sx={{ "&:hover": { bgcolor: "#B2EBF2" } }}
            >
              <ListItemText primary="Pending Manufacturers" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          padding: "80px 20px 20px",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "20px",
        }}
      >
        {/* Admin Details Section */}
        <Box
          sx={{
            bgcolor: "#E0F7FA",
            padding: "15px",
            borderRadius: "8px",
            display: "flex",
            height: "150px",
            border: "1px solid #81D4FA",
          }}
        >
          <Box sx={{ width: "200px", mr: 2 }}>
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
              Experience: {adminDetails.experience}
            </Typography>
            <Typography variant="body1" color="#1E88E5">
              Role: {adminDetails.role}
            </Typography>
          </Box>
          <Image
            src="/LALA.GPG.jpg"
            alt="Admin"
            width={120}
            height={120}
            style={{ objectFit: "contain", marginLeft: "auto" }}
          />
        </Box>

        {/* Table Section */}
        <Box>
          <Typography variant="h5" sx={{ mb: 2, color: "#016A70" }}>
            {activeSection === "acceptedManufacturers"
              ? "Accepted Manufacturers"
              : activeSection === "rejectedManufacturers"
              ? "Rejected Manufacturers"
              : "Pending Manufacturers"}
          </Typography>

          {/* Show View Table ONLY if selected */}
          {selectedManufacturer ? (
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650, border: "1px solid #ddd" }}
                aria-label="simple table"
              >
                <TableBody>
                  {Object.entries(selectedManufacturer).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell sx={{ padding: "16px" }}>{key}</TableCell>
                      <TableCell sx={{ padding: "16px" }}>{value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <TableContainer component={Paper}>
              <Table
                sx={{
                  minWidth: 650,
                  border: "1px solid #016A70",
                  color: "#016A70",
                }}
                aria-label="simple table"
              >
                <TableHead sx={{ bgcolor: "#016A70" }}>
                  <TableRow>
                    <TableCell
                      sx={{
                        padding: "16px",
                        color: "white",
                        borderBottom: "1px solid white",
                      }}
                    >
                      ID
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "16px",
                        color: "white",
                        borderBottom: "1px solid white",
                      }}
                    >
                      Name
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "16px",
                        color: "white",
                        borderBottom: "1px solid white",
                      }}
                    >
                      Status
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "16px",
                        color: "white",
                        borderBottom: "1px solid white",
                      }}
                    >
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(activeSection === "acceptedManufacturers"
                    ? acceptedManufacturers
                    : activeSection === "rejectedManufacturers"
                    ? rejectedManufacturers
                    : pendingManufacturers
                  ).length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} sx={{ textAlign: "center", color: "#016A70" }}>
                        No manufacturers found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    (activeSection === "acceptedManufacturers"
                      ? acceptedManufacturers
                      : activeSection === "rejectedManufacturers"
                      ? rejectedManufacturers
                      : pendingManufacturers
                    ).map((manufacturer) => (
                      <TableRow
                        key={manufacturer.manufacturer_id}
                        sx={{ "&:nth-of-type(odd)": { bgcolor: "#f9f9f9" } }}
                      >
                        <TableCell sx={{ padding: "16px", color: "#016A70" }}>
                          {manufacturer.manufacturer_id}
                        </TableCell>
                        <TableCell sx={{ padding: "16px", color: "#016A70" }}>
                          {manufacturer.name}
                        </TableCell>
                        <TableCell sx={{ padding: "16px", color: "#016A70" }}>
                          {manufacturer.status}
                        </TableCell>
                        <TableCell sx={{ padding: "16px" }}>
                          <Button
                            onClick={() => handleView(manufacturer.manufacturer_id)}
                            sx={{ color: "#016A70" }}
                          >
                            View
                          </Button>
                          {activeSection === "pendingManufacturers" && (
                            <>
                              <Button
  size="small"
  onClick={() => handleAccept(
    manufacturer.manufacturer_id, 
    setAcceptedManufacturers, 
    setPendingManufacturers, 
    manufacturer // Pass the full manufacturer object
  )}
  sx={{ color: "#016A70" }}
>
  Accept
</Button>
                              <Button
                                size="small"
                                onClick={() => handleReject(manufacturer.manufacturer_id)}
                                sx={{ color: "#016A70" }}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminPage;