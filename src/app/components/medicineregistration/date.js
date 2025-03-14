import * as React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export default function ManufactureDateInput({ label, value, onChange }) {
  return (
    <Box sx={{ m: 1, width: "25ch" }}>
      <TextField
        label={label} // Dynamic Label
        type="date" // Date input type
        value={value} // Controlled value
        onChange={onChange} // Handle changes
        InputLabelProps={{
          shrink: true, // Ensures label doesn't overlap with the date
        }}
        fullWidth
      />
    </Box>
  );
}
