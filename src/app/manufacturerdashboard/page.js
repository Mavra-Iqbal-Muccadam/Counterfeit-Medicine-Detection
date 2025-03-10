"use client";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Image from "next/image";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";

// Sample data for medicine uses
const medicineUses = {
  1: "Used to relieve pain and reduce fever.",
  2: "An antibiotic used to treat bacterial infections.",
  3: "A vitamin supplement to boost immunity.",
  4: "Used to relieve pain, inflammation, and fever.",
  5: "Used to reduce pain, fever, and inflammation.",
  6: "An antihistamine used to treat allergies.",
  7: "Used to relieve pain, inflammation, and fever.",
  8: "An antibiotic used to treat bacterial infections.",
  9: "Used to reduce pain, fever, and inflammation.",
  10: "An antihistamine used to treat allergies.",
};

// Medicine data for each tab with external image links
const medicinesData = {
  pending: [
    {
      id: 1,
      name: "Paracetamol",
      type: "Tablet",
      image: "/images/p.jpg",
      batchNumber: "BATCH-001",
      manufactureDate: "01/01/2023",
      expiryDate: "01/01/2025",
      excipients: ["STARCH", "MAGNESIUM STEARATE", "TALC"],
    },
    {
      id: 2,
      name: "Amoxicillin",
      type: "Antibiotic",
      image: "/images/ok.jpg",
      batchNumber: "BATCH-002",
      manufactureDate: "02/01/2023",
      expiryDate: "02/01/2025",
      excipients: ["STARCH", "MAGNESIUM STEARATE", "TALC"],
    },
    {
      id: 3,
      name: "Vitamin C",
      type: "Capsule",
      image: "/images/c.webp",
      batchNumber: "BATCH-003",
      manufactureDate: "03/01/2023",
      expiryDate: "03/01/2025",
      excipients: ["STARCH", "MAGNESIUM STEARATE", "TALC"],
    },
    {
      id: 4,
      name: "Ibuprofen",
      type: "Tablet",
      image: "/images/b.jpg",
      batchNumber: "BATCH-004",
      manufactureDate: "04/01/2023",
      expiryDate: "04/01/2025",
      excipients: ["STARCH", "MAGNESIUM STEARATE", "TALC"],
    },
    {
      id: 5,
      name: "Aspirin",
      type: "Tablet",
      image: "/images/a.jpg",
      batchNumber: "BATCH-005",
      manufactureDate: "05/01/2023",
      expiryDate: "05/01/2025",
      excipients: ["STARCH", "MAGNESIUM STEARATE", "TALC"],
    },
    {
      id: 6,
      name: "Cetirizine",
      type: "Capsule",
      image: "/images/cet.jpg",
      batchNumber: "BATCH-006",
      manufactureDate: "06/01/2023",
      expiryDate: "06/01/2025",
      excipients: ["STARCH", "MAGNESIUM STEARATE", "TALC"],
    },
  ],
  accepted: [
    {
      id: 7,
      name: "Ibuprofen",
      type: "Tablet",
      image: "https://via.placeholder.com/150",
      batchNumber: "BATCH-007",
      manufactureDate: "07/01/2023",
      expiryDate: "07/01/2025",
      excipients: ["STARCH", "MAGNESIUM STEARATE", "TALC"],
    },
    {
      id: 8,
      name: "Azithromycin",
      type: "Antibiotic",
      image: "https://via.placeholder.com/150",
      batchNumber: "BATCH-008",
      manufactureDate: "08/01/2023",
      expiryDate: "08/01/2025",
      excipients: ["STARCH", "MAGNESIUM STEARATE", "TALC"],
    },
  ],
  rejected: [
    {
      id: 9,
      name: "Aspirin",
      type: "Tablet",
      image: "https://via.placeholder.com/150",
      batchNumber: "BATCH-009",
      manufactureDate: "09/01/2023",
      expiryDate: "09/01/2025",
      excipients: ["STARCH", "MAGNESIUM STEARATE", "TALC"],
    },
    {
      id: 10,
      name: "Cetirizine",
      type: "Capsule",
      image: "https://via.placeholder.com/150",
      batchNumber: "BATCH-010",
      manufactureDate: "10/01/2023",
      expiryDate: "10/01/2025",
      excipients: ["STARCH", "MAGNESIUM STEARATE", "TALC"],
    },
  ],
};

const acceptedData = [
  { name: "Drugs", value: 50, color: "#E91E63", unfilledColor: "#E0E0E0" },
  { name: "Capsules", value: 17, color: "#3357FF", unfilledColor: "#E0E0E0" },
  { name: "Tablets", value: 30, color: "#FFA500", unfilledColor: "#E0E0E0" },
  { name: "Antibiotics", value: 66, color: "#a812e3", unfilledColor: "#E0E0E0" },
];

const pendingData = [
  { name: "Capsules", Capsules: 10 },
  { name: "Tablets", Tablets: 20 },
  { name: "Antibiotics", Antibiotics: 15 },
  { name: "Drugs", Drugs: 25 },
];

const rejectedData = [
  { name: "Capsules", value: 5, color: "#3357FF" }, // Blue
  { name: "Tablets", value: 10, color: "#FFA500" }, // Orange
  { name: "Antibiotics", value: 20, color: "#a812e3" }, // Purple
  { name: "Drugs", value: 15, color: "#E91E63" }, // Red
];

const ManufacturerDashboard = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("pending"); // Default tab is "pending"
  const [openModal, setOpenModal] = useState(false); // For the add medicine modal
  const [newMedicine, setNewMedicine] = useState({ name: "", type: "", image: "" });
  const [hoveredCard, setHoveredCard] = useState(null); // Track which card is hovered
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddMedicine = () => {
    if (newMedicine.name && newMedicine.type && newMedicine.image) {
      medicinesData[activeTab].push({
        id: medicinesData[activeTab].length + 1,
        ...newMedicine,
      });
      setNewMedicine({ name: "", type: "", image: "" });
      handleCloseModal();
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMedicine({ ...newMedicine, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCardClick = (medicine) => {
    setSelectedMedicine(medicine);
    setDetailsModalOpen(true);
  };

  const MedicineDetailsModal = ({ open, onClose, medicine }) => {
    if (!medicine) return null;

    return (
      <Modal open={open} onClose={onClose}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>{medicine.name}</Typography>
          <CardMedia
            component="img"
            height="200"
            image={medicine.image}
            alt={medicine.name}
            sx={{ objectFit: "contain", width: "100%", mb: 2 }}
          />
          <Typography variant="body1">Type: {medicine.type}</Typography>
          <Typography variant="body1">Medicine ID: {medicine.id}</Typography>
          <Typography variant="body1">Batch Number: {medicine.batchNumber || "N/A"}</Typography>
          <Typography variant="body1">Manufacture Date: {medicine.manufactureDate || "N/A"}</Typography>
          <Typography variant="body1">Expiry Date: {medicine.expiryDate || "N/A"}</Typography>
          <Typography variant="body1">Excipients: {medicine.excipients?.join(", ") || "N/A"}</Typography>
          <Button variant="contained" fullWidth onClick={onClose} sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: "sans-serif" }}>
      {/* Navbar */}
      <Box sx={{ width: "100%", bgcolor: "#f0f0f0", padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "fixed", top: 0, zIndex: 1500, height: "60px" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar} sx={{ backgroundColor: "#FFFFDD", color: "#016A70", borderRadius: "50%", boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)" }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="body1">Home</Typography>
          <Typography variant="body1">Contact Us</Typography>
          <Typography variant="body1">About Us</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Image src="/healthcare (1).png" alt="Logo" width={50} height={50} />
          <Typography variant="h6" sx={{ ml: 1 }}>MediCare</Typography>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, padding: "80px 20px 20px", display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>
        <h1>Manufacturer Dashboard</h1>

        {/* Horizontal Layout for Charts */}
        <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: 2 }}>
          {/* Accepted Medicines - Multi-Ring Donut Chart */}
          <Box sx={{ padding: '10px', border: '1px solid rgba(255, 255, 255, 0.3)', borderRadius: '12px', backgroundColor: 'rgba(173, 216, 230, 0.3)', boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)', flex: 1, backdropFilter: "blur(10px)", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ textAlign: "center" }}>Accepted Medicines</Typography>
            <PieChart width={250} height={250}>
              {acceptedData.map((category, index) => (
                <Pie
                  key={category.name}
                  data={[
                    { name: category.name, value: category.value },
                    { name: "Remaining", value: 100 - category.value },
                  ]}
                  cx={125}
                  cy={125}
                  innerRadius={40 + index * 20}
                  outerRadius={60 + index * 20}
                  startAngle={90}
                  endAngle={-270}
                  paddingAngle={3}
                  dataKey="value"
                >
                  <Cell fill={category.color} stroke="white" strokeWidth={3} />
                  <Cell fill={category.unfilledColor} stroke="white" strokeWidth={3} />
                </Pie>
              ))}
              <Tooltip formatter={(value, name) => [`${value}%`, name]} />
            </PieChart>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
              {acceptedData.map((category) => (
                <Box key={category.name} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box sx={{ width: 20, height: 20, backgroundColor: category.color, borderRadius: 2 }}></Box>
                  <Typography variant="body2">{category.name}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Pending Medicines - Bar Chart */}
          <Box sx={{ padding: '10px', border: '1px solid rgba(255, 255, 255, 0.3)', borderRadius: '12px', backgroundColor: 'rgba(173, 216, 230, 0.3)', boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)', flex: 1, backdropFilter: "blur(10px)", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ textAlign: "center" }}>Pending Medicines</Typography>
            <BarChart width={250} height={250} data={pendingData}>
              <XAxis dataKey="name" tick={{ textAnchor: "middle" }} />
              <YAxis />
              <Tooltip formatter={(value, name) => [`${value} pending`, name]} />
              <Legend />
              <Bar dataKey="Capsules" fill="#3357FF" name="Capsules" barSize={30} />
              <Bar dataKey="Tablets" fill="#FFA500" name="Tablets" barSize={30} />
              <Bar dataKey="Antibiotics" fill="#a812e3" name="Antibiotics" barSize={30} />
              <Bar dataKey="Drugs" fill="#E91E63" name="Drugs" barSize={30} />
            </BarChart>
          </Box>

          {/* Rejected Medicines - Pie Chart */}
          <Box sx={{ padding: '10px', border: '1px solid rgba(255, 255, 255, 0.3)', borderRadius: '12px', backgroundColor: 'rgba(173, 216, 230, 0.3)', boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)', flex: 1, backdropFilter: "blur(10px)", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ textAlign: "center" }}>Rejected Medicines</Typography>
            <PieChart width={250} height={250}>
              <Pie
                data={rejectedData}
                cx={125}
                cy={125}
                innerRadius={50}
                outerRadius={70}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {rejectedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="white" strokeWidth={3} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} rejected`, name]} />
              <Legend />
            </PieChart>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
              {rejectedData.map((category) => (
                <Box key={category.name} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box sx={{ width: 20, height: 20, backgroundColor: category.color, borderRadius: 2 }}></Box>
                  <Typography variant="body2">{category.name}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Tabs for Medicines */}
        <Box sx={{ mt: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Tabs value={activeTab} onChange={handleTabChange} centered>
              <Tab label="Pending Medicines" value="pending" />
              <Tab label="Accepted Medicines" value="accepted" />
              <Tab label="Rejected Medicines" value="rejected" />
            </Tabs>
            <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenModal}>
              Add Medicine
            </Button>
          </Box>

          {/* Medicine Cards */}
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(240px, 1fr))", gap: 3, mt: 2 }}>
            {medicinesData[activeTab].map((medicine) => (
              <Box
                key={medicine.id}
                onMouseEnter={() => setHoveredCard(medicine.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleCardClick(medicine)}
                sx={{
                  perspective: "1000px",
                  width: "100%",
                  height: "240px",
                  cursor: "pointer",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    transformStyle: "preserve-3d",
                    transition: "transform 0.6s",
                    transform: hoveredCard === medicine.id ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* Front of the Card */}
                  <Card
                    sx={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="180"
                      image={medicine.image}
                      alt={medicine.name}
                      sx={{
                        height: 200,
                        objectFit: "contain",
                        width: "100%",
                      }}
                    />
                    <CardContent>
                      <Typography variant="h6" sx={{ fontSize: "1rem" }}>{medicine.name}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: "0.875rem" }}>
                        Type: {medicine.type}
                      </Typography>
                    </CardContent>
                  </Card>

                  {/* Back of the Card */}
                  <Card
                    sx={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      backgroundColor: "#f0f0f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      p: 2,
                    }}
                  >
                    <Typography variant="body1">
                      {medicineUses[medicine.id] || "No use information available."}
                    </Typography>
                  </Card>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Add Medicine Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>Add New Medicine</Typography>
          <TextField
            fullWidth
            label="Medicine Name"
            value={newMedicine.name}
            onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Medicine Type"
            value={newMedicine.type}
            onChange={(e) => setNewMedicine({ ...newMedicine, type: e.target.value })}
            sx={{ mb: 2 }}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: "none" }}
            id="upload-image"
          />
          <label htmlFor="upload-image">
            <Button variant="outlined" component="span" fullWidth sx={{ mb: 2 }}>
              Upload Image
            </Button>
          </label>
          {newMedicine.image && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2">Preview:</Typography>
              <img src={newMedicine.image} alt="Preview" style={{ width: "100%", height: "auto", borderRadius: 4 }} />
            </Box>
          )}
          <Button variant="contained" fullWidth onClick={handleAddMedicine}>
            Add Medicine
          </Button>
        </Box>
      </Modal>

      {/* Medicine Details Modal */}
      <MedicineDetailsModal
        open={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        medicine={selectedMedicine}
      />
    </Box>
  );
};

export default ManufacturerDashboard;