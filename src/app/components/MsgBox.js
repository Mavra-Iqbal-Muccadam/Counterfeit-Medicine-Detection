// MsgBox.js
"use client";
import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Button from '@mui/material/Button';
// import { useNavigate } from 'react-router-dom'; // For routing functionality
import { useRouter } from 'next/navigation';

// Alert component for styling
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Success Message Box Component
export const SuccessMsgBox = ({ open, onClose, message, routeButton }) => {
    const router = useRouter();

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000} // Auto-close after 6 seconds
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity="success"
        sx={{ width: '100%' }}
        action={
          routeButton ? (
            <Button
              color="inherit"
              size="small"
              onClick={() => {
                onClose(); // Close the Snackbar
                router.push(routeButton.path);
            }}
            >
              {routeButton.label}
            </Button>
          ) : (
            <Button color="inherit" size="small" onClick={onClose}>
              OK
            </Button>
          )
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

// Error Message Box Component (unchanged)
export const ErrorMsgBox = ({ open, onClose, message }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000} // Auto-close after 6 seconds
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity="error"
        sx={{ width: '100%' }}
        action={
          <Button color="inherit" size="small" onClick={onClose}>
            OK
          </Button>
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
};