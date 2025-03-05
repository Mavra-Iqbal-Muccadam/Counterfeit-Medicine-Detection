// "use client";
// import React, { useState } from "react";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import CloseIcon from "@mui/icons-material/Close";
// import Typography from "@mui/material/Typography";
// import Box from "@mui/material/Box";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemText from "@mui/material/ListItemText";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import Button from "@mui/material/Button";
// import Image from "next/image";

// const AdminPage = () => {
//   const [activeSection, setActiveSection] = useState("pendingUsers");
//   const [selectedManufacturer, setSelectedManufacturer] = useState(null);
//   const [sidebarVisible, setSidebarVisible] = useState(false);

//   // ✅ Reset selected manufacturer when switching sections
//   const handleListItemClick = (section) => {
//     setActiveSection(section);
//     setSelectedManufacturer(null); // Reset view details when switching sections
//     setSidebarVisible(false); // Close sidebar after selection
//   };
//   const adminDetails = {
//     name: "Admin User",
//     experience: "5 years",
//     role: "Administrator",
//   };

//   // Toggle Sidebar visibility
//   const toggleSidebar = () => {
//     setSidebarVisible(!sidebarVisible);
//   };

//   // Handle clicking "View" button
//   const handleView = (manufacturer) => {
//     setSelectedManufacturer({
//       id: manufacturer.id,
//       name: manufacturer.name,
//       licenseNo: "12345",
//       email: "test@example.com",
//       phone: "123-456-7890",
//       website: "www.example.com",
//       address: "123 Main St",
//       walletAddress: "0xAbCdEfGhIjKlMnOpQrStUvWxYz",
//       certificationNumber: "CERT-9876",
//     });
//   };

//   // Data for tables
//   const pendingUsers = [
//     { id: 3, name: 'Ali', status: 'Pending' },
//     { id: 4, name: 'Hussain', status: 'Pending' },
//     { id: 5, name: 'Aoun', status: 'Pending' },
//     { id: 6, name: 'Mustufa', status: 'Pending' },
//     { id: 7, name: 'Irtiza', status: 'Pending' },
//     { id: 8, name: 'Aizaz', status: 'Pending' },
//     { id: 9, name: 'Abbas', status: 'Pending' },
//     { id: 10, name: 'Husnain', status: 'Pending' },
//   ];

//   const acceptedManufacturers = [
//     { id: 11, name: "Manufacturer C", status: "Accepted" },
//     { id: 12, name: "Manufacturer D", status: "Accepted" },
//   ];

//   const rejectedManufacturers = [
//     { id: 13, name: "Manufacturer E", status: "Rejected" },
//     { id: 14, name: "Manufacturer F", status: "Rejected" },
//   ];

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: "sans-serif" }}>
      
//       {/* Navbar */}
//       <Box
//         sx={{
//           width: "100%",
//           bgcolor: "#f0f0f0",
//           padding: "10px 20px",
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           position: "fixed",
//           top: 0,
//           zIndex: 1500,
//           height: "60px",
//         }}
//       >
//         {/* Left Side: Menu Icon and Navigation Links */}
//         <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
//           {/* Menu Button (Inside Navbar) */}
//           <IconButton
//             edge="start"
//             color="inherit"
//             aria-label="menu"
//             onClick={toggleSidebar}
//             sx={{
//               backgroundColor: "#FFFFDD",
//               color: "#016A70",
//               borderRadius: "50%",
//               boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
//             }}
//           >
//             <MenuIcon />
//           </IconButton>

//           {/* Navigation Links */}
//           <Typography variant="body1">Home</Typography>
//           <Typography variant="body1">Contact Us</Typography>
//           <Typography variant="body1">About Us</Typography>
//         </Box>

//         {/* Right Side: Logo & Website Name */}
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <Image src="/healthcare (1).png" alt="Logo" width={50} height={50} />
//           <Typography variant="h6" sx={{ ml: 1 }}>MediCare</Typography>
//         </Box>
//       </Box>

//       {/* Sidebar (Appears Below Navbar) */}
//       <Box
//         sx={{
//           position: "fixed",
//           top: "60px",
//           left: sidebarVisible ? 0 : "-250px",
//           width: "250px",
//           height: "calc(100vh - 60px)",
//           bgcolor: "#ffffff",
//           borderRight: "1px solid #dee2e6",
//           transition: "left 0.3s ease-in-out",
//           zIndex: 1400,
//           boxShadow: sidebarVisible ? "2px 0px 10px rgba(0, 0, 0, 0.2)" : "none",
//           borderRadius: "10px",
//           overflow: "hidden",
//         }}
//       >
//         {/* Close Button */}
//         <IconButton
//           edge="end"
//           color="inherit"
//           onClick={toggleSidebar}
//           sx={{ position: "absolute", top: 10, right: 10 }}
//         >
//           <CloseIcon />
//         </IconButton>

//         {/* Sidebar Content */}
//         <Typography variant="h6" sx={{ p: 2, fontWeight: "bold", color: "#016A70" }}>Admin Panel</Typography>
//         <List>
//           <ListItem disablePadding>
//             <ListItemButton onClick={() => handleListItemClick("acceptedManufacturers")} sx={{ '&:hover': { bgcolor: '#B2EBF2' } }}>
//               <ListItemText primary="Accepted Manufacturers" />
//             </ListItemButton>
//           </ListItem>
//           <ListItem disablePadding>
//             <ListItemButton onClick={() => handleListItemClick("rejectedManufacturers")} sx={{ '&:hover': { bgcolor: '#B2EBF2' } }}>
//               <ListItemText primary="Rejected Manufacturers" />
//             </ListItemButton>
//           </ListItem>
//           <ListItem disablePadding>
//             <ListItemButton onClick={() => handleListItemClick("pendingUsers")} sx={{ '&:hover': { bgcolor: '#B2EBF2' } }}>
//               <ListItemText primary="Pending Users" />
//             </ListItemButton>
//           </ListItem>
//         </List>
//       </Box>

//       {/* Main Content */}
//       <Box sx={{ flex: 1, padding: "80px 20px 20px", display: "grid", gridTemplateColumns: "1fr", gap: "20px" }}>

//         {/* Admin Details Section */}
//         <Box sx={{ bgcolor: "#E0F7FA", padding: "15px", borderRadius: "8px", display: "flex", height: "150px", border: "1px solid #81D4FA" }}>
//           <Box sx={{ width: "200px", mr: 2 }}>
//             <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1E88E5" }}>Admin Details</Typography>
//             <Typography variant="body1" color="#1E88E5">Name: {adminDetails.name}</Typography>
//             <Typography variant="body1" color="#1E88E5">Experience: {adminDetails.experience}</Typography>
//             <Typography variant="body1" color="#1E88E5">Role: {adminDetails.role}</Typography>
//           </Box>
//           <Image
//             src="/LALA.GPG.jpg"
//             alt="Admin"
//             width={120}
//             height={120}
//             style={{ objectFit: "contain", marginLeft: "auto" }}
//           />
//         </Box>

//         {/* Table Section */}
//         <Box>
//             <Typography variant="h5" sx={{ mb: 2, color: "#016A70" }}>
//             {activeSection === "acceptedManufacturers"
//               ? "Accepted Manufacturers"
//               : activeSection === "rejectedManufacturers"
//                 ? "Rejected Manufacturers"
//                 : "Pending Users"}
//           </Typography>

//           {/* Show View Table ONLY if selected */}
//           {selectedManufacturer ? (
//             <TableContainer component={Paper}>
//               <Table sx={{ minWidth: 650, border: '1px solid #ddd' }} aria-label="simple table">
//                 <TableBody>
//                   {Object.entries(selectedManufacturer).map(([key, value]) => (
//                     <TableRow key={key}>
//                       <TableCell sx={{ padding: '16px' }}>{key}</TableCell>
//                       <TableCell sx={{ padding: '16px' }}>{value}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           ) : (
//             <TableContainer component={Paper}>
//               <Table sx={{ minWidth: 650, border: '1px solid #016A70', color: "#016A70" }} aria-label="simple table">
//                 <TableHead sx={{ bgcolor: '#016A70' }}>
//                   <TableRow>
//                     <TableCell sx={{ padding: '16px', color: "white", borderBottom: '1px solid white' }}>ID</TableCell>
//                     <TableCell sx={{ padding: '16px', color: "white", borderBottom: '1px solid white' }}>Name</TableCell>
//                     <TableCell sx={{ padding: '16px', color: "white", borderBottom: '1px solid white' }}>Status</TableCell>
//                     <TableCell sx={{ padding: '16px', color: "white", borderBottom: '1px solid white' }}>Action</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {(activeSection === "acceptedManufacturers"
//                     ? acceptedManufacturers
//                     : activeSection === "rejectedManufacturers"
//                       ? rejectedManufacturers
//                       : pendingUsers
//                   ).map((row, index) => (
//                     <TableRow key={row.id} sx={{ '&:nth-of-type(odd)': { bgcolor: '#f9f9f9' } }}>
//                       <TableCell sx={{ padding: '16px', color: "#016A70" }}>{row.id}</TableCell>
//                       <TableCell sx={{ padding: '16px', color: "#016A70" }}>{row.name}</TableCell>
//                       <TableCell sx={{ padding: '16px', color: "#016A70" }}>{row.status}</TableCell>
//                       <TableCell sx={{ padding: '16px' }}>
//                         <Button onClick={() => handleView(row)}  sx={{ color: "#016A70" }}>View</Button>
//                         <Button size="small"  sx={{ color: "#016A70" }}>Accept</Button>
//                         <Button size="small" sx={{ color: "#016A70" }}>Reject</Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// }

// export default AdminPage;



"use client";
import React, { useState, useEffect } from "react";
import { fetchManufacturers, fetchManufacturerDetails } from "../../../pages/api/admindashboard/admindatafetch";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const AdminPage = () => {
  const [manufacturers, setManufacturers] = useState([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState(null);

  // Fetch manufacturers on component mount
  useEffect(() => {
    const loadManufacturers = async () => {
      const data = await fetchManufacturers();
      setManufacturers(data);
    };

    loadManufacturers();
  }, []);

  // Handle View button click
  const handleView = async (id) => {
    const data = await fetchManufacturerDetails(id);
    setSelectedManufacturer(data);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {manufacturers.map((manufacturer) => (
              <TableRow key={manufacturer.manufacturer_id}> {/* ✅ Corrected Key */}
                <TableCell>{manufacturer.manufacturer_id}</TableCell>
                <TableCell>{manufacturer.name}</TableCell>
                <TableCell>{manufacturer.status}</TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleView(manufacturer.manufacturer_id)}> {/* ✅ Corrected ID */}
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>

      {/* Manufacturer Details */}
      {selectedManufacturer && (
        <Box mt={2} p={2} border={1} borderColor="grey.300">
          <Typography variant="h6">Manufacturer Details</Typography>
          <p><strong>Name:</strong> {selectedManufacturer.name}</p>
          <p><strong>Address:</strong> {selectedManufacturer.physical_address}</p>
          <p><strong>Phone:</strong> {selectedManufacturer.phone}</p>
          <p><strong>Email:</strong> {selectedManufacturer.email}</p>
          <p><strong>Wallet Address:</strong> {selectedManufacturer.wallet_address}</p>
          <p><strong>Certification PDF:</strong> 
            <a href={selectedManufacturer.certification_url} target="_blank" rel="noopener noreferrer"> View</a>
          </p>
          <p><strong>Certificate No.:</strong> {selectedManufacturer.certification_no}</p>
          <p><strong>Website:</strong> {selectedManufacturer.website_url || "N/A"}</p>
          <p><strong>Issue Date:</strong> {selectedManufacturer.date_of_issue}</p>
          <p><strong>Registration Date:</strong> {selectedManufacturer.reg_date}</p>
        </Box>
      )}
    </Box>
  );
};

export default AdminPage;
