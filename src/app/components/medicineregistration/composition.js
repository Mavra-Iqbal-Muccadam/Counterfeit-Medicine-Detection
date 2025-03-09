import React, { useState } from "react";
import { TextField, Box, IconButton, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

export default function Composition() {
  const [compositions, setCompositions] = useState([""]); // Start with one input
  const [error, setError] = useState(""); // State for error message

  const handleAddField = () => {
    if (compositions.length < 10) {
      setCompositions([...compositions, ""]); // Add new empty field
      setError(""); // Clear error message if any
    } else {
      setError("❌ You cannot add more than 10 options."); // Display error message
    }
  };

  const handleRemoveField = (index) => {
    const updatedCompositions = compositions.filter((_, i) => i !== index);
    setCompositions(updatedCompositions);
    setError(""); // Clear error when a field is removed
  };

  const handleChange = (index, value) => {
    const updatedCompositions = compositions.map((item, i) =>
      i === index ? value : item
    );
    setCompositions(updatedCompositions);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {compositions.map((composition, index) => (
        <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TextField
            label={`Composition ${index + 1}`}
            value={composition}
            onChange={(e) => handleChange(index, e.target.value)}
            fullWidth
          />
          {compositions.length > 1 && (
            <IconButton color="error" onClick={() => handleRemoveField(index)}>
              <RemoveCircleIcon />
            </IconButton>
          )}
          {index === compositions.length - 1 && compositions.length < 10 && (
            <IconButton color="primary" onClick={handleAddField}>
              <AddCircleIcon />
            </IconButton>
          )}
        </Box>
      ))}
      
      {/* Error Message */}
      {error && (
        <Typography color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}
