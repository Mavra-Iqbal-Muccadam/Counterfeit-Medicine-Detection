"use client";
import React from 'react';
import ManufacturerForm from '../components/ManufacturerForm';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const ManufacturerPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Typography variant="h4" component="h1" sx={{ fontSize: '2rem', marginBottom: '2rem' }}>
        Manufacturer Registration
      </Typography>
      <ManufacturerForm />
    </Box>
  );
};

export default ManufacturerPage;
