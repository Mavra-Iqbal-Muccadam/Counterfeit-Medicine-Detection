"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  IconButton,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Container,
  TextField,
  InputAdornment,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";
import NextImage from "next/image";
import CategoryPage from "../category/[category]/page";






const categories = [
  {
    name: "Injections",
    image: "/orange.jpg", // Replace with high-resolution image
    medicines: [
      { name: "Injection A", price: 150, image: "/injectionA.jpg" },
      { name: "Injection B", price: 200, image: "/injectionB.jpg" },
      { name: "Injection C", price: 250, image: "/injectionC.jpg" },
      { name: "Injection D", price: 300, image: "/injectionD.jpg" },
      { name: "Injection E", price: 350, image: "/injectionE.jpg" },
      { name: "Injection F", price: 400, image: "/injectionF.jpg" },
    ],
  },
  {
    name: "Antibiotics",
    image: "/haath.webp", // Replace with high-resolution image
    medicines: [
      { name: "Antibiotic A", price: 250, image: "/antibioticA.jpg" },
      { name: "Antibiotic B", price: 300, image: "/antibioticB.jpg" },
    ],
  },
  {
    name: "Syrups",
    image: "/bhae.jpg", // Replace with high-resolution image
    medicines: [
      { name: "Syrup A", price: 100, image: "/syrupA.jpg" },
      { name: "Syrup B", price: 150, image: "/syrupB.jpg" },
    ],
  },
  {
    name: "Tablets",
    image: "/tablets.jpg", // Replace with high-resolution image
    medicines: [
      { name: "Tablet A", price: 200, image: "/tabletA.jpg" },
      { name: "Tablet B", price: 250, image: "/tabletB.jpg" },
    ],
  },
];
const famousMedicines = [
  { name: "Panadol", brand: "GSK", category: "Pain Relief", packSize: "20 Tablets", price: "Rs 200", discount: "10% Off", originalPrice: "Rs 250", image: "/panadol.webp" },
  { name: "Disprin", brand: "Bayer", category: "Pain Relief", packSize: "10 Tablets", price: "Rs 150", discount: "5% Off", originalPrice: "Rs 160", image: "/acha.jpg" },
  { name: "Brufen", brand: "Abbott", category: "Anti-inflammatory", packSize: "12 Tablets", price: "Rs 300", discount: "15% Off", originalPrice: "Rs 350", image: "/images/b.jpg" },
  { name: "Augmentin", brand: "GSK", category: "Antibiotic", packSize: "14 Tablets", price: "Rs 500", discount: "20% Off", originalPrice: "Rs 625", image: "/images/p.jpg" },
  { name: "Ventolin", brand: "GSK", category: "Respiratory", packSize: "1 Inhaler", price: "Rs 350", discount: "5% Off", originalPrice: "Rs 370", image: "/images/ajeeb.png" },
  { name: "Neurobion", brand: "Merck", category: "Vitamin Supplement", packSize: "30 Tablets", price: "Rs 400", discount: "10% Off", originalPrice: "Rs 450", image: "/images/a.jpg" },
];

const brands = [
  { name: "Reckitt", logo: "/reckitt.png" },
  { name: "GSK Consumer Healthcare", logo: "/gsk.png" },
  { name: "Getz Pharma", logo: "/pha.png" },
  { name: "Martin Dow Marker", logo: "/mar.png" },
  { name: "Searle", logo: "/se.png" },
  { name: "Hilton", logo: "/hi.jpg" },
  { name: "Mead Johnsons Nutrition", logo: "/e.png" },


];




const MedicineDetailPage = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  
  const brandScrollRef = useRef(null);

  const handleBrandScroll = (direction) => {
    if (brandScrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      brandScrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Auto-slide every 7 seconds
  // Auto-slide every 4 seconds
useEffect(() => {
  let interval;
  if (autoSlide) {
    interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
    }, 4000); // Changed to 4000 milliseconds (4 seconds)
  }
  return () => {
    if (interval) clearInterval(interval); // Clear the interval on unmount or when autoSlide changes
  };
}, [autoSlide, categories.length]);

  // Handle manual navigation
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
    setAutoSlide(false); // Pause auto-slide on manual navigation
    setTimeout(() => setAutoSlide(true), 5000); // Restart auto-slide after 7 seconds
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + categories.length) % categories.length
    );
    setAutoSlide(false); // Pause auto-slide on manual navigation
    setTimeout(() => setAutoSlide(true), 7000); // Restart auto-slide after 7 seconds
  };

  // Handle category click
  const handleCategoryClick = (category) => {
    router.push(`/category/${category.name}`);
    setAutoSlide(false); // Pause auto-slide on category click
    setTimeout(() => setAutoSlide(true), 7000); // Restart auto-slide after 7 seconds
  };

  // Handle search input change
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Container maxWidth={false} disableGutters sx={{ mt: 8 }}>
     
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
        We are currently experiencing technical difficulties with our call center. For assistance, please contact us via WhatsApp at 0317-1719452.
      </Box>

     {/* Main Navbar */}
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
          height: "60px",
          color: "white",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="body1">Home</Typography>
          <Typography variant="body1">Contact Us</Typography>
          <Typography variant="body1">About Us</Typography>
        </Box>
        <TextField
          placeholder="Search Medicines..."
          variant="outlined"
          size="small"
          sx={{
            width: "30%",
            backgroundColor: "white",
            borderRadius: "4px",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#016A70" }} />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <NextImage src="/healthcare.png" alt="Logo" width={50} height={50} priority />
          <Typography variant="h6" sx={{ ml: 1 }}>MediCare</Typography>
        </Box>
      </Box>

      {/* Secondary Navbar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 4,
          py: 2,
          mt: "92px",
          bgcolor: "white",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          position: "sticky",
          top: "92px",
          zIndex: 1400,
          height:"45px",
        }}
      

      >
        <Button variant="text" sx={{ color: "#002F6C", fontWeight: "bold", fontSize: "16px" }} onClick={() => handleCategoryClick(categories[0])}>Injections</Button>
        <Button variant="text" sx={{ color: "#002F6C", fontWeight: "bold", fontSize: "16px" }} onClick={() => handleCategoryClick(categories[1])}>Antibiotic</Button>
        <Button variant="text" sx={{ color: "#002F6C", fontWeight: "bold", fontSize: "16px" }} onClick={() => handleCategoryClick(categories[2])}>Syrups</Button>
        <Button variant="text" sx={{ color: "#002F6C", fontWeight: "bold", fontSize: "16px" }} onClick={() => handleCategoryClick(categories[3])}>Tablets</Button>
        <Button variant="text" sx={{ color: "#002F6C", fontWeight: "bold", fontSize: "16px" }} onClick={() => router.push("#insights")}>Medicine Insights</Button>
        <Button variant="text" sx={{ color: "#002F6C", fontWeight: "bold", fontSize: "16px" }} onClick={() => router.push("#famous")}>Famous medicine</Button>
        <Button variant="text" sx={{ color: "#002F6C", fontWeight: "bold", fontSize: "16px" }} onClick={() => router.push("#sale")}>Sale</Button>
      
      </Box>
    

     
      {/* Carousel for Categories */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          height: "680px", // Fixed height for the carousel
         
        }}
      >
        {/* Left Chevron */}
        <IconButton
          onClick={handlePrev}
          sx={{
            position: "absolute",
            left: 10,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderRadius: "50%",
          }}
        >
          <ChevronLeftIcon />
        </IconButton>

        {/* Right Chevron */}
        <IconButton
          onClick={handleNext}
          sx={{
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 1,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderRadius: "50%",
          }}
        >
          <ChevronRightIcon />
        </IconButton>

        {/* Carousel Slides */}
        <Box
          sx={{
            display: "flex",
            width: `${categories.length * 100}%`,
            height: "100%", // Ensure slides take full height
            transform: `translateX(-${currentIndex * 100}%)`, // Snap to the current index
            transition: "none", // Disable smooth transition
          }}
        >
          {categories.map((category, index) => (
            <Box
              key={index}
              sx={{
                width: "100%",
                flexShrink: 0,
                position: "relative",
                cursor: "pointer",
                height: "100%", // Ensure each slide takes full height
              }}
              onClick={() => handleCategoryClick(category)}
            >
              <CardMedia
                component="img"
                height="100%" // Ensure image takes full height
                image={category.image}
                alt={category.name}
                sx={{
                  width: "1560px",
                  objectFit: "cover", // Ensure image covers the area
                  height: "650px",
                }}
              />
              <Typography
                variant="h4"
                sx={{
                  position: "absolute",
                  bottom: 20,
                  left: 20,
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "70px",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                }}
              >
                {category.name}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Informative Cards Section */}
      <Box id="insights" sx={{ mt: 10, px: 3 }}> {/* Increased margin-top */}
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mb: 5, textAlign: "left" }} // Increased margin-bottom
        >
          Health & Medicine Insights
        </Typography>
        <Grid container spacing={4} justifyContent="center"> {/* Increased gap */}
          {[
            {
              title: "Why Choose Generic Medicines?",
              desc: "Generic medicines are cost-effective and equally effective as branded ones.",
              img: "/lala.png",
              titleStyle: { fontSize: "22px" },
              descStyle: { fontSize: "14px" },
              contentStyle: { left: "150px" }, // Default (Centered)
            },
            {
              title: "Proper Medicine Storage",
              desc: "Store medicines in a cool, dry place, away from sunlight to maintain potency.",
              img: "/storage_medicine.jpg",
              titleStyle: { fontSize: "20px" },
              descStyle: { fontSize: "14px" },
              contentStyle: { textAlign: "left", pl: 2 }, // ✅ Move text slightly left
            },
            {
              title: "How to Take Antibiotics?",
              desc: "Always complete your antibiotic course to prevent antibiotic resistance.",
              img: "/antibiotic_guide.png",
              titleStyle: { fontSize: "21px" },
              descStyle: { fontSize: "15px" },
              contentStyle: {}, // Default (Centered)
            },
            {
              title: "Importance of Vaccination",
              desc: "Vaccines protect against serious diseases and boost immunity.",
              img: "/kiu.png",
              titleStyle: { fontSize: "22px" },
              descStyle: { fontSize: "14px" },
              contentStyle: { left: "150px" }, // ✅ Move text slightly left
            },
          ].map((info, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Card
                sx={{
                  position: "relative",
                  height: "220px", // Increased height
                  overflow: "hidden",
                  borderRadius: "10px",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.08)", // Slight zoom on hover
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={info.img}
                  alt={info.title}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <CardContent
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "90%",
                    color: "black",
                    fontWeight: "bold",
                    padding: "8px",
                    textShadow: "1px 1px 2px rgba(255, 255, 255, 0.6)",
                    fontFamily: "'Poppins', sans-serif",
                    ...(info.contentStyle || {}), // ✅ Apply custom styling conditionally
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold", ...info.titleStyle }}>
                    {info.title}
                  </Typography>
                  <Typography variant="body2" sx={{ ...info.descStyle }}>
                    {info.desc}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
       {/* Most Famous Medicines Section */}
       <Box id="famous" sx={{ mt: 10, position: "relative" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 4, textAlign: "left" }}>
          Most Famous Medicines
        </Typography>

        <Box sx={{ position: "relative" }}>
          {/* Left Scroll Button */}
          <IconButton
            onClick={() => handleScroll("left")}
            sx={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              backgroundColor: "white",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              "&:hover": { backgroundColor: "#E5E7EB" },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>

          {/* Medicine Cards */}
          <Box
            ref={scrollRef}
            sx={{
              display: "flex",
              overflowX: "auto",
              scrollBehavior: "smooth",
              gap: 2,
              paddingBottom: "10px",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {famousMedicines.map((medicine, index) => (
              <Card
                key={index}
                sx={{
                  minWidth: "260px",
                  maxWidth: "260px",
                  borderRadius: "10px",
                  transition: "transform 0.3s ease-in-out",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                  border: "1px solid #E0E0E0",
                  position: "relative",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                {/* Discount Badge */}
                {medicine.discount && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 8,
                      left: 8,
                      backgroundColor: "#4CAF50",
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {medicine.discount}
                  </Box>
                )}

                <CardMedia component="img" image={medicine.image} alt={medicine.name} sx={{ height: "140px", objectFit: "contain", padding: "10px" }} />

                <CardContent sx={{ textAlign: "center" }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "16px" }}>{medicine.name}</Typography>
                  <Typography variant="body2" sx={{ color: "#757575", fontSize: "14px" }}>{medicine.brand}</Typography>
                  <Typography variant="body2" sx={{ color: "#757575", fontSize: "14px" }}>{medicine.category}</Typography>
                  <Typography variant="body2" sx={{ color: "#757575", fontSize: "14px" }}>{medicine.packSize}</Typography>
                  <Typography variant="body2" sx={{ textDecoration: "line-through", color: "#D32F2F", fontSize: "14px" }}>{medicine.originalPrice}</Typography>
                  <Typography variant="body1" sx={{ fontWeight: "bold", color: "#2E7D32", fontSize: "18px" }}>{medicine.price}</Typography>
                  <Button variant="contained" fullWidth sx={{ mt: 2, backgroundColor: "#016A70", "&:hover": { backgroundColor: "#014E50" } }}>ADD TO CART</Button>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* Right Scroll Button */}
          <IconButton
            onClick={() => handleScroll("right")}
            sx={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              backgroundColor: "white",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              "&:hover": { backgroundColor: "#E5E7EB" },
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>

     {/* Top Brands Section */}
     <Box id="brands" sx={{ mt: 10, px: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 5, textAlign: "left" }}>
          Top Brands
        </Typography>
        <Box sx={{ position: "relative" }}>
          <IconButton
            onClick={() => handleBrandScroll("left")}
            sx={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              backgroundColor: "white",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              "&:hover": { backgroundColor: "#E5E7EB" },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>

          <Box
            ref={brandScrollRef}
            sx={{
              display: "flex",
              overflowX: "auto",
              scrollBehavior: "smooth",
              gap: 2,
              paddingBottom: "10px",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {brands.map((brand, index) => (
              <Card
                key={index}
                sx={{
                  minWidth: "180px",
                  maxWidth: "180px",
                  height: "120px",
                  borderRadius: "12px",
                  transition: "transform 0.3s ease-in-out",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
                  border: "1px solid #E0E0E0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  "&:hover": { transform: "scale(1.05)" },
                  padding: "10px",
                  backgroundColor: "white",
                }}
              >
                <CardMedia
                  component="img"
                  image={brand.logo}
                  alt={brand.name}
                  sx={{
                    width: "80px",
                    height: "50px",
                    objectFit: "contain",
                  }}
                />
                <CardContent sx={{ padding: "5px 0 0 0" }}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: "bold", fontSize: "14px" }}
                  >
                    {brand.name}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          <IconButton
            onClick={() => handleBrandScroll("right")}
            sx={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              backgroundColor: "white",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              "&:hover": { backgroundColor: "#E5E7EB" },
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>
 {/* Sale Circles */}
 <Box id="sale" sx={{ mt: 10, textAlign: "center", px: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 5 ,textAlign:"left"}}>
          Sale
        </Typography>
        <Grid container spacing={6} justifyContent="center">
          {[
            {
              id: 1,
              name: "Injections",
              image: "/yellow.jpg", // Replace with actual image
              offer: "Up to 20% Off",
            },
            {
              id: 2,
              name: "Antibiotics",
              image: "/ant.webp", // Replace with actual image
              offer: "Up to 15% Off",
            },
            {
              id: 3,
              name: "Syrups",
              image: "/syrup.jpg", // Replace with actual image
              offer: "Up to 25% Off",
            },
            {
              id: 4,
              name: "Tablets",
              image: "/tablet.jpg", // Replace with actual image
              offer: "Up to 30% Off",
            },
          ].map((category) => (
            <Grid item key={category.id} xs={12} sm={6} md={3}>
              <Box
                sx={{
                  position: "relative",
                  width: "220px", // Increased size
                  height: "220px", // Increased size
                  borderRadius: "50%",
                  overflow: "hidden",
                  cursor: "pointer",
                  margin: "0 auto", // Center the circle
                  "&:hover .overlay": {
                    opacity: 1, // Show overlay on hover
                  },
                }}
              >
                {/* Category Image */}
                <CardMedia
                  component="img"
                  image={category.image}
                  alt={category.name}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                {/* Overlay with Offer Text */}
                <Box
                  className="overlay"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent black
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0, // Hidden by default
                    transition: "opacity 0.3s ease-in-out",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ color: "white", fontWeight: "bold", textAlign: "center" }}
                  >
                    {category.offer}
                  </Typography>
                </Box>

                {/* Category Name */}
                <Typography
                  variant="h6"
                  sx={{
                    position: "absolute",
                    bottom: 10,
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: "white",
                    fontWeight: "bold",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  {category.name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>



      {/* Footer */}
<Box
  sx={{
    mt: 10, // Add margin-top to separate from the previous section
    py: 4, // Add padding on top and bottom
    bgcolor: "#016A70",// Match the navbar color
    color: "white",
    textAlign: "center",
  }}
>
  <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
    MediCare
  </Typography>
  <Typography variant="body2" sx={{ mb: 1 }}>
    Your trusted partner in health and wellness.
  </Typography>
  <Typography variant="body2">
    &copy; {new Date().getFullYear()} MediCare. All rights reserved.
  </Typography>
</Box>

    </Container>


  );
  
};

export default MedicineDetailPage;
