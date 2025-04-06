"use client";
import React, { useEffect, useState } from 'react';
import { 
  Box, Typography, Container, Card, CardContent, CardMedia, 
  CircularProgress, Button, IconButton, Grid, Divider, Chip 
} from '@mui/material';
import Allnavbar from '../../../sections/Allnavbar';
import { FooterSection } from '../../../sections/FooterSection';
import { fetchAllMedicines } from '../../../../../../lib/saleMedicineDb';
import { useSearchParams } from 'next/navigation';

export default function CartPage() {
  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fixedQuantity, setFixedQuantity] = useState(1);
  const [fixedPrice, setFixedPrice] = useState(0);
  const searchParams = useSearchParams();

  useEffect(() => {
    const medicineId = searchParams.get('medicineId');
    const initialQuantity = parseInt(searchParams.get('quantity')) || 1;
    const price = parseFloat(searchParams.get('price')) || 0;

    const loadMedicine = async () => {
      try {
        const medicines = await fetchAllMedicines();
        const foundMedicine = medicines.find(m => m.medicine_id === medicineId);
        if (!foundMedicine) throw new Error('Medicine not found');
        
        setMedicine({
          ...foundMedicine,
          price: price > 0 ? price : foundMedicine.price
        });
        
        setFixedQuantity(initialQuantity);
        setFixedPrice(price > 0 ? price : foundMedicine.price);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (medicineId) {
      loadMedicine();
    } else {
      setError('No medicine selected');
      setLoading(false);
    }
  }, [searchParams]);

  // Disable quantity changes if you want to keep it fixed
  const handleIncrement = () => {
    if (medicine && quantity < medicine.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return (
      <>
        <Allnavbar />
        <Box sx={{ paddingTop: '170px', textAlign: 'center', minHeight: '50vh' }}>
          <CircularProgress size={60} thickness={4} sx={{ color: '#002F6C', mb: 3 }} />
        </Box>
        <FooterSection />
      </>
    );
  }

  if (error || !medicine) {
    return (
      <>
        <Allnavbar />
        <Box sx={{ paddingTop: '170px', textAlign: 'center', minHeight: '50vh' }}>
          <Typography variant="h5" color="error">
            {error || 'Medicine not found'}
          </Typography>
        </Box>
        <FooterSection />
      </>
    );
  }

  return (
    <>
      <Allnavbar />
      <Box sx={{ paddingTop: '170px', paddingBottom: 6, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#002F6C' }}>
            Your Cart
          </Typography>
          
          <Card sx={{ boxShadow: 2, mb: 3 }}>
            <Grid container>
              <Grid item xs={12} md={4}>
                {medicine.image_url && (
                  <CardMedia
                    component="img"
                    sx={{ 
                      objectFit: 'contain', 
                      p: 1.5,
                      width: '100%',
                      height: 280,
                      maxHeight: 280
                    }}
                    image={medicine.image_url}
                    alt={medicine.name}
                  />
                )}
              </Grid>

              <Grid item xs={12} md={8}>
                <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#002F6C' }}>
                    {medicine.name}
                  </Typography>
                  
                  {medicine.types && medicine.types.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      {medicine.types.map((type, index) => (
                        <Chip 
                          key={index}
                          label={type}
                          size="small"
                          sx={{ 
                            mr: 1,
                            mb: 1,
                            backgroundColor: '#e3f2fd',
                            color: '#1976d2',
                            fontWeight: 'bold'
                          }}
                        />
                      ))}
                    </Box>
                  )}
                  
                  {/* Display fixed quantity without increment/decrement buttons */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle1" sx={{ mr: 0.5, fontWeight: 'bold' }}>
                      Quantity:
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      mx:0, 
                      minWidth: 24, 
                      textAlign: 'center',
                      p: 1,
                      borderRadius: 1
                    }}>
                      {fixedQuantity}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    p: 1.5, 
                    backgroundColor: '#e3f2fd', 
                    borderRadius: 1
                  }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#002F6C' }}>
                      Total: Rs. {(fixedPrice * fixedQuantity).toFixed(2)}
                    </Typography>
                    <Button 
                      variant="contained" 
                      size="medium"
                      sx={{ 
                        backgroundColor: '#002F6C',
                        '&:hover': { backgroundColor: '#014E50' },
                        px: 3,
                        py: 1
                      }}
                    >
                      Proceed to Checkout
                    </Button>
                  </Box>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Container>
      </Box>
      <FooterSection />
    </>
  );
}