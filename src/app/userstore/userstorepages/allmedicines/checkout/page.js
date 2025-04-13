

"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchAllMedicines } from '../../../../../../lib/saleMedicineDb';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Grid, 
  Button,
  useMediaQuery,
  useTheme,
  AppBar,
  Toolbar,
  Radio, 
  RadioGroup, 
  FormControlLabel,
  TextField, 
  Checkbox, 
  Divider,
  InputAdornment
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import CheckIcon from '@mui/icons-material/Check';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaymentsIcon from '@mui/icons-material/Payments';
import { useCart } from '../../../../../app/context/CartContext'; // Import the useCart hook

// Cart item interface for type safety
const CartItem = {
  medicine_id: '',
  name: '',
  image_url: '',
  price: 0,
  quantity: 0,
  description: ''
};

// Custom styling for step icons
const CustomStepIcon = styled('div')(
  ({ theme, active, completed }) => ({
    width: 32,
    height: 32,
    borderRadius: '50%',
    backgroundColor: completed 
      ? '#4CAF50' 
      : active 
        ? '#002F6C' 
        : '#e0e0e0',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 500,
  }),
);

// Custom styling for step connector
const StepConnector = styled('div')(
  ({ theme, active }) => ({
    height: 2,
    backgroundColor: active ? '#002F6C' : '#e0e0e0',
    flex: 1,
    margin: '0 8px',
  }),
);

// Custom step icon component
function CustomIcon(props) {
  const { active, completed, icon } = props;

  return (
    <CustomStepIcon active={active} completed={completed}>
      {completed ? <CheckIcon fontSize="small" /> : icon}
    </CustomStepIcon>
  );
}

// Checkout Stepper Component
const CheckoutStepper = ({ activeStep }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const steps = ['Cart', 'Shipping', 'Payment', 'Confirmation'];

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'center',
      mb: { xs: 3, md: 6 },
      px: 2,
      maxWidth: '800px',
      mx: 'auto',
    }}>
      {steps.map((label, index) => (
        <React.Fragment key={label}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center'
          }}>
            <CustomIcon 
              icon={index + 1} 
              active={index <= activeStep} 
              completed={index < activeStep} 
            />
            <Typography 
              variant="caption" 
              sx={{ 
                mt: 1, 
                fontWeight: index <= activeStep ? 500 : 400,
                color: index <= activeStep ? '#002F6C' : 'text.secondary',
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
              }}
            >
              {label}
            </Typography>
          </Box>
          
          {index < steps.length - 1 && (
            <StepConnector active={index < activeStep} />
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};

// Shipping Form Component
const ShippingForm = ({ formData, onSubmit }) => {
  const [formState, setFormState] = useState({
    firstName: formData.firstName || '',
    lastName: formData.lastName || '',
    email: formData.email || '',
    phone: formData.phone || '',
    address: formData.address || '',
    city: formData.city || '',
    state: formData.state || '',
    postalCode: formData.postalCode || '',
    deliveryInstructions: formData.deliveryInstructions || '',
    hasPrescription: formData.hasPrescription !== undefined ? formData.hasPrescription : true
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormState({
      ...formState,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formState.firstName) newErrors.firstName = 'First name is required';
    if (!formState.lastName) newErrors.lastName = 'Last name is required';
    if (!formState.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formState.phone) newErrors.phone = 'Phone number is required';
    else if (formState.phone.length < 10) {
      newErrors.phone = 'Phone number should be at least 10 digits';
    }
    
    if (!formState.address) newErrors.address = 'Address is required';
    if (!formState.city) newErrors.city = 'City is required';
    if (!formState.state) newErrors.state = 'State/Province is required';
    if (!formState.postalCode) newErrors.postalCode = 'Postal code is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formState);
    }
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#002F6C', mb: 2 }}>
        Shipping Information
      </Typography>
      
      <form id="shipping-form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="firstName"
              label="First Name *"
              variant="outlined"
              fullWidth
              value={formState.firstName}
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              name="lastName"
              label="Last Name *"
              variant="outlined"
              fullWidth
              value={formState.lastName}
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              name="email"
              label="Email Address *"
              type="email"
              variant="outlined"
              fullWidth
              value={formState.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              name="phone"
              label="Phone Number *"
              variant="outlined"
              fullWidth
              value={formState.phone}
              onChange={handleChange}
              error={!!errors.phone}
              helperText={errors.phone}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              name="address"
              label="Address *"
              variant="outlined"
              fullWidth
              value={formState.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <TextField
              name="city"
              label="City *"
              variant="outlined"
              fullWidth
              value={formState.city}
              onChange={handleChange}
              error={!!errors.city}
              helperText={errors.city}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <TextField
              name="state"
              label="State/Province *"
              variant="outlined"
              fullWidth
              value={formState.state}
              onChange={handleChange}
              error={!!errors.state}
              helperText={errors.state}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <TextField
              name="postalCode"
              label="Postal Code *"
              variant="outlined"
              fullWidth
              value={formState.postalCode}
              onChange={handleChange}
              error={!!errors.postalCode}
              helperText={errors.postalCode}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              name="deliveryInstructions"
              label="Delivery Instructions (Optional)"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              value={formState.deliveryInstructions}
              onChange={handleChange}
              placeholder="Special instructions for delivery (e.g., gate code, landmark)"
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
          </Grid>
          
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox 
                  name="hasPrescription"
                  checked={formState.hasPrescription}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label={
                <Typography variant="body2">
                  I confirm that I have a valid prescription for all prescription medications in my order.
                </Typography>
              }
            />
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

// Payment Method Selector Component
const PaymentMethodSelector = ({ selectedMethod, onSelect, disabled = false }) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: disabled ? 'text.secondary' : '#002F6C', mb: 2 }}>
        Payment Method
      </Typography>
      
      {disabled && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Complete shipping information to proceed to payment
        </Typography>
      )}
      
      <RadioGroup
        value={selectedMethod}
        onChange={(e) => onSelect(e.target.value)}
      >
        <Box 
          sx={{ 
            mb: 2,
            border: '2px solid',
            borderColor: selectedMethod === 'creditCard' ? '#002F6C' : 'transparent',
            bgcolor: selectedMethod === 'creditCard' ? 'rgba(0, 47, 108, 0.05)' : 'transparent',
            borderRadius: 1,
            transition: 'all 0.2s'
          }}
        >
          <FormControlLabel
            value="creditCard"
            control={<Radio color="primary" />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box 
                  sx={{ 
                    mr: 2, 
                    bgcolor: 'rgba(25, 118, 210, 0.1)', 
                    p: 1, 
                    borderRadius: '50%', 
                    display: 'flex' 
                  }}
                >
                  <CreditCardIcon sx={{ color: '#1976d2' }} />
                </Box>
                <Typography variant="body1">Credit/Debit Card</Typography>
              </Box>
            }
            sx={{ 
              py: 1.5, 
              px: 1, 
              width: '100%', 
              m: 0,
              '& .MuiFormControlLabel-label': { 
                width: '100%'
              }
            }}
          />
        </Box>
        
        <Box 
          sx={{ 
            mb: 2,
            border: '2px solid',
            borderColor: selectedMethod === 'bankTransfer' ? '#002F6C' : 'transparent',
            bgcolor: selectedMethod === 'bankTransfer' ? 'rgba(0, 47, 108, 0.05)' : 'transparent',
            borderRadius: 1,
            transition: 'all 0.2s'
          }}
        >
          <FormControlLabel
            value="bankTransfer"
            control={<Radio color="primary" />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box 
                  sx={{ 
                    mr: 2, 
                    bgcolor: 'rgba(245, 124, 0, 0.1)', 
                    p: 1, 
                    borderRadius: '50%', 
                    display: 'flex' 
                  }}
                >
                  <AccountBalanceIcon sx={{ color: '#f57c00' }} />
                </Box>
                <Typography variant="body1">Bank Transfer</Typography>
              </Box>
            }
            sx={{ 
              py: 1.5, 
              px: 1, 
              width: '100%', 
              m: 0,
              '& .MuiFormControlLabel-label': { 
                width: '100%'
              }
            }}
          />
        </Box>
        
        <Box 
          sx={{ 
            mb: 2,
            border: '2px solid',
            borderColor: selectedMethod === 'cashOnDelivery' ? '#002F6C' : 'transparent',
            bgcolor: selectedMethod === 'cashOnDelivery' ? 'rgba(0, 47, 108, 0.05)' : 'transparent',
            borderRadius: 1,
            transition: 'all 0.2s'
          }}
        >
          <FormControlLabel
            value="cashOnDelivery"
            control={<Radio color="primary" />}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box 
                  sx={{ 
                    mr: 2, 
                    bgcolor: 'rgba(76, 175, 80, 0.1)', 
                    p: 1, 
                    borderRadius: '50%', 
                    display: 'flex' 
                  }}
                >
                  <PaymentsIcon sx={{ color: '#4caf50' }} />
                </Box>
                <Typography variant="body1">Cash on Delivery</Typography>
              </Box>
            }
            sx={{ 
              py: 1.5, 
              px: 1, 
              width: '100%', 
              m: 0,
              '& .MuiFormControlLabel-label': { 
                width: '100%'
              }
            }}
          />
        </Box>
      </RadioGroup>
      
      {selectedMethod === 'creditCard' && (
        <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Please provide your card information:
          </Typography>
          <Typography variant="caption" color="text.secondary">
            This is just a placeholder in this demo. In a real application, we would include a secure payment form here.
          </Typography>
        </Paper>
      )}
      
      {selectedMethod === 'bankTransfer' && (
        <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Bank Transfer Information:
          </Typography>
          <Typography variant="caption" color="text.secondary" component="div" sx={{ mb: 1 }}>
            <Box>Bank: National Bank</Box>
            <Box>Account Name: MediStore Pharmacy</Box>
            <Box>Account Number: XXXX-XXXX-XXXX-1234</Box>
            <Box>IFSC Code: NATL0012345</Box>
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Please include your order number in the transfer reference.
          </Typography>
        </Paper>
      )}
      
      {selectedMethod === 'cashOnDelivery' && (
        <Paper variant="outlined" sx={{ p: 2, mt: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Cash on Delivery Details:
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Pay with cash upon delivery. Please ensure you have the exact amount ready for our delivery personnel.
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

// Order Summary Component
const OrderSummary = ({ 
  cartItems, 
  orderSummary, 
  activeStep,
  onContinueToPayment,
  onReturnToShop,
  handleRemoveItem
}) => {
  const [promoCode, setPromoCode] = useState('');

  const handleApplyPromo = () => {
    // Would handle promo code logic in a real application
    if (promoCode.trim()) {
      alert(`Promo code "${promoCode}" applied in a real application`);
    }
  };

  const formatCurrency = (amount) => {
    return `Rs. ${amount.toFixed(2)}`;
  };

  return (
    <Paper sx={{ p: 3, position: 'relative' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#002F6C', mb: 3 }}>
        Order Summary
      </Typography>
      
      {/* Cart Items */}
      <Box sx={{ mb: 3 }}>
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <Box
              key={item.medicine_id}
              sx={{
                display: 'flex',
                py: 2,
                borderBottom: '1px solid #eee',
              }}
            >
              <Box
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: '#f5f5f5',
                  borderRadius: 1,
                  overflow: 'hidden',
                  flexShrink: 0,
                }}
              >
                {item.image_url && (
                  <img
                    src={item.image_url}
                    alt={item.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      padding: '5px',
                    }}
                  />
                )}
              </Box>

              <Box sx={{ ml: 2, flex: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                  {item.name}
                </Typography>

                {item.description && (
                  <Typography variant="caption" color="text.secondary">
                    {item.description}
                  </Typography>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, alignItems: 'center' }}>
                  <Typography variant="caption" color="text.secondary">
                    Qty: {item.quantity}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {formatCurrency(item.price * item.quantity)}
                  </Typography>
                   <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleRemoveItem(item.medicine_id)}
                    >
                      Delete
                    </Button>
                </Box>
              </Box>
            </Box>
          ))
        ) : (
          <Typography variant="body2">No items in cart</Typography>
        )}
      </Box>
      {/* Promo Code */}
      <Box sx={{ display: 'flex', mb: 3 }}>
        <TextField
          placeholder="Promo code"
          variant="outlined"
          size="small"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          fullWidth
          sx={{ 
            '& .MuiOutlinedInput-root': {
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
            }
          }}
        />
        <Button 
          variant="contained"
          onClick={handleApplyPromo}
          sx={{ 
            bgcolor: '#002F6C',
            '&:hover': { bgcolor: '#00224E' },
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            whiteSpace: 'nowrap'
          }}
        >
          Apply
        </Button>
      </Box>
      
      {/* Cost Breakdown */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          mb: 1
        }}>
          <Typography variant="body2" color="text.secondary">
            Subtotal
          </Typography>
          <Typography variant="body2">
            {formatCurrency(orderSummary.subtotal)}
          </Typography>
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          mb: 1
        }}>
          <Typography variant="body2" color="text.secondary">
            Shipping
          </Typography>
          <Typography variant="body2">
            {formatCurrency(orderSummary.shipping)}
          </Typography>
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          mb: 1
        }}>
          <Typography variant="body2" color="text.secondary">
            Tax (5%)
          </Typography>
          <Typography variant="body2">
            {formatCurrency(orderSummary.tax)}
          </Typography>
        </Box>
      </Box>
      
      <Divider />
      
      {/* Total */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        mt: 2,
        mb: 1
      }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          Total
        </Typography>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#002F6C' }}>
          {formatCurrency(orderSummary.total)}
        </Typography>
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 3 }}>
        Including VAT/GST
      </Typography>
      
      {/* Action Buttons */}
      <Box sx={{ mt: 3 }}>
        {activeStep === 1 && (
          <Button 
            variant="contained" 
            fullWidth
            onClick={onContinueToPayment}
            sx={{
              bgcolor: '#002F6C',
              '&:hover': { bgcolor: '#00224E' },
              py: 1.5
            }}
          >
            Continue to Payment
          </Button>
        )}
        
        {activeStep === 2 && (
          <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary', mb: 2 }}>
            Please select a payment method to continue
          </Typography>
        )}
        
        <Button 
          variant="text" 
          fullWidth
          onClick={onReturnToShop}
          sx={{
            color: '#002F6C',
            mt: 1
          }}
        >
          Return to Shop
        </Button>
      </Box>
    </Paper>
  );
};

// Main Checkout Component
const Checkout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(1);
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    deliveryInstructions: '',
    hasPrescription: true
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [orderSummary, setOrderSummary] = useState({
    subtotal: 0,
    shipping: 100, // Fixed shipping cost
    tax: 0,
    total: 0
  });
  const [initialLoad, setInitialLoad] = useState(true);
  const searchParams = useSearchParams();
  const { cartCount, updateCartCount } = useCart(); // Get cart context

  // Load cart items from URL params
  useEffect(() => {
    const medicineIds = searchParams.getAll('medicineId');
    const quantities = searchParams.getAll('quantity').map(q => parseInt(q) || 1);

    // Update cart count with the total number of items
    updateCartCount(quantities.reduce((total, quantity) => total + quantity, 0));

    const loadMedicines = async () => {
      try {
        const medicines = await fetchAllMedicines();
        const cartItems = medicineIds.map((medicineId, index) => {
          const foundMedicine = medicines.find(m => m.medicine_id === medicineId);
          if (!foundMedicine) {
            console.warn(`Medicine with id ${medicineId} not found`);
            return null;
          }
          return {
            ...foundMedicine,
            quantity: quantities[index] || 1,
          };
        }).filter(item => item !== null);

        setCartItems(cartItems);
        setInitialLoad(false);
      } catch (error) {
        console.error("Error loading medicines:", error);
        // Handle error appropriately, e.g., display an error message to the user
      }
    };

    if (medicineIds.length > 0) {
      loadMedicines();
    }
  }, [searchParams]);

  // Calculate order summary
  useEffect(() => {
    let subtotal = 0;
    if (cartItems && cartItems.length > 0) {
      subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    const taxRate = 0.05; // 5% tax
    const tax = subtotal * taxRate;
    const total = subtotal + orderSummary.shipping + tax;

    setOrderSummary({
      ...orderSummary,
      subtotal,
      tax,
      total
    });
  }, [cartItems, orderSummary.shipping]);

  useEffect(() => {
    if (cartItems.length === 0 && !initialLoad) {
      router.push('/userstore/userstorepages/allmedicines');
    }
  }, [cartItems, router, initialLoad]);

  const handleRemoveItem = (medicineId) => {
    const updatedCartItems = cartItems.filter(item => item.medicine_id !== medicineId);
    setCartItems(updatedCartItems);
  };

  const handleShippingSubmit = (data) => {
    setShippingData(data);
    setActiveStep(2); // Move to payment step
  };

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleContinueToPayment = () => {
    // Validate the shipping form first
    const shippingForm = document.getElementById('shipping-form');
    if (shippingForm && shippingForm.checkValidity()) {
      setActiveStep(2); // Move to payment step
    } else if (shippingForm) {
      shippingForm.reportValidity();
    }
  };

  const handlePlaceOrder = () => {
    // Here we would submit the order to the backend
    // For now, just move to the confirmation step
    setActiveStep(3);
  };

  const handleReturnToShop = () => {
    setLocation('/');
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#002F6C' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MediStore
          </Typography>
          <Button color="inherit" onClick={() => setLocation('/')}>Home</Button>
          <Button color="inherit" onClick={() => setLocation('/checkout')}>Checkout</Button>
        </Toolbar>
      </AppBar>
      
      <Box sx={{ 
        paddingTop: '100px', 
        paddingBottom: 6, 
        backgroundColor: '#f9f9f9',
        minHeight: '80vh'
      }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: '#002F6C' }}>
              Checkout
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: '800px', mx: 'auto', mt: 1 }}>
              Complete your purchase to get your medications delivered to your doorstep
            </Typography>
          </Box>

          <CheckoutStepper activeStep={activeStep} />

          <Grid container spacing={4} sx={{ mt: 2 }}>
            {/* Left column - Form */}
            <Grid item xs={12} lg={8}>
              <Paper sx={{ p: 3, mb: 3 }}>
                {activeStep === 1 && (
                  <ShippingForm 
                    formData={shippingData} 
                    onSubmit={handleShippingSubmit} 
                  />
                )}

                {activeStep >= 2 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ color: '#002F6C', mb: 2 }}>
                      Shipping Information
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2">
                          <strong>Name:</strong> {shippingData.firstName} {shippingData.lastName}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Email:</strong> {shippingData.email}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Phone:</strong> {shippingData.phone}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2">
                          <strong>Address:</strong> {shippingData.address}
                        </Typography>
                        <Typography variant="body2">
                          <strong>City:</strong> {shippingData.city}, {shippingData.state} {shippingData.postalCode}
                        </Typography>
                        {shippingData.deliveryInstructions && (
                          <Typography variant="body2">
                            <strong>Instructions:</strong> {shippingData.deliveryInstructions}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                )}

                <Paper sx={{ 
                  p: 3, 
                  opacity: activeStep < 2 ? 0.5 : 1,
                  pointerEvents: activeStep < 2 ? 'none' : 'auto'
                }}>
                  <PaymentMethodSelector 
                    selectedMethod={selectedPaymentMethod} 
                    onSelect={handlePaymentMethodSelect}
                    disabled={activeStep < 2}
                  />

                  {activeStep === 2 && (
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                      <Button 
                        variant="contained" 
                        sx={{ 
                          bgcolor: '#002F6C', 
                          '&:hover': { bgcolor: '#00224E' },
                          px: 4,
                          py: 1
                        }}
                        onClick={handlePlaceOrder}
                        disabled={!selectedPaymentMethod}
                      >
                        Place Order
                      </Button>
                    </Box>
                  )}
                </Paper>

                {activeStep === 3 && (
                  <Paper sx={{ p: 4, mt: 3, textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ color: '#4CAF50', mb: 2, fontWeight: 'bold' }}>
                      Order Confirmed!
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                      Thank you for your order. We have received your purchase and will begin processing it right away.
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 3 }}>
                      Your order reference: <strong>MED-{Date.now().toString().substring(6)}</strong>
                    </Typography>
                    <Button 
                      variant="outlined" 
                      onClick={handleReturnToShop}
                      sx={{ 
                        color: '#002F6C', 
                        borderColor: '#002F6C',
                        '&:hover': { borderColor: '#00224E', bgcolor: 'rgba(0, 47, 108, 0.05)' }
                      }}
                    >
                      Continue Shopping
                    </Button>
                  </Paper>
                )}
              </Paper>
            </Grid>

            {/* Right column - Order Summary */}
            <Grid item xs={12} lg={4}>
              <Box sx={{ position: { lg: 'sticky' }, top: '150px' }}>
                <OrderSummary 
                  cartItems={cartItems} 
                  orderSummary={orderSummary}
                  activeStep={activeStep}
                  onContinueToPayment={handleContinueToPayment}
                  onReturnToShop={handleReturnToShop}
                  handleRemoveItem={handleRemoveItem}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      <Box sx={{ 
        bgcolor: '#002F6C', 
        color: 'white', 
        p: 4, 
        mt: 5 
      }}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                MediStore
              </Typography>
              <Typography variant="body2">
                Your trusted online pharmacy for all your medication needs.
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <Typography variant="body2" component="div">
                <Box sx={{ mb: 1 }}>
                  <Button color="inherit" size="small" onClick={() => setLocation('/')}>Home</Button>
                </Box>
                <Box sx={{ mb: 1 }}>
                  <Button color="inherit" size="small" onClick={() => setLocation('/checkout')}>Checkout</Button>
                </Box>
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Contact Us
              </Typography>
              <Typography variant="body2" component="div">
                <Box sx={{ mb: 1 }}>Phone: +123-456-7890</Box>
                <Box sx={{ mb: 1 }}>Email: support@medistore.com</Box>
                <Box>Address: 123 Pharmacy St, Medical District</Box>
              </Typography>
            </Grid>
          </Grid>
          <Box sx={{ borderTop: 1, borderColor: 'rgba(255,255,255,0.2)', mt: 3, pt: 2, textAlign: 'center' }}>
            <Typography variant="body2">
              © {new Date().getFullYear()} MediStore. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};


export default Checkout;
