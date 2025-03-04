"use client";
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const ManufacturerForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phoneNumber: '',
    address: '',
    certificate: null,
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        mx: 'auto',
        bgcolor: '#e0f7fa',
        padding: 3,
        borderRadius: 4,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
      }}
    >
      <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2, color: '#007bff' }}>
        Manufacturer Registration
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Contact Name"
          name="contactName"
          value={formData.contactName}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button variant="contained" component="label">
          Upload Certificate
          <input
            type="file"
            name="certificate"
            onChange={handleChange}
            hidden
          />
        </Button>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Checkbox
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
          />
          <Typography>I agree to the terms and conditions</Typography>
        </Box>
        <Button type="submit" variant="contained" sx={{ mt: 3 }}>
          Register
        </Button>
      </form>
    </Box>
  );
};

export default ManufacturerForm;
