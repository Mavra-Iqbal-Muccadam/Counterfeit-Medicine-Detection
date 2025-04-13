
// "use client";
// import React from 'react';
// import { 
//   Button as MuiButton, 
//   styled 
// } from '@mui/material';

// // Create a styled version of the MUI Button component with custom styling
// const StyledButton = styled(MuiButton, {
//   shouldForwardProp: (prop) => prop !== 'rounded' && prop !== 'isLarge',
// })(({ theme, rounded, isLarge }) => ({
//   // Base styles that apply to all variants
//   textTransform: 'none',
//   fontWeight: 600,
//   transition: 'all 0.3s ease',
  
//   // Rounded styles
//   borderRadius: rounded ? '50px' : '8px',
  
//   // Size styles
//   ...(isLarge && {
//     padding: '12px 24px',
//     fontSize: '1rem',
//     lineHeight: 1.5,
//   }),
  
//   // Contained button variant styles for primary (navy blue)
//   '&.MuiButton-containedPrimary': {
//     backgroundColor: '#002F6C',
//     color: '#ffffff',
//     boxShadow: '0px 2px 4px rgba(0, 47, 108, 0.2)',
//     '&:hover': {
//       backgroundColor: '#00234F',
//       boxShadow: '0px 4px 8px rgba(0, 47, 108, 0.3)',
//     },
//     '&:active': {
//       backgroundColor: '#001A3C',
//       boxShadow: '0px 1px 2px rgba(0, 47, 108, 0.2)',
//     },
//   },
  
//   // Contained button variant styles for secondary (red)
//   '&.MuiButton-containedSecondary': {
//     backgroundColor: '#D32F2F',
//     color: '#ffffff',
//     boxShadow: '0px 2px 4px rgba(211, 47, 47, 0.2)',
//     '&:hover': {
//       backgroundColor: '#B71C1C',
//       boxShadow: '0px 4px 8px rgba(211, 47, 47, 0.3)',
//     },
//     '&:active': {
//       backgroundColor: '#C62828',
//       boxShadow: '0px 1px 2px rgba(211, 47, 47, 0.2)',
//     },
//   },
  
//   // Outlined button variant styles for primary (navy blue)
//   '&.MuiButton-outlinedPrimary': {
//     color: '#002F6C',
//     borderColor: '#002F6C',
//     borderWidth: '2px',
//     '&:hover': {
//       backgroundColor: 'rgba(0, 47, 108, 0.04)',
//       borderWidth: '2px',
//     },
//   },
  
//   // Outlined button variant styles for secondary (red)
//   '&.MuiButton-outlinedSecondary': {
//     color: '#D32F2F',
//     borderColor: '#D32F2F',
//     borderWidth: '2px',
//     '&:hover': {
//       backgroundColor: 'rgba(211, 47, 47, 0.04)',
//       borderWidth: '2px',
//     },
//   },
  
//   // Text button variant styles for primary (navy blue)
//   '&.MuiButton-textPrimary': {
//     color: '#002F6C',
//     '&:hover': {
//       backgroundColor: 'rgba(0, 47, 108, 0.04)',
//     },
//   },
  
//   // Text button variant styles for secondary (red)
//   '&.MuiButton-textSecondary': {
//     color: '#D32F2F',
//     '&:hover': {
//       backgroundColor: 'rgba(211, 47, 47, 0.04)',
//     },
//   },
  
//   // Disabled styles
//   '&.Mui-disabled': {
//     backgroundColor: theme.palette.mode === 'light' ? '#E0E0E0' : '#424242',
//     color: theme.palette.mode === 'light' ? '#9E9E9E' : '#757575',
//     boxShadow: 'none',
//   },
// }));

// export const Button = ({
//   children,
//   rounded = false,
//   isLarge = false,
//   variant = 'contained',
//   color = 'primary',
//   size = 'medium',
//   sx = {},
//   ...rest
// }) => {
//   return (
//     <StyledButton
//       variant={variant}
//       color={color}
//       size={size}
//       rounded={rounded}
//       isLarge={isLarge}
//       sx={sx}
//       {...rest}
//     >
//       {children}
//     </StyledButton>
//   );
// };

// export default Button;