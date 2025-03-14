import React, { useState } from "react";
import { Checkbox, FormGroup, FormControlLabel, Box } from "@mui/material";

const dosageOptions = [
  "Tablet", "Capsule", "Syrup", "Injection", "Cream", 
  "Gel"
];

export default function Checkboxes({ onChange }) {
  const [selectedForms, setSelectedForms] = useState([]);

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedForms((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
    onChange && onChange(selectedForms); // Pass data to parent form if needed
  };

  return (
    <Box>
      <FormGroup>
        {dosageOptions.map((option, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={selectedForms.includes(option)}
                onChange={handleChange}
                value={option}
              />
            }
            label={option}
          />
        ))}
      </FormGroup>
    </Box>
  );
}
