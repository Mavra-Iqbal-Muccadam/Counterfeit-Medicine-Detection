"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
} from "@mui/material";
import { getManufacturersByStatus } from "../../testingblockchain/accepted-rejected-manufacturer/fetch"; // Import the function to fetch manufacturers by status
import axios from "axios"; // Import axios for API calls

const ManufacturerSlideshow = ({
  manufacturers,
  activeSection,
  handleView,
  handleAccept,
  handleReject,
  selectedManufacturer,
  setSelectedManufacturer,
  authenticityScore,
  setAuthenticityScore, // Ensure this prop is passed
}) => {
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [filteredManufacturers, setFilteredManufacturers] = useState([]);

  // Column mapping for manufacturer details
  const columnNameMapping = {
    manufacturerName: "Manufacturer Name",
    physicalAddress: "Physical Address",
    phoneNumber: "Phone Number",
    licenceNo: "License Number",
    email: "Email Address",
    walletAddress: "Wallet Address",
    certificationNumber: "Certification Number",
    website: "Website URL",
    dateOfIssue: "Date of Issue",
    status: "Status",
    pdfCID: "Certification PDF",
  };

  // Fetch manufacturers based on activeSection
  useEffect(() => {
    const fetchManufacturers = async () => {
      try {
        const status = activeSection === "pendingManufacturers" ? "Pending" :
                       activeSection === "acceptedManufacturers" ? "Approved" :
                       activeSection === "rejectedManufacturers" ? "Rejected" : null;
        if (status) {
          const data = await getManufacturersByStatus(status);
          // Hardcode the status for Approved and Rejected tables
          const updatedData = data.map((manufacturer) => ({
            ...manufacturer,
            status: status, // Override the status based on the table type
          }));
          setFilteredManufacturers(updatedData);
        }
      } catch (error) {
        console.error("Error fetching manufacturers:", error);
      }
    };

    fetchManufacturers();
  }, [activeSection]);

  // Handle View Details button click
  const handleViewDetails = async (manufacturerId) => {
    const selected = filteredManufacturers.find((m) => m.tokenId === manufacturerId);
    if (selected) {
      setSelectedManufacturer(selected);
      setDetailsModalOpen(true); // Open the details modal

      // Check website authenticity if website exists
      if (selected.website) {
        await checkWebsiteAuthenticity(selected.website);
      } else {
        setAuthenticityScore(0); // Set score to 0 if no website is provided
      }
    }
  };

  // Handle View PDF button click
  const handleViewPDF = (pdfCID) => {
    if (pdfCID) {
      window.open(`https://ipfs.io/ipfs/${pdfCID}`, "_blank"); // Open PDF in a new tab
    }
  };

  // Handle Accept/Reject button click
  const handleStatusUpdate = async (tokenId, newStatus) => {
    try {
      if (newStatus === "Approved") {
        await handleAccept(tokenId);
      } else if (newStatus === "Rejected") {
        await handleReject(tokenId);
      }
      setDetailsModalOpen(false); // Close the modal after updating status
    } catch (error) {
      console.error("Error updating manufacturer status:", error);
    }
  };

  // Check website authenticity
  const checkWebsiteAuthenticity = async (websiteUrl) => {
    try {
      console.log("Checking website authenticity for:", websiteUrl); // Debug
      const response = await axios.post("/api/genai/authenticmedicinewebsite", {
        website: websiteUrl,
      });
      console.log("API Response:", response.data); // Debug
      const { probability } = response.data;
      setAuthenticityScore(parseInt(probability, 10)); // Update the authenticity score
    } catch (error) {
      console.error("Error checking website authenticity:", error); // Debug
      setAuthenticityScore(0); // Set score to 0 if there's an error
    }
  };

  // Determine the color of the progress bar based on the authenticity score
  const getProgressBarColor = (score) => {
    if (score < 30) {
      return "error"; // Red
    } else if (score >= 30 && score < 65) {
      return "warning"; // Yellow
    } else {
      return "success"; // Green
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "calc(100vh - 390px)",
        overflowY: "auto",
        bgcolor: "#ffffff",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        zIndex: 1200,
        padding: "20px",
        marginLeft: "20px",
        position: "relative",
      }}
    >
      {/* Table View for Manufacturers */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Manufacturer Name</TableCell>
              <TableCell>License Number</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredManufacturers.map((manufacturer) => (
              <TableRow key={manufacturer.tokenId}>
                <TableCell>{manufacturer.manufacturerName}</TableCell>
                <TableCell>{manufacturer.licenceNo}</TableCell>
                <TableCell>{manufacturer.status}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleViewDetails(manufacturer.tokenId)}
                    sx={{ backgroundColor: "#016A70", color: "#fff", mr: 1 }}
                  >
                    View Details
                  </Button>
                  {/* Show Accept/Reject buttons only for Pending manufacturers */}
                  {activeSection === "pendingManufacturers" && manufacturer.status === "Pending" && (
                    <>
                      <Button
                        variant="contained"
                        onClick={() => handleStatusUpdate(manufacturer.tokenId, "Approved")}
                        sx={{ backgroundColor: "#00C851", color: "#fff", mr: 1 }}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleStatusUpdate(manufacturer.tokenId, "Rejected")}
                        sx={{ backgroundColor: "#ff4444", color: "#fff" }}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Details Modal */}
      <Dialog
        open={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        fullWidth
        maxWidth="md" // Ensure the modal is wide enough
      >
        <DialogTitle>Manufacturer Details</DialogTitle>
        <DialogContent>
          {selectedManufacturer && (
            <Box>
              {/* Manufacturer Details */}
              {Object.entries(selectedManufacturer).map(([key, value]) => {
                if (key === "tokenId" || key === "walletAddress") return null;

                const columnName = columnNameMapping[key] || key;

                return (
                  <Box key={key} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#016A70" }}>
                      {columnName}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#555" }}>
                      {key === "website" ? (
                        value ? (
                          <a
                            href={value.startsWith("https") ? value : `https://${value}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#016A70", textDecoration: "underline" }}
                          >
                            {value}
                          </a>
                        ) : (
                          "N/A"
                        )
                      ) : key === "pdfCID" ? (
                        <Button
                          variant="contained"
                          onClick={() => handleViewPDF(value)}
                          sx={{ backgroundColor: "#016A70", color: "#fff" }}
                        >
                          View PDF
                        </Button>
                      ) : (
                        value
                      )}
                    </Typography>
                  </Box>
                );
              })}

              {/* Website Authenticity Score and Progress Bar */}
              {selectedManufacturer.website && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#016A70" }}>
                    Website Authenticity Score
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#555", mb: 1 }}>
                    {authenticityScore !== null ? `${authenticityScore}%` : "Calculating..."}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={authenticityScore || 0}
                    color={getProgressBarColor(authenticityScore)}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: "#e0e0e0", // Light gray background for the progress bar
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 5, // Rounded corners for the progress bar
                      },
                    }}
                  />
                </Box>
              )}

              {/* Show Accept/Reject buttons only for Pending manufacturers in the modal */}
              {activeSection === "pendingManufacturers" && selectedManufacturer.status === "Pending" && (
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
                  <Button
                    variant="contained"
                    onClick={() => handleStatusUpdate(selectedManufacturer.tokenId, "Approved")}
                    sx={{ backgroundColor: "#00C851", color: "#fff" }}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleStatusUpdate(selectedManufacturer.tokenId, "Rejected")}
                    sx={{ backgroundColor: "#ff4444", color: "#fff" }}
                  >
                    Reject
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsModalOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManufacturerSlideshow;