"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  IconButton,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const ManufacturerSlideshow = ({
  manufacturers,
  activeSection,
  handleView,
  handleAccept,
  handleReject,
  selectedManufacturer,
  setSelectedManufacturer,
  authenticityScore,
  rejectDialogOpen,
  setRejectDialogOpen,
  rejectComment,
  setRejectComment,
  handleRejectSubmit,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [showRejectCommentBox, setShowRejectCommentBox] = useState(false);

  // Column mapping for manufacturer details
  const columnNameMapping = {
    name: "Manufacturer Name",
    physical_address: "Physical Address",
    phone: "Phone Number",
    licence_no: "License Number",
    email: "Email Address",
    wallet_address: "Wallet Address",
    certification_url: "Certification PDF",
    certification_no: "Certification Number",
    website_url: "Website URL",
    date_of_issue: "Date of Issue",
    reg_date: "Registration Date",
    status: "Status",
    rejection_comments: "Rejection Comments",
  };

  // Filter manufacturers based on activeSection
  const filteredManufacturers = manufacturers.filter((manufacturer) => {
    if (activeSection === "pendingManufacturers") {
      return manufacturer.status === "pending";
    } else if (activeSection === "acceptedManufacturers") {
      return manufacturer.status === "accepted";
    } else if (activeSection === "rejectedManufacturers") {
      return manufacturer.status === "rejected";
    }
    return true;
  });

  // Handle navigation between manufacturers
  const handleNavigation = (direction) => {
    if (direction === "previous" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === "next" && currentIndex < filteredManufacturers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Get the current manufacturer
  const currentManufacturer = filteredManufacturers[currentIndex];

  // Ensure manufacturers are defined and not empty
  if (filteredManufacturers.length === 0) {
    return (
      <Box sx={{ textAlign: "center", padding: "20px" }}>
        <Typography variant="h6" sx={{ color: "#016A70" }}>
          No manufacturers available.
        </Typography>
      </Box>
    );
  }

  // Handle View Details button click
  const handleViewDetails = (manufacturerId) => {
    handleView(manufacturerId); // Fetch manufacturer details
    setDetailsModalOpen(true); // Open the details modal
    setShowRejectCommentBox(false); // Reset reject comment box visibility
  };

  // Handle Reject button click
  const handleRejectClick = () => {
    setShowRejectCommentBox(true); // Show the reject comment box
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
      {/* Navigation Arrows */}
      <>
        <IconButton
          onClick={() => handleNavigation("previous")}
          disabled={currentIndex === 0}
          sx={{
            position: "absolute",
            left: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#016A70",
            zIndex: 1300,
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton
          onClick={() => handleNavigation("next")}
          disabled={currentIndex === filteredManufacturers.length - 1}
          sx={{
            position: "absolute",
            right: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#016A70",
            zIndex: 1300,
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </>

      {/* Manufacturer Card */}
      <Paper
        sx={{
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          backgroundColor: "#ffffff",
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#016A70", mb: 2 }}>
            {currentManufacturer?.name}
          </Typography>
          <Typography variant="body1" sx={{ color: "#555", mb: 2 }}>
            Status: {currentManufacturer?.status}
          </Typography>
          <Button
            variant="contained"
            onClick={() => handleViewDetails(currentManufacturer.manufacturer_id)}
            sx={{ backgroundColor: "#016A70", color: "#fff" }}
          >
            View Details
          </Button>
        </Box>
      </Paper>

      {/* Details Modal */}
      <Dialog
        open={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        fullWidth
        sx={{
          "& .MuiDialog-container": {
            alignItems: "flex-start",
          },
          "& .MuiDialog-paper": {
            marginTop: "70px",
            marginBottom: "200px",
          },
        }}
      >
        <DialogTitle>Manufacturer Details</DialogTitle>
        <DialogContent>
          {selectedManufacturer && (
            <Box>
              {/* Manufacturer Details with Column Mapping */}
              {Object.entries(selectedManufacturer).map(([key, value]) => {
                if (key === "manufacturer_id" || key === "wallet_address") return null;
                if (key === "rejection_comments" && selectedManufacturer.status !== "rejected") return null;

                // Get the mapped column name
                const columnName = columnNameMapping[key] || key;

                return (
                  <Box key={key} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#016A70" }}>
                      {columnName}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#555" }}>
                      {key === "website_url" ? (
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
                      ) : key === "certification_url" ? (
                        <Button onClick={() => window.open(value, "_blank")} sx={{ color: "#016A70" }}>
                          View Certification
                        </Button>
                      ) : key === "rejection_comments" ? (
                        value.length > 0 ? (
                          <ul>
                            {value.map((comment, index) => (
                              <li key={index}>{comment.comments}</li>
                            ))}
                          </ul>
                        ) : (
                          "No comments"
                        )
                      ) : (
                        value
                      )}
                    </Typography>
                  </Box>
                );
              })}

              {/* Website Authenticity */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", color: "#016A70" }}>
                  Website Authenticity
                </Typography>
                {authenticityScore !== null ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={authenticityScore}
                      sx={{
                        width: "100%",
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: "#e0e0e0",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor:
                            authenticityScore < 35
                              ? "#ff4444"
                              : authenticityScore >= 35 && authenticityScore < 85
                              ? "#ffbb33"
                              : "#00C851",
                        },
                      }}
                    />
                    <Typography variant="body2">{authenticityScore}%</Typography>
                  </Box>
                ) : (
                  "N/A"
                )}
              </Box>

              {/* Accept/Reject Buttons */}
              {selectedManufacturer.status === "pending" && (
                <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
                  <Button
                    variant="contained"
                    onClick={() => handleAccept(selectedManufacturer.manufacturer_id)}
                    sx={{ backgroundColor: "#00C851", color: "#fff" }}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleRejectClick}
                    sx={{ backgroundColor: "#ff4444", color: "#fff" }}
                  >
                    Reject
                  </Button>
                </Box>
              )}

              {/* Reject Comment Box */}
              {showRejectCommentBox && (
                <Box sx={{ mt: 3 }}>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="Rejection Comment (Optional)"
                    fullWidth
                    variant="outlined"
                    value={rejectComment}
                    onChange={(e) => setRejectComment(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    onClick={handleRejectSubmit}
                    sx={{ mt: 2, backgroundColor: "#ff4444", color: "#fff" }}
                  >
                    Submit Rejection
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