// SignupPage.js
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, TextField, Button, Typography } from '@mui/material';
import styled, { createGlobalStyle } from 'styled-components';

// Global style
const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    font-family: 'Arial', sans-serif;
    color: #fff; /* Set default text color to white */
  }
  @font-face {
    font-family: 'Jelligun';
    src: url('/Jelligun-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
  html {
    padding: 0;
    margin: 0;
  }
  h5 {
    font-family: 'Jelligun', sans-serif;
    color: #fff; /* Ensure the h5 text is white */
  }
`;

// Styled components
const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
  background-color: #e0f7f3;
  justify-content: center;
  align-items: center;
  position: relative; /* For positioning logo */
`;

const LogoContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 100px;
  height: auto;
`;

const FormContainer = styled(Box)`
  width: 80vw;
  max-width: 500px;
  background: #2b6777;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ButtonStyle = {
  backgroundColor: '#1f4d52',
  color: 'white',
  marginTop: 2,
  padding: '12px',
  fontSize: '16px',
  '&:hover': {
    backgroundColor: '#155a63',
    color: 'white', // Ensure text color is white on hover
  },
};

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('formData', JSON.stringify(formData));
    router.push('/Home');
  };

  return (
    <PageContainer>
      <GlobalStyle />
      
      {/* Logo Container */}
      <LogoContainer>
        <img src="/Logo15.png" alt="Logo" width="100" height="auto"marginTop="-1" />
      </LogoContainer>

      <FormContainer>
        <Typography
          variant="h5"
          align="center"
          sx={{
            fontFamily: 'Jelligun, sans-serif',
            fontSize: '6rem',
            marginBottom: 2,
            fontWeight: "bold",
            color: '#fff', // Ensuring the page heading text is white
          }}
        >
          Details
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            sx={{
              '& .MuiInputLabel-root': {
                color: '#fff', // White text for label
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc', // Border color
                },
                '&:hover fieldset': {
                  borderColor: '#fff', // Border color on hover
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1f4d52', // Focused border color
                },
                '& input': {
                  color: '#fff', // White text inside the input fields
                },
              },
            }}
          />

          <TextField
            label="Age"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            sx={{
              '& .MuiInputLabel-root': {
                color: '#fff',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#fff',
                },
                '&:hover fieldset': {
                  borderColor: '#fff',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#fff',
                },
                '& input': {
                  color: '#fff', // White input text
                },
              },
            }}
          />

          <TextField
            label="Height (cm)"
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            sx={{
              '& .MuiInputLabel-root': {
                color: '#fff',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#fff',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1f4d52',
                },
                '& input': {
                  color: '#fff',
                },
              },
            }}
          />

          <TextField
            label="Weight (kg)"
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
            sx={{
              '& .MuiInputLabel-root': {
                color: '#fff',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ccc',
                },
                '&:hover fieldset': {
                  borderColor: '#fff',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1f4d52',
                },
                '& input': {
                  color: '#fff',
                },
              },
            }}
          />

          <Button type="submit" variant="contained" fullWidth sx={ButtonStyle}>
            Submit
          </Button>
        </form>
      </FormContainer>
    </PageContainer>
  );
};

export default SignupPage;
