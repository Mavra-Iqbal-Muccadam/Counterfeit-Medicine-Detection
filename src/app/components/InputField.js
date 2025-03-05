"use client";
import React from 'react';
import TextField from '@mui/material/TextField';

const InputField = ({ label, type = "text", value, onChange }) => {
  return (
    <TextField
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      variant="outlined"
      fullWidth
    />
  );
};

export default InputField;
