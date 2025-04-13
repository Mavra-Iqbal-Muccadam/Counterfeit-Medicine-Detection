"use client";

import React from "react";
import {
  Box,
  IconButton,
  Typography,
  Badge,
  Link,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import Image from "next/image";
import { usePathname } from "next/navigation";
import NextLink from "next/link";

const Allnavbar = () => {
  const pathname = usePathname();
  const isUserStorePage = pathname === "/userstore";

  const categories = [
    { name: "Injection" },
    { name: "Antibiotic" },
    { name: "Syrup" },
    { name: "Capsule" },
  ];

  const getLink = (section) => {
    if (pathname === "/userstore") {
      return `#${section}`;
    }
    return `/userstore/userstorepages/${section}`;
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
        {/* Left side - Logo */}
<Box sx={{ display: "flex", alignItems: "center" }}>
  <Link href="/userstore" passHref>
    <Box sx={{ mt: 9 }}> {/* Adjust mt value as needed (e.g., 1–5) */}
      <Image 
        src="/logob.png" 
        alt="Logo" 
        width={180} 
        height={200} 
        style={{ objectFit: 'contain' }}
      />
    </Box>
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
          
          <Link 
            href="/cart" 
            component={NextLink}
            color="inherit"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Badge badgeContent={0} color="error">
              <ShoppingCartIcon />
            </Badge>
          </Link>
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
            href={`/userstore/userstorepages/${category.name}`}
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
          href={"/userstore/userstorepages/insights"}
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

        {isUserStorePage ? (
          <>
            <Link
              component={NextLink}
              href={getLink("famous")}
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
              href={getLink("sale")}
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
          </>
        ) : (
          <Link
            component={NextLink}
            href={"/userstore/userstorepages/famous"}
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
        )}
      </Box>
    </>
  );
};

export default Allnavbar;