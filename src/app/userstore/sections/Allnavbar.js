"use client";

import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  Badge,
  Link,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import NextLink from "next/link";
import { useCart } from "../../../app/context/CartContext.js"; // Import the useCart hook

const Allnavbar = () => {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);
  const { cartCount, cart, totalPrice } = useCart(); // Get the cart count from context
  const [isCartOpen, setIsCartOpen] = useState(false); // State for cart side menu

  const categories = [
    { name: "Injections" },
    { name: "Antibiotic" },
    { name: "Syrups" },
    { name: "Tablets" },
  ];

  const handleCategoryClick = (category) => {
    router.push(`/category/${category.name}`);
    setDrawerOpen(false);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const toggleCategories = () => {
    setOpenCategories(!openCategories);
  };

  const handleCartClick = () => {
    setIsCartOpen(true); // Open cart side menu
  };

  const handleCloseCart = () => {
    setIsCartOpen(false); // Close cart side menu
  };

  // Basic CartSideMenu component
  const CartSideMenu = () => {
    return (
      <Drawer
        anchor="right"
        open={isCartOpen}
        onClose={handleCloseCart}
        sx={{
          '& .MuiDrawer-paper': {
            width: 300,
            padding: 2,
          },
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Your Cart</Typography>
          <IconButton onClick={handleCloseCart}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {cart && cart.length > 0 ? (
            cart.map((item) => (
              <ListItem key={item.id}>
                <ListItemText
                  primary={item.name}
                  secondary={`Quantity: ${item.quantity} - Price: PKR ${item.price * item.quantity}`}
                />
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No items in cart" />
            </ListItem>
          )}
        </List>
        <Box mt={2}>
          <Typography variant="subtitle1">Total: PKR {totalPrice}</Typography>
          <Button variant="contained" color="primary" fullWidth onClick={() => {router.push('/userstore/userstorepages/allmedicines')}}>
            Add More Medicines
          </Button>
        </Box>
      </Drawer>
    );
  };

  return (
    <>
      {/* Top red banner */}
      <Box
        sx={{
          width: "100%",
          bgcolor: "#D32F2F",
          color: "white",
          textAlign: "center",
          padding: "8px 0",
          fontSize: "14px",
          fontWeight: "bold",
          position: "fixed",
          top: 0,
          zIndex: 1600,
        }}
      >
        We are currently experiencing technical difficulties with our call center. For assistance,
        please contact us via WhatsApp at 0317-1719452.
      </Box>

      {/* Main blue navbar */}
      <Box
        sx={{
          width: "100%",
          bgcolor: "#002F6C",
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "fixed",
          top: "32px",
          zIndex: 1500,
          height: "80px",
          color: "white",
        }}
      >
        {/* Left side - Menu and Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Link href="/" component={NextLink} sx={{ display: 'flex', marginTop: 9 }}>
            <Image src="/logob.png" alt="Logo" width={180} height={100} />
          </Link>
        </Box>

        {/* Right side - Sign In and Cart */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Link 
            href="/userlogin" 
            component={NextLink}
            color="inherit"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            <PersonIcon fontSize="small" />
            <Typography>Sign In / Sign Up</Typography>
          </Link>
          
          <IconButton color="inherit" onClick={handleCartClick}>
            {cartCount > 0 ? (
              <Badge badgeContent={cartCount} color="error">
                <ShoppingCartIcon />
              </Badge>
            ) : (
              <ShoppingCartIcon />
            )}
          </IconButton>
        </Box>
      </Box>

      {/* Categories bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 4,
          py: 2,
          bgcolor: "white",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          position: "sticky",
          top: 110,
          zIndex: 1400,
          height: "45px",
        }}
      >
        {categories.map((category, index) => (
          <Link
            key={index}
            component={NextLink}
            href={`/category/${category.name}`}
            color="#002F6C"
            sx={{
              fontWeight: "bold",
              fontSize: "16px",
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline'
              }
            }}
          >
            {category.name}
          </Link>
        ))}
        <Link
          component={NextLink}
          href="#insights"
          color="#002F6C"
          sx={{
            fontWeight: "bold",
            fontSize: "16px",
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline'
            }
          }}
        >
          Medicine Insights
        </Link>
        <Link
          component={NextLink}
          href="#famous"
          color="#002F6C"
          sx={{
            fontWeight: "bold",
            fontSize: "16px",
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline'
            }
          }}
        >
          Famous medicine
        </Link>
        <Link
          component={NextLink}
          href="#sale"
          color="#002F6C"
          sx={{
            fontWeight: "bold",
            fontSize: "16px",
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline'
            }
          }}
        >
          Sale
        </Link>
      </Box>

      <CartSideMenu /> {/* Include the CartSideMenu component */}
    </>
  );
};

export default Allnavbar;
