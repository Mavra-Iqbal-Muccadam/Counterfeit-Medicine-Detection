"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Container,
  Button,
} from "@mui/material";

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

const CategoryPage = () => {
  const { category } = useParams();

  const selectedCategory = categories.find((cat) => cat.name === category);

  if (!selectedCategory) {
    return <Typography>Category not found</Typography>;
  }

  return (
    <Container maxWidth={false} disableGutters sx={{ mt: 8 }}>
      <Box sx={{ mt: 5, textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3 }}>
          {selectedCategory.name}
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {selectedCategory.medicines.map((medicine, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={medicine.image}
                  alt={medicine.name}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {medicine.name}
                  </Typography>
                  <Typography variant="body1">
                    Price: Rs {medicine.price}
                  </Typography>
                  <Button variant="contained" color="primary" sx={{ mt: 1 }}>
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default CategoryPage;
