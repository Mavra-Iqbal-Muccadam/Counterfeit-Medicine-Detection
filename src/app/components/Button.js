"use client";
import React from 'react';
import Button from '@mui/material/Button';

const CustomButton = ({ text, type = "button", onClick }) => {
  return (
    <Button variant="contained" type={type} onClick={onClick}>
      {text}
    </Button>
  );
};

export default CustomButton;
