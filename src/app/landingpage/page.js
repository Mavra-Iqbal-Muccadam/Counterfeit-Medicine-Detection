// import React from "react";
// import NavBar from "../components/NavBar";

// const landingpage = () => {
//   return (
//     <div>
//       <NavBar loginButton={true}  />
//     </div>
    
//   );
// };

// export default landingpage;

// 
// "use client";
// import React, { useState, useEffect } from "react";
// import NavBar from "../components/NavBar";
// import { useQuery } from '@tanstack/react-query';

// // MUI Imports
// import {
//   Box,
//   Typography,
//   Button,
//   Container,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   CardActions,
//   Chip,
//   Paper,
//   Divider,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   TextField,
//   Tab,
//   Tabs,
//   CircularProgress,
//   Rating,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   InputAdornment,
//   alpha,
//   Fade,
//   useMediaQuery,
//   useTheme,
//   IconButton,
//   Avatar
// } from '@mui/material';

// // MUI Icons
// import {
//   LocalPharmacy,
//   LocalShipping,
//   Healing,
//   MedicalServices,
//   Call,
//   Speed,
//   CheckCircle,
//   ExpandMore,
//   KeyboardArrowRight,
//   Email,
//   LocationOn,
//   Phone,
//   Facebook,
//   Twitter,
//   Instagram,
//   ArrowForward,
//   AccessTime,
//   ArrowDownward,
//   ShoppingCart,
//   Star,
//   HealthAndSafety,
//   QuestionAnswer,
//   ContactPhone,
//   People
// } from '@mui/icons-material';

// const LandingPage = () => {
//   // Theme and responsive design
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
//   // State for testimonials slider
//   const [activeTestimonial, setActiveTestimonial] = useState(0);
//   const [fadeIn, setFadeIn] = useState(true);
  
//   // Active tab for services section
//   const [servicesTab, setServicesTab] = useState(0);
  
//   // Fetch medicines data from API
//   const { data: medicines, isLoading, isError } = useQuery({
//     queryKey: ['/api/medicines'],
//     retry: 1,
//   });
  
//   // Animated counter component for statistics
//   const CounterAnimation = ({ end, duration = 2000, prefix = "", suffix = "" }) => {
//     const [count, setCount] = useState(0);
    
//     useEffect(() => {
//       let startTime;
//       let animationFrame;
      
//       const updateCount = (timestamp) => {
//         if (!startTime) startTime = timestamp;
//         const progress = timestamp - startTime;
//         const percentage = Math.min(progress / duration, 1);
//         setCount(Math.floor(percentage * end));
        
//         if (progress < duration) {
//           animationFrame = requestAnimationFrame(updateCount);
//         }
//       };
      
//       animationFrame = requestAnimationFrame(updateCount);
      
//       return () => {
//         if (animationFrame) {
//           cancelAnimationFrame(animationFrame);
//         }
//       };
//     }, [end, duration]);
    
//     return <Typography component="span">{prefix}{count}{suffix}</Typography>;
//   };
  
//   // Sample testimonials
//   const testimonials = [
//     {
//       id: 1,
//       name: "Sarah Johnson",
//       role: "Regular Customer",
//       text: "MediPlus has completely transformed how I manage my healthcare needs. Their delivery is always on time, and their customer service is exceptional!",
//       avatar: "https://randomuser.me/api/portraits/women/32.jpg",
//       rating: 5
//     },
//     {
//       id: 2,
//       name: "Michael Chen",
//       role: "Pharmacist",
//       text: "As a healthcare professional, I recommend MediPlus to all my patients. Their quality control and authenticity of medicines are unmatched in the industry.",
//       avatar: "https://randomuser.me/api/portraits/men/41.jpg",
//       rating: 5
//     },
//     {
//       id: 3,
//       name: "Emma Williams",
//       role: "Mother of Two",
//       text: "The convenience of ordering medicines from home has been a lifesaver with my busy schedule. MediPlus always ensures my family's health needs are met promptly.",
//       avatar: "https://randomuser.me/api/portraits/women/68.jpg",
//       rating: 4
//     }
//   ];
  
//   // Handle testimonial rotation
//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setFadeIn(false);
//       setTimeout(() => {
//         setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
//         setFadeIn(true);
//       }, 500);
//     }, 5000);
    
//     return () => clearInterval(intervalId);
//   }, [testimonials.length]);
  
//   // FAQ data
//   const faqs = [
//     {
//       question: "How do I place an order?",
//       answer: "Simply browse our medicines, add items to your cart, and proceed to checkout. Follow the instructions to complete your purchase."
//     },
//     {
//       question: "What payment methods do you accept?",
//       answer: "We accept credit/debit cards, digital wallets, and cash on delivery for your convenience."
//     },
//     {
//       question: "How long does delivery take?",
//       answer: "Standard delivery takes 1-3 business days. Express delivery is available for same-day or next-day delivery in selected areas."
//     },
//     {
//       question: "Do you need a prescription for all medicines?",
//       answer: "Prescription medicines require a valid prescription, which you can upload during checkout. Over-the-counter medicines can be purchased without a prescription."
//     },
//     {
//       question: "What is your return policy?",
//       answer: "Unopened medicines can be returned within 7 days of delivery. Please note that prescription medicines cannot be returned unless damaged or incorrect."
//     }
//   ];
  
//   // Featured medicine categories
//   const categories = [
//     {
//       name: "Antibiotics",
//       icon: <Healing fontSize="large" />,
//       description: "Fight bacterial infections"
//     },
//     {
//       name: "Pain Relief",
//       icon: <MedicalServices fontSize="large" />,
//       description: "Alleviate pain and discomfort"
//     },
//     {
//       name: "Vitamins",
//       icon: <LocalPharmacy fontSize="large" />,
//       description: "Support overall health"
//     },
//     {
//       name: "Diabetes Care",
//       icon: <LocalShipping fontSize="large" />,
//       description: "Manage blood sugar levels"
//     }
//   ];
  
//   // Handle section navigation
//   const scrollToSection = (sectionId) => {
//     document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
//   };
  
//   // Handle tab change for services section
//   const handleServicesTabChange = (event, newValue) => {
//     setServicesTab(newValue);
//   };
  
//   // Handle add to cart
//   const addToCart = (medicineId, price) => {
//     // For this demo, we'll just show an alert
//     alert(`Added ${medicineId} to cart with price ${price}`);
//     // In a real application, you would navigate to the cart page or update the cart state
//   };
  
//   return (
//     <Box>
//       <NavBar loginButton={true} />
      
//       {/* Clean Modern Hero Section Based on Reference Images */}
//       <Box 
//         id="home"
//         sx={{
//           minHeight: '90vh',
//           position: 'relative',
//           overflow: 'hidden',
//           bgcolor: '#f5f7fa',
//           display: 'flex',
//           alignItems: 'center',
//           pt: { xs: 10, md: 0 },
//           pb: { xs: 8, md: 0 }
//         }}
//       >
//         {/* Subtle Background Pattern */}
//         <Box 
//           sx={{ 
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             opacity: 0.03,
//             backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%230067b1\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")',
//             backgroundSize: '30px',
//             zIndex: 0
//           }}
//         />
        
//         {/* Wavy Pattern Background Element */}
//         <Box 
//           sx={{ 
//             position: 'absolute',
//             bottom: 0,
//             right: 0,
//             width: '100%',
//             height: '12%',
//             opacity: 0.06,
//             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1200 120' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'%3E%3Cpath d='M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z' fill='%23002F6C'/%3E%3C/svg%3E")`,
//             backgroundSize: 'cover',
//             zIndex: 0
//           }}
//         />
        
//         {/* Blue Left Side Element */}
//         <Box 
//           sx={{ 
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             width: '15%',
//             height: '100%',
//             background: 'linear-gradient(90deg, rgba(0,47,108,0.06) 0%, rgba(0,47,108,0) 100%)',
//             zIndex: 0
//           }}
//         />
        
//         {/* Main Content Container */}
//         <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
//           <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
//             {/* Left Side - Text Content */}
//             <Grid item xs={12} md={6}>
//               <Box
//                 sx={{
//                   animation: 'fadeInLeft 1s ease-out',
//                   '@keyframes fadeInLeft': {
//                     '0%': { opacity: 0, transform: 'translateX(-30px)' },
//                     '100%': { opacity: 1, transform: 'translateX(0)' }
//                   }
//                 }}
//               >
//                 {/* Subtle Highlight Text */}
//                 <Typography 
//                   component="div" 
//                   sx={{ 
//                     color: '#666', 
//                     fontSize: '0.9rem', 
//                     fontWeight: 500, 
//                     letterSpacing: '1px',
//                     display: 'flex',
//                     alignItems: 'center',
//                     mb: 2
//                   }}
//                 >
//                   <Box component="span" sx={{ width: 40, height: 1, bgcolor: '#D32F2F', mr: 2 }}></Box>
//                   COMMITTED TO SUCCESS
//                 </Typography>
                
//                 {/* Main Headline */}
//                 <Typography 
//                   component="h1"
//                   sx={{ 
//                     fontSize: { xs: '2.2rem', md: '3rem', lg: '3.5rem' }, 
//                     fontWeight: 900,
//                     mb: 1,
//                     lineHeight: 1.2,
//                     color: '#111',
//                     position: 'relative'
//                   }}
//                 >
//                   <Box component="span" sx={{ display: 'block' }}>WE CARE ABOUT</Box>
//                   <Box component="span" sx={{ display: 'block', color: '#002F6C' }}>YOUR HEALTH</Box>
//                 </Typography>
                
//                 {/* Tagline */}
//                 <Typography 
//                   variant="body1" 
//                   sx={{ 
//                     fontSize: { xs: '1rem', md: '1.1rem' },
//                     fontWeight: 400,
//                     mb: 4,
//                     color: '#555',
//                     maxWidth: '90%',
//                     lineHeight: 1.6,
//                     animation: 'fadeIn 1s ease-out 0.3s both',
//                     '@keyframes fadeIn': {
//                       '0%': { opacity: 0 },
//                       '100%': { opacity: 1 }
//                     }
//                   }}
//                 >
//                   Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
//                   uisquip ex ea commodo consequat is cute aute irure.
//                 </Typography>
                
//                 {/* Call-to-Action Button */}
//                 <Button 
//                   variant="contained" 
//                   size="large"
//                   startIcon={<ArrowForward />}
//                   sx={{ 
//                     bgcolor: '#1976d2',
//                     '&:hover': { 
//                       bgcolor: '#1565c0',
//                       transform: 'translateY(-3px)',
//                       boxShadow: '0 8px 15px rgba(25, 118, 210, 0.3)'
//                     },
//                     transition: 'all 0.3s',
//                     px: 4,
//                     py: 1.5,
//                     borderRadius: '30px',
//                     fontWeight: 600,
//                     fontSize: '1rem',
//                     animation: 'fadeIn 1s ease-out 0.6s both',
//                     textTransform: 'none'
//                   }}
//                 >
//                   Appointment
//                 </Button>
                
//                 {/* Service Icons - Based on Second Reference */}
//                 <Box 
//                   sx={{ 
//                     display: 'flex', 
//                     flexDirection: 'column',
//                     gap: 2, 
//                     mt: 6,
//                     animation: 'fadeIn 1s ease-out 0.9s both'
//                   }}
//                 >
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                     <Box sx={{ 
//                       width: 50, 
//                       height: 50, 
//                       borderRadius: '50%', 
//                       bgcolor: '#ffecee',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center'
//                     }}>
//                       <Avatar 
//                         src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg" 
//                         alt="Professional Doctors" 
//                         sx={{ width: 35, height: 35 }}
//                       />
//                     </Box>
//                     <Box>
//                       <Typography sx={{ color: '#D32F2F', fontWeight: 600, fontSize: '1rem' }}>
//                         Professional Doctors
//                       </Typography>
//                       <Typography sx={{ color: '#666', fontSize: '0.9rem' }}>
//                         Crown template is simply dummy text of the printing and typesetting industry.
//                       </Typography>
//                     </Box>
//                   </Box>
                  
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                     <Box sx={{ 
//                       width: 50, 
//                       height: 50, 
//                       borderRadius: '50%', 
//                       bgcolor: '#e0f7fa',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center'
//                     }}>
//                       <Avatar 
//                         src="https://img.freepik.com/free-vector/track-your-steps-concept-illustration_114360-2680.jpg" 
//                         alt="Track Progress" 
//                         sx={{ width: 35, height: 35 }}
//                       />
//                     </Box>
//                     <Box>
//                       <Typography sx={{ color: '#D32F2F', fontWeight: 600, fontSize: '1rem' }}>
//                         Track your Progress
//                       </Typography>
//                       <Typography sx={{ color: '#666', fontSize: '0.9rem' }}>
//                         Crown template is simply dummy text of the printing and typesetting industry.
//                       </Typography>
//                     </Box>
//                   </Box>
//                 </Box>
//               </Box>
//             </Grid>
            
//             {/* Right Side - Doctor Image */}
//             <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
//               <Box 
//                 sx={{ 
//                   position: 'relative',
//                   height: '100%',
//                   minHeight: '500px',
//                   animation: 'fadeInRight 1s ease-out',
//                   '@keyframes fadeInRight': {
//                     '0%': { opacity: 0, transform: 'translateX(30px)' },
//                     '100%': { opacity: 1, transform: 'translateX(0)' }
//                   }
//                 }}
//               >
//                 {/* Main Doctor Image */}
//                 <Box
//                   component="img"
//                   src="https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg"
//                   alt="Professional Doctor"
//                   sx={{
//                     width: '100%',
//                     height: '100%',
//                     objectFit: 'contain',
//                     objectPosition: 'center right',
//                     position: 'relative',
//                     zIndex: 10,
//                     display: 'block'
//                   }}
//                 />
                
//                 {/* Main 3D Layered Image Component */}
//                 <Box 
//                   sx={{ 
//                     position: 'relative', 
//                     width: '100%',
//                     height: '100%',
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     transform: 'perspective(1200px) rotateY(-8deg) rotateX(5deg)',
//                     transformStyle: 'preserve-3d',
//                     transition: 'all 0.5s ease'
//                   }}
//                 >
//                   {/* Background Layers for 3D Effect */}
//                   <Box sx={{ 
//                     position: 'absolute', 
//                     width: '90%',
//                     height: '90%',
//                     bgcolor: alpha('#002F6C', 0.2), 
//                     borderRadius: 4, 
//                     transform: 'translateZ(-80px) rotate(8deg)', 
//                     boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
//                     border: `1px solid ${alpha('#ffffff', 0.1)}`,
//                     filter: 'blur(2px)'
//                   }} />
                  
//                   <Box sx={{ 
//                     position: 'absolute', 
//                     width: '90%',
//                     height: '90%',
//                     bgcolor: alpha('#D32F2F', 0.1), 
//                     borderRadius: 4, 
//                     transform: 'translateZ(-40px) rotate(-4deg)', 
//                     boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
//                     border: `1px solid ${alpha('#ffffff', 0.15)}`,
//                     filter: 'blur(1px)'
//                   }} />
                  
//                   {/* Main Image with Reflections and Highlights */}
//                   <Box 
//                     sx={{
//                       position: 'relative',
//                       width: '90%',
//                       height: '90%',
//                       borderRadius: 4,
//                       overflow: 'hidden',
//                       boxShadow: '0 30px 60px rgba(0,0,0,0.3), 0 0 30px rgba(0,0,0,0.2) inset',
//                       border: `1px solid ${alpha('#ffffff', 0.2)}`,
//                       transform: 'translateZ(0)',
//                       background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
//                       '&::before': {
//                         content: '""',
//                         position: 'absolute',
//                         top: 0,
//                         left: 0,
//                         right: 0,
//                         height: '30%',
//                         background: 'linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 100%)',
//                         zIndex: 2,
//                         pointerEvents: 'none'
//                       },
//                       '&::after': {
//                         content: '""',
//                         position: 'absolute',
//                         bottom: 0,
//                         left: 0,
//                         right: 0,
//                         height: '20%',
//                         background: 'linear-gradient(to top, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 100%)',
//                         zIndex: 2,
//                         pointerEvents: 'none'
//                       }
//                     }}
//                   >
//                     <Box 
//                       component="img"
//                       src="https://img.freepik.com/free-photo/young-female-doctor-holding-out-prescription-drug-reaching-out-hand-help-healthcare-medical_1258-48215.jpg" 
//                       alt="Healthcare Professional with Medicine"
//                       sx={{ 
//                         width: '100%', 
//                         height: '100%',
//                         objectFit: 'cover',
//                         objectPosition: 'center',
//                         filter: 'brightness(1.05) contrast(1.05)',
//                         transition: 'all 0.5s ease',
//                         '&:hover': {
//                           transform: 'scale(1.03)'
//                         }
//                       }}
//                     />
//                   </Box>
//                 </Box>
//               </Box>
//             </Grid>
//           </Grid>
          
//           {/* Enhanced Stats Counter Section */}
//           <Grid container spacing={3} sx={{ mt: { xs: 8, md: 12 }, mb: { xs: 4, md: 6 } }}>
//             <Grid item xs={12} sm={4}>
//               <Paper 
//                 elevation={8} 
//                 sx={{ 
//                   p: 3.5, 
//                   textAlign: 'center',
//                   background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
//                   backdropFilter: 'blur(10px)',
//                   borderRadius: 4,
//                   border: `1px solid ${alpha('#ffffff', 0.2)}`,
//                   '&:hover': { 
//                     transform: 'translateY(-8px)',
//                     boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
//                   },
//                   transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
//                   animation: 'fadeInUp 1s ease-out 1.2s both'
//                 }}
//               >
//                 <Box
//                   sx={{
//                     display: 'inline-flex',
//                     alignItems: 'center', 
//                     justifyContent: 'center',
//                     width: '70px',
//                     height: '70px',
//                     borderRadius: '50%',
//                     background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
//                     mb: 2
//                   }}
//                 >
//                   <People sx={{ fontSize: 36, color: '#D32F2F' }} />
//                 </Box>
//                 <Typography variant="h3" component="div" fontWeight="bold" sx={{ mb: 1, background: 'linear-gradient(90deg, #ffffff 30%, #e0e0e0 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
//                   <CounterAnimation end={5000} suffix="+" />
//                 </Typography>
//                 <Typography variant="body1" sx={{ color: alpha('#ffffff', 0.9), fontWeight: 500 }}>
//                   Customers Served
//                 </Typography>
//               </Paper>
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <Paper 
//                 elevation={8} 
//                 sx={{ 
//                   p: 3.5, 
//                   textAlign: 'center',
//                   background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
//                   backdropFilter: 'blur(10px)',
//                   borderRadius: 4,
//                   border: `1px solid ${alpha('#ffffff', 0.2)}`,
//                   '&:hover': { 
//                     transform: 'translateY(-8px)',
//                     boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
//                   },
//                   transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
//                   animation: 'fadeInUp 1s ease-out 1.4s both'
//                 }}
//               >
//                 <Box
//                   sx={{
//                     display: 'inline-flex',
//                     alignItems: 'center', 
//                     justifyContent: 'center',
//                     width: '70px',
//                     height: '70px',
//                     borderRadius: '50%',
//                     background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
//                     mb: 2
//                   }}
//                 >
//                   <LocalPharmacy sx={{ fontSize: 36, color: '#D32F2F' }} />
//                 </Box>
//                 <Typography variant="h3" component="div" fontWeight="bold" sx={{ mb: 1, background: 'linear-gradient(90deg, #ffffff 30%, #e0e0e0 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
//                   <CounterAnimation end={1500} suffix="+" />
//                 </Typography>
//                 <Typography variant="body1" sx={{ color: alpha('#ffffff', 0.9), fontWeight: 500 }}>
//                   Medicine Varieties
//                 </Typography>
//               </Paper>
//             </Grid>
//             <Grid item xs={12} sm={4}>
//               <Paper 
//                 elevation={8} 
//                 sx={{ 
//                   p: 3.5, 
//                   textAlign: 'center',
//                   background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
//                   backdropFilter: 'blur(10px)',
//                   borderRadius: 4,
//                   border: `1px solid ${alpha('#ffffff', 0.2)}`,
//                   '&:hover': { 
//                     transform: 'translateY(-8px)',
//                     boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
//                   },
//                   transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
//                   animation: 'fadeInUp 1s ease-out 1.6s both'
//                 }}
//               >
//                 <Box
//                   sx={{
//                     display: 'inline-flex',
//                     alignItems: 'center', 
//                     justifyContent: 'center',
//                     width: '70px',
//                     height: '70px',
//                     borderRadius: '50%',
//                     background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
//                     mb: 2
//                   }}
//                 >
//                   <LocalShipping sx={{ fontSize: 36, color: '#D32F2F' }} />
//                 </Box>
//                 <Typography variant="h3" component="div" fontWeight="bold" sx={{ mb: 1, background: 'linear-gradient(90deg, #ffffff 30%, #e0e0e0 100%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
//                   <CounterAnimation end={99} suffix="%" />
//                 </Typography>
//                 <Typography variant="body1" sx={{ color: alpha('#ffffff', 0.9), fontWeight: 500 }}>
//                   On-time Delivery
//                 </Typography>
//               </Paper>
//             </Grid>
//           </Grid>
          
//           {/* Scroll Down Indicator with Enhanced Animation */}
//           <Box 
//             sx={{
//               display: 'flex',
//               justifyContent: 'center',
//               mt: 2,
//               mb: 4,
//               animation: 'fadeInUp 1s ease-out 1.8s both'
//             }}
//           >
//             <Box
//               sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center'
//               }}
//             >
//               <Typography 
//                 variant="subtitle2" 
//                 sx={{ 
//                   mb: 1, 
//                   color: alpha('#ffffff', 0.7),
//                   letterSpacing: '1px',
//                   textTransform: 'uppercase',
//                   fontSize: '0.7rem'
//                 }}
//               >
//                 Explore More
//               </Typography>
//               <IconButton 
//                 onClick={() => scrollToSection('categories')}
//                 sx={{
//                   color: 'white',
//                   background: alpha('#ffffff', 0.1),
//                   border: `1px solid ${alpha('#ffffff', 0.2)}`,
//                   '&:hover': {
//                     background: alpha('#ffffff', 0.15),
//                     transform: 'translateY(5px)'
//                   },
//                   animation: 'bounce 2s infinite',
//                   '@keyframes bounce': {
//                     '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
//                     '40%': { transform: 'translateY(-10px)' },
//                     '60%': { transform: 'translateY(-5px)' }
//                   },
//                   p: 1
//                 }}
//               >
//                 <ArrowDownward />
//               </IconButton>
//             </Box>
//           </Box>
//         </Container>
//       </Box>
      
//       {/* Categories Section */}
//       <Box id="categories" sx={{ py: 8, bgcolor: 'white' }}>
//         <Container maxWidth="lg">
//           <Box sx={{ textAlign: 'center', mb: 6 }}>
//             <Typography 
//               variant="h2" 
//               sx={{ 
//                 fontSize: { xs: '2rem', md: '2.5rem' }, 
//                 fontWeight: 700,
//                 color: '#002F6C',
//                 mb: 2
//               }}
//             >
//               Browse by Category
//             </Typography>
//             <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
//               Find what you need quickly by exploring our carefully organized medicine categories
//             </Typography>
//           </Box>
          
//           <Grid container spacing={3}>
//             {categories.map((category, index) => (
//               <Grid item xs={12} sm={6} md={3} key={index}>
//                 <Card 
//                   sx={{ 
//                     height: '100%', 
//                     display: 'flex', 
//                     flexDirection: 'column', 
//                     alignItems: 'center', 
//                     p: 3,
//                     textAlign: 'center',
//                     cursor: 'pointer',
//                     '&:hover': { 
//                       boxShadow: 4,
//                       transform: 'translateY(-5px)'
//                     },
//                     transition: 'all 0.3s ease',
//                     borderRadius: 3
//                   }}
//                   onClick={() => scrollToSection('products')}
//                 >
//                   <Box 
//                     sx={{ 
//                       bgcolor: alpha('#002F6C', 0.08), 
//                       borderRadius: '50%', 
//                       p: 2, 
//                       mb: 2,
//                       color: '#002F6C'
//                     }}
//                   >
//                     {category.icon}
//                   </Box>
//                   <Typography variant="h6" fontWeight="bold" sx={{ color: '#002F6C', mb: 1 }}>
//                     {category.name}
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//                     {category.description}
//                   </Typography>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//       </Box>
      
//       {/* Services Section */}
//       <Box id="services" sx={{ py: 8, bgcolor: '#f5f7fa' }}>
//         <Container maxWidth="lg">
//           <Box sx={{ textAlign: 'center', mb: 6 }}>
//             <Typography 
//               variant="h2" 
//               sx={{ 
//                 fontSize: { xs: '2rem', md: '2.5rem' }, 
//                 fontWeight: 700,
//                 color: '#002F6C',
//                 mb: 2
//               }}
//             >
//               Our Premium Services
//             </Typography>
//             <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
//               We offer comprehensive healthcare solutions to ensure your well-being is never compromised
//             </Typography>
//           </Box>
          
//           <Box sx={{ mb: 4 }}>
//             <Tabs 
//               value={servicesTab} 
//               onChange={handleServicesTabChange} 
//               centered
//               sx={{
//                 '& .MuiTab-root': {
//                   fontWeight: 600,
//                   fontSize: '1rem',
//                   textTransform: 'none',
//                   minWidth: 0,
//                   mx: 2
//                 },
//                 '& .Mui-selected': {
//                   color: '#002F6C'
//                 },
//                 '& .MuiTabs-indicator': {
//                   backgroundColor: '#002F6C'
//                 }
//               }}
//             >
//               <Tab label="Prescription Services" />
//               <Tab label="Express Delivery" />
//               <Tab label="Online Consultation" />
//             </Tabs>
//           </Box>
          
//           <Fade in={servicesTab === 0}>
//             <Box hidden={servicesTab !== 0}>
//               <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
//                 <Grid container spacing={4}>
//                   <Grid item xs={12} md={6}>
//                     <Typography variant="h5" fontWeight="bold" sx={{ color: '#002F6C', mb: 2 }}>
//                       Prescription Services
//                     </Typography>
//                     <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
//                       We make it easy to get your prescription medications. Simply upload your prescription through our secure platform and get your medicines delivered to your doorstep.
//                     </Typography>
//                     <List>
//                       <ListItem sx={{ px: 0, py: 1 }}>
//                         <ListItemIcon sx={{ minWidth: 36 }}><CheckCircle color="success" /></ListItemIcon>
//                         <ListItemText primary="Secure prescription uploads" />
//                       </ListItem>
//                       <ListItem sx={{ px: 0, py: 1 }}>
//                         <ListItemIcon sx={{ minWidth: 36 }}><CheckCircle color="success" /></ListItemIcon>
//                         <ListItemText primary="Expert pharmacist verification" />
//                       </ListItem>
//                       <ListItem sx={{ px: 0, py: 1 }}>
//                         <ListItemIcon sx={{ minWidth: 36 }}><CheckCircle color="success" /></ListItemIcon>
//                         <ListItemText primary="Automatic refill reminders" />
//                       </ListItem>
//                       <ListItem sx={{ px: 0, py: 1 }}>
//                         <ListItemIcon sx={{ minWidth: 36 }}><CheckCircle color="success" /></ListItemIcon>
//                         <ListItemText primary="Competitive pricing on all medications" />
//                       </ListItem>
//                     </List>
//                     <Button 
//                       variant="contained" 
//                       sx={{ 
//                         mt: 2, 
//                         bgcolor: '#002F6C', 
//                         '&:hover': { bgcolor: '#01487E' } 
//                       }}
//                       endIcon={<KeyboardArrowRight />}
//                     >
//                       Upload Prescription
//                     </Button>
//                   </Grid>
//                   <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                     <Box 
//                       component="img"
//                       src="https://img.freepik.com/free-photo/doctor-filling-medical-prescription-office_1303-25514.jpg?w=900"
//                       alt="Prescription Services"
//                       sx={{ 
//                         maxWidth: '100%', 
//                         height: 'auto', 
//                         maxHeight: 300,
//                         borderRadius: 3,
//                         boxShadow: 3
//                       }}
//                     />
//                   </Grid>
//                 </Grid>
//               </Paper>
//             </Box>
//           </Fade>
          
//           <Fade in={servicesTab === 1}>
//             <Box hidden={servicesTab !== 1}>
//               <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
//                 <Grid container spacing={4}>
//                   <Grid item xs={12} md={6}>
//                     <Typography variant="h5" fontWeight="bold" sx={{ color: '#002F6C', mb: 2 }}>
//                       Express Delivery
//                     </Typography>
//                     <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
//                       Get your medicines delivered within 24 hours with our premium express delivery service. We understand that time is critical when it comes to your health.
//                     </Typography>
//                     <List>
//                       <ListItem sx={{ px: 0, py: 1 }}>
//                         <ListItemIcon sx={{ minWidth: 36 }}><CheckCircle color="success" /></ListItemIcon>
//                         <ListItemText primary="24-hour delivery guarantee" />
//                       </ListItem>
//                       <ListItem sx={{ px: 0, py: 1 }}>
//                         <ListItemIcon sx={{ minWidth: 36 }}><CheckCircle color="success" /></ListItemIcon>
//                         <ListItemText primary="Real-time tracking" />
//                       </ListItem>
//                       <ListItem sx={{ px: 0, py: 1 }}>
//                         <ListItemIcon sx={{ minWidth: 36 }}><CheckCircle color="success" /></ListItemIcon>
//                         <ListItemText primary="Temperature-controlled packaging" />
//                       </ListItem>
//                       <ListItem sx={{ px: 0, py: 1 }}>
//                         <ListItemIcon sx={{ minWidth: 36 }}><CheckCircle color="success" /></ListItemIcon>
//                         <ListItemText primary="Available in major cities nationwide" />
//                       </ListItem>
//                     </List>
//                     <Button 
//                       variant="contained" 
//                       sx={{ 
//                         mt: 2, 
//                         bgcolor: '#002F6C', 
//                         '&:hover': { bgcolor: '#01487E' } 
//                       }}
//                       endIcon={<KeyboardArrowRight />}
//                     >
//                       Check Delivery Areas
//                     </Button>
//                   </Grid>
//                   <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                     <Box 
//                       component="img"
//                       src="https://img.freepik.com/free-photo/delivery-man-with-face-mask-delivering-order-motorcycle_23-2149405535.jpg?w=900"
//                       alt="Express Delivery"
//                       sx={{ 
//                         maxWidth: '100%', 
//                         height: 'auto', 
//                         maxHeight: 300,
//                         borderRadius: 3,
//                         boxShadow: 3
//                       }}
//                     />
//                   </Grid>
//                 </Grid>
//               </Paper>
//             </Box>
//           </Fade>
          
//           <Fade in={servicesTab === 2}>
//             <Box hidden={servicesTab !== 2}>
//               <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
//                 <Grid container spacing={4}>
//                   <Grid item xs={12} md={6}>
//                     <Typography variant="h5" fontWeight="bold" sx={{ color: '#002F6C', mb: 2 }}>
//                       Online Consultation
//                     </Typography>
//                     <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
//                       Consult with qualified healthcare professionals online at your convenience. Our team of doctors and specialists are available 24/7.
//                     </Typography>
//                     <List>
//                       <ListItem sx={{ px: 0, py: 1 }}>
//                         <ListItemIcon sx={{ minWidth: 36 }}><CheckCircle color="success" /></ListItemIcon>
//                         <ListItemText primary="24/7 access to doctors" />
//                       </ListItem>
//                       <ListItem sx={{ px: 0, py: 1 }}>
//                         <ListItemIcon sx={{ minWidth: 36 }}><CheckCircle color="success" /></ListItemIcon>
//                         <ListItemText primary="Video consultations" />
//                       </ListItem>
//                       <ListItem sx={{ px: 0, py: 1 }}>
//                         <ListItemIcon sx={{ minWidth: 36 }}><CheckCircle color="success" /></ListItemIcon>
//                         <ListItemText primary="Digital prescriptions" />
//                       </ListItem>
//                       <ListItem sx={{ px: 0, py: 1 }}>
//                         <ListItemIcon sx={{ minWidth: 36 }}><CheckCircle color="success" /></ListItemIcon>
//                         <ListItemText primary="Consultation history and health tracking" />
//                       </ListItem>
//                     </List>
//                     <Button 
//                       variant="contained" 
//                       sx={{ 
//                         mt: 2, 
//                         bgcolor: '#002F6C', 
//                         '&:hover': { bgcolor: '#01487E' } 
//                       }}
//                       endIcon={<KeyboardArrowRight />}
//                     >
//                       Book Consultation
//                     </Button>
//                   </Grid>
//                   <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//                     <Box 
//                       component="img"
//                       src="https://img.freepik.com/free-photo/female-doctor-with-tablet-medical-uniform-consultation-hospital-healthcare-medicine-service_1258-67239.jpg?w=900"
//                       alt="Online Consultation"
//                       sx={{ 
//                         maxWidth: '100%', 
//                         height: 'auto', 
//                         maxHeight: 300,
//                         borderRadius: 3,
//                         boxShadow: 3
//                       }}
//                     />
//                   </Grid>
//                 </Grid>
//               </Paper>
//             </Box>
//           </Fade>
//         </Container>
//       </Box>
      
//       {/* Why Choose Us Section with Animations */}
//       <Box id="products" sx={{ 
//         py: { xs: 8, md: 12 }, 
//         bgcolor: 'white',
//         position: 'relative',
//         overflow: 'hidden'
//       }}>
//         {/* Animated Background Elements */}
//         <Box 
//           sx={{ 
//             position: 'absolute',
//             top: '10%',
//             right: '5%',
//             width: { xs: '150px', md: '200px' },
//             height: { xs: '150px', md: '200px' },
//             borderRadius: '50%',
//             background: 'radial-gradient(circle, rgba(0,47,108,0.05) 0%, rgba(0,47,108,0) 70%)',
//             animation: 'pulse-slow 15s infinite alternate',
//             '@keyframes pulse-slow': {
//               '0%': { transform: 'scale(1)', opacity: 0.5 },
//               '100%': { transform: 'scale(1.5)', opacity: 0.2 }
//             }
//           }} 
//         />
        
//         <Box 
//           sx={{ 
//             position: 'absolute',
//             bottom: '10%',
//             left: '5%',
//             width: { xs: '120px', md: '180px' },
//             height: { xs: '120px', md: '180px' },
//             borderRadius: '50%',
//             background: 'radial-gradient(circle, rgba(211,47,47,0.05) 0%, rgba(211,47,47,0) 70%)',
//             animation: 'pulse-slow 12s infinite alternate-reverse',
//           }} 
//         />
        
//         <Box 
//           sx={{ 
//             position: 'absolute',
//             left: -30,
//             top: '40%',
//             width: 100,
//             height: 100,
//             bgcolor: alpha('#ffffff', 0.05),
//             borderRadius: '50%'
//           }} 
//         />
        
//         <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
//           {/* Section Heading with Animated Underline */}
//           <Box sx={{ 
//             textAlign: 'center', 
//             mb: { xs: 8, md: 10 },
//             position: 'relative'
//           }}>
//             <Typography 
//               variant="h2" 
//               sx={{ 
//                 fontSize: { xs: '2.2rem', md: '3rem' }, 
//                 fontWeight: 800,
//                 color: '#002F6C',
//                 mb: 3,
//                 position: 'relative',
//                 display: 'inline-block'
//               }}
//             >
//               Why Choose Us
//               <Box sx={{ 
//                 position: 'absolute',
//                 bottom: -10,
//                 left: '50%',
//                 transform: 'translateX(-50%)',
//                 width: '80px',
//                 height: '4px',
//                 bgcolor: '#D32F2F',
//                 animation: 'width-expand 1.5s ease-in-out',
//                 '@keyframes width-expand': {
//                   '0%': { width: '0' },
//                   '100%': { width: '80px' }
//                 }
//               }} />
//             </Typography>
//             <Typography 
//               variant="h6" 
//               sx={{ 
//                 color: 'text.secondary', 
//                 maxWidth: 700, 
//                 mx: 'auto', 
//                 fontWeight: 400,
//                 lineHeight: 1.6
//               }}
//             >
//               We're committed to providing exceptional healthcare solutions with uncompromising quality, reliability, and personalized service
//             </Typography>
//           </Box>
          
//           {/* Features Grid with Animated Cards */}
//           <Grid container spacing={4}>
//             {/* Feature 1 - Quality Assurance */}
//             <Grid item xs={12} sm={6} md={4}>
//               <Box 
//                 sx={{ 
//                   bgcolor: 'white',
//                   p: 4,
//                   height: '100%',
//                   borderRadius: 4,
//                   boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
//                   transition: 'all 0.4s ease',
//                   position: 'relative',
//                   overflow: 'hidden',
//                   '&:hover': {
//                     transform: 'translateY(-16px)',
//                     boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
//                   },
//                   '&:hover .icon-container': {
//                     transform: 'scale(1.1)',
//                     bgcolor: alpha('#002F6C', 0.1)
//                   },
//                   '&:before': {
//                     content: '""',
//                     position: 'absolute',
//                     top: 0,
//                     left: 0,
//                     width: '100%',
//                     height: '4px',
//                     background: 'linear-gradient(90deg, #002F6C, #1976d2)',
//                     opacity: 0,
//                     transition: 'opacity 0.4s ease'
//                   },
//                   '&:hover:before': {
//                     opacity: 1
//                   }
//                 }}
//               >
//                 <Box 
//                   className="icon-container"
//                   sx={{ 
//                     width: '90px',
//                     height: '90px',
//                     borderRadius: '24px',
//                     bgcolor: alpha('#002F6C', 0.06),
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     mb: 3,
//                     transition: 'all 0.3s ease',
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       width: '70px',
//                       height: '70px',
//                       animation: 'float-gentle 3s infinite ease-in-out',
//                       '@keyframes float-gentle': {
//                         '0%, 100%': { transform: 'translateY(0)' },
//                         '50%': { transform: 'translateY(-10px)' }
//                       }
//                     }}
//                   >
//                     <LocalPharmacy sx={{ fontSize: 45, color: '#002F6C' }} />
//                   </Box>
//                 </Box>
                
//                 <Typography 
//                   variant="h5" 
//                   sx={{ 
//                     fontWeight: 700, 
//                     color: '#002F6C', 
//                     mb: 2,
//                     position: 'relative'
//                   }}
//                 >
//                   Quality Assurance
//                 </Typography>
                
//                 <Typography sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
//                   We maintain the highest quality standards, sourcing medicines only from reputable manufacturers and conducting rigorous quality checks before delivery.
//                 </Typography>
//               </Box>
//             </Grid>
            
//             {/* Feature 2 - Express Delivery */}
//             <Grid item xs={12} sm={6} md={4}>
//               <Box 
//                 sx={{ 
//                   bgcolor: 'white',
//                   p: 4,
//                   height: '100%',
//                   borderRadius: 4,
//                   boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
//                   transition: 'all 0.4s ease',
//                   position: 'relative',
//                   overflow: 'hidden',
//                   '&:hover': {
//                     transform: 'translateY(-16px)',
//                     boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
//                   },
//                   '&:hover .icon-container': {
//                     transform: 'scale(1.1)',
//                     bgcolor: alpha('#D32F2F', 0.1)
//                   },
//                   '&:before': {
//                     content: '""',
//                     position: 'absolute',
//                     top: 0,
//                     left: 0,
//                     width: '100%',
//                     height: '4px',
//                     background: 'linear-gradient(90deg, #D32F2F, #f44336)',
//                     opacity: 0,
//                     transition: 'opacity 0.4s ease'
//                   },
//                   '&:hover:before': {
//                     opacity: 1
//                   }
//                 }}
//               >
//                 <Box 
//                   className="icon-container"
//                   sx={{ 
//                     width: '90px',
//                     height: '90px',
//                     borderRadius: '24px',
//                     bgcolor: alpha('#D32F2F', 0.06),
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     mb: 3,
//                     transition: 'all 0.3s ease',
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       width: '70px',
//                       height: '70px',
//                       animation: 'float-gentle 3s infinite ease-in-out 0.5s',
//                     }}
//                   >
//                     <LocalShipping sx={{ fontSize: 45, color: '#D32F2F' }} />
//                   </Box>
//                 </Box>
                
//                 <Typography 
//                   variant="h5" 
//                   sx={{ 
//                     fontWeight: 700, 
//                     color: '#002F6C', 
//                     mb: 2,
//                     position: 'relative'
//                   }}
//                 >
//                   Rapid Delivery
//                 </Typography>
                
//                 <Typography sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
//                   Our efficient logistics network ensures your medications arrive promptly, with same-day delivery available in most urban areas and 24-hour service for emergencies.
//                 </Typography>
//               </Box>
//             </Grid>
            
//             {/* Feature 3 - Expert Support */}
//             <Grid item xs={12} sm={6} md={4} sx={{ mx: { xs: 'auto', md: 0 } }}>
//               <Box 
//                 sx={{ 
//                   bgcolor: 'white',
//                   p: 4,
//                   height: '100%',
//                   borderRadius: 4,
//                   boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
//                   transition: 'all 0.4s ease',
//                   position: 'relative',
//                   overflow: 'hidden',
//                   '&:hover': {
//                     transform: 'translateY(-16px)',
//                     boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
//                   },
//                   '&:hover .icon-container': {
//                     transform: 'scale(1.1)',
//                     bgcolor: alpha('#4CAF50', 0.1)
//                   },
//                   '&:before': {
//                     content: '""',
//                     position: 'absolute',
//                     top: 0,
//                     left: 0,
//                     width: '100%',
//                     height: '4px',
//                     background: 'linear-gradient(90deg, #4CAF50, #81C784)',
//                     opacity: 0,
//                     transition: 'opacity 0.4s ease'
//                   },
//                   '&:hover:before': {
//                     opacity: 1
//                   }
//                 }}
//               >
//                 <Box 
//                   className="icon-container"
//                   sx={{ 
//                     width: '90px',
//                     height: '90px',
//                     borderRadius: '24px',
//                     bgcolor: alpha('#4CAF50', 0.06),
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     mb: 3,
//                     transition: 'all 0.3s ease',
//                   }}
//                 >
//                   <Box
//                     sx={{
//                       width: '70px',
//                       height: '70px',
//                       animation: 'float-gentle 3s infinite ease-in-out 1s',
//                     }}
//                   >
//                     <MedicalServices sx={{ fontSize: 45, color: '#4CAF50' }} />
//                   </Box>
//                 </Box>
                
//                 <Typography 
//                   variant="h5" 
//                   sx={{ 
//                     fontWeight: 700, 
//                     color: '#002F6C', 
//                     mb: 2,
//                     position: 'relative'
//                   }}
//                 >
//                   Expert Consultation
//                 </Typography>
                
//                 <Typography sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
//                   Our team of experienced pharmacists and healthcare professionals provides personalized guidance and answers your medication-related questions 24/7.
//                 </Typography>
//               </Box>
//             </Grid>
//           </Grid>
          
//           {/* Stats Counter with Animated Numbers */}
//           <Box 
//             sx={{ 
//               mt: 10, 
//               py: 6, 
//               px: { xs: 3, md: 8 }, 
//               borderRadius: 4, 
//               background: 'linear-gradient(135deg, #002F6C 0%, #01487E 100%)',
//               boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
//               color: 'white',
//               position: 'relative',
//               overflow: 'hidden'
//             }}
//           >
//             {/* Background Elements */}
//             <Box 
//               sx={{ 
//                 position: 'absolute',
//                 top: 0,
//                 right: 0,
//                 bottom: 0,
//                 left: 0,
//                 opacity: 0.05,
//                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//               }}
//             />
            
//             <Grid container spacing={4} sx={{ position: 'relative', zIndex: 2 }}>
//               <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
//                 <Box 
//                   sx={{ 
//                     display: 'flex', 
//                     flexDirection: 'column', 
//                     alignItems: 'center',
//                     animation: 'fadeInUp 0.8s ease-out both',
//                     '@keyframes fadeInUp': {
//                       '0%': { opacity: 0, transform: 'translateY(20px)' },
//                       '100%': { opacity: 1, transform: 'translateY(0)' }
//                     }
//                   }}
//                 >
//                   <Typography 
//                     variant="h2" 
//                     sx={{ 
//                       fontWeight: 800, 
//                       mb: 1,
//                       fontSize: { xs: '3rem', md: '3.5rem' },
//                       background: 'linear-gradient(90deg, #ffffff, #e0e0e0)',
//                       backgroundClip: 'text',
//                       WebkitBackgroundClip: 'text',
//                       WebkitTextFillColor: 'transparent'
//                     }}
//                   >
//                     <CounterAnimation end={98} suffix="%" />
//                   </Typography>
//                   <Typography variant="h6" fontWeight={500}>Customer Satisfaction</Typography>
//                 </Box>
//               </Grid>
              
//               <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
//                 <Box 
//                   sx={{ 
//                     display: 'flex', 
//                     flexDirection: 'column', 
//                     alignItems: 'center',
//                     animation: 'fadeInUp 0.8s ease-out 0.2s both'
//                   }}
//                 >
//                   <Typography 
//                     variant="h2" 
//                     sx={{ 
//                       fontWeight: 800, 
//                       mb: 1,
//                       fontSize: { xs: '3rem', md: '3.5rem' },
//                       background: 'linear-gradient(90deg, #ffffff, #e0e0e0)',
//                       backgroundClip: 'text',
//                       WebkitBackgroundClip: 'text',
//                       WebkitTextFillColor: 'transparent'
//                     }}
//                   >
//                     <CounterAnimation end={24} suffix="/7" />
//                   </Typography>
//                   <Typography variant="h6" fontWeight={500}>Customer Support</Typography>
//                 </Box>
//               </Grid>
              
//               <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
//                 <Box 
//                   sx={{ 
//                     display: 'flex', 
//                     flexDirection: 'column', 
//                     alignItems: 'center',
//                     animation: 'fadeInUp 0.8s ease-out 0.4s both'
//                   }}
//                 >
//                   <Typography 
//                     variant="h2" 
//                     sx={{ 
//                       fontWeight: 800, 
//                       mb: 1,
//                       fontSize: { xs: '3rem', md: '3.5rem' },
//                       background: 'linear-gradient(90deg, #ffffff, #e0e0e0)',
//                       backgroundClip: 'text',
//                       WebkitBackgroundClip: 'text',
//                       WebkitTextFillColor: 'transparent'
//                     }}
//                   >
//                     <CounterAnimation end={500} suffix="+" />
//                   </Typography>
//                   <Typography variant="h6" fontWeight={500}>Cities Covered</Typography>
//                 </Box>
//               </Grid>
//             </Grid>
//           </Box>
          
//           {/* Call to Action */}
//           <Box 
//             sx={{ 
//               display: 'flex', 
//               justifyContent: 'center', 
//               mt: 8,
//               animation: 'fadeInUp 0.8s ease-out 0.6s both'
//             }}
//           >
//             <Button 
//               variant="contained" 
//               size="large"
//               endIcon={<KeyboardArrowRight />}
//               onClick={() => scrollToSection('services')}
//               sx={{ 
//                 background: 'linear-gradient(45deg, #002F6C 0%, #01487E 100%)',
//                 color: 'white',
//                 '&:hover': { 
//                   background: 'linear-gradient(45deg, #01487E 0%, #002F6C 100%)',
//                   boxShadow: '0 8px 25px rgba(0, 47, 108, 0.5)',
//                   transform: 'translateY(-5px)'
//                 },
//                 transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
//                 px: 4,
//                 py: 1.5,
//                 borderRadius: '50px',
//                 fontWeight: 600,
//                 fontSize: '1.1rem',
//                 boxShadow: '0 5px 20px rgba(0, 47, 108, 0.3)'
//               }}
//             >
//               Explore Our Services
//             </Button>
//           </Box>
//         </Container>
//       </Box>
      
//       {/* Testimonials Section */}
//       <Box id="testimonials" sx={{ py: 8, bgcolor: '#f5f7fa' }}>
//         <Container maxWidth="lg">
//           <Box sx={{ textAlign: 'center', mb: 6 }}>
//             <Typography 
//               variant="h2" 
//               sx={{ 
//                 fontSize: { xs: '2rem', md: '2.5rem' }, 
//                 fontWeight: 700,
//                 color: '#002F6C',
//                 mb: 2
//               }}
//             >
//               What Our Customers Say
//             </Typography>
//             <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
//               Don't just take our word for it - hear from our satisfied customers
//             </Typography>
//           </Box>
          
//           <Box maxWidth="md" mx="auto">
//             <Fade in={fadeIn} timeout={500}>
//               <Paper 
//                 elevation={2} 
//                 sx={{ 
//                   p: 4, 
//                   borderRadius: 3,
//                   height: { xs: 'auto', md: 260 },
//                   display: 'flex',
//                   flexDirection: { xs: 'column', md: 'row' },
//                   alignItems: { xs: 'center', md: 'flex-start' },
//                   gap: 4
//                 }}
//               >
//                 <Box 
//                   sx={{ 
//                     display: 'flex', 
//                     flexDirection: 'column', 
//                     alignItems: 'center',
//                     flexShrink: 0
//                   }}
//                 >
//                   <Box 
//                     component="img" 
//                     src={testimonials[activeTestimonial].avatar} 
//                     alt={testimonials[activeTestimonial].name}
//                     sx={{ 
//                       width: 100, 
//                       height: 100, 
//                       borderRadius: '50%', 
//                       border: '4px solid #002F6C',
//                       objectFit: 'cover',
//                       mb: 2
//                     }}
//                   />
//                   <Rating 
//                     value={testimonials[activeTestimonial].rating} 
//                     readOnly 
//                     size="small" 
//                     sx={{ mb: 1 }}
//                   />
//                 </Box>
                
//                 <Box>
//                   <Typography 
//                     variant="body1" 
//                     sx={{ 
//                       fontStyle: 'italic', 
//                       mb: 3,
//                       color: 'text.secondary',
//                       fontSize: { xs: '1rem', md: '1.1rem' },
//                       lineHeight: 1.6
//                     }}
//                   >
//                     "{testimonials[activeTestimonial].text}"
//                   </Typography>
//                   <Typography variant="h6" fontWeight="bold" sx={{ color: '#002F6C' }}>
//                     {testimonials[activeTestimonial].name}
//                   </Typography>
//                   <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//                     {testimonials[activeTestimonial].role}
//                   </Typography>
//                 </Box>
//               </Paper>
//             </Fade>
            
//             <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
//               {testimonials.map((_, index) => (
//                 <Box
//                   key={index}
//                   onClick={() => {
//                     setFadeIn(false);
//                     setTimeout(() => {
//                       setActiveTestimonial(index);
//                       setFadeIn(true);
//                     }, 500);
//                   }}
//                   sx={{ 
//                     width: 12, 
//                     height: 12, 
//                     mx: 1, 
//                     borderRadius: '50%', 
//                     bgcolor: activeTestimonial === index ? '#002F6C' : '#d0d0d0',
//                     cursor: 'pointer',
//                     transition: 'all 0.3s ease'
//                   }}
//                 />
//               ))}
//             </Box>
//           </Box>
//         </Container>
//       </Box>
      
//       {/* FAQ Section */}
//       <Box id="faqs" sx={{ py: 8, bgcolor: 'white' }}>
//         <Container maxWidth="lg">
//           <Box sx={{ textAlign: 'center', mb: 6 }}>
//             <Typography 
//               variant="h2" 
//               sx={{ 
//                 fontSize: { xs: '2rem', md: '2.5rem' }, 
//                 fontWeight: 700,
//                 color: '#002F6C',
//                 mb: 2
//               }}
//             >
//               Frequently Asked Questions
//             </Typography>
//             <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto' }}>
//               Find answers to common questions about our services and products
//             </Typography>
//           </Box>
          
//           <Box maxWidth="md" mx="auto">
//             {faqs.map((faq, index) => (
//               <Accordion 
//                 key={index} 
//                 elevation={0}
//                 sx={{
//                   border: '1px solid #e0e0e0',
//                   mb: 2,
//                   '&:before': { display: 'none' },
//                   borderRadius: '8px !important',
//                   overflow: 'hidden',
//                   '&.Mui-expanded': {
//                     borderRadius: '8px !important',
//                   }
//                 }}
//               >
//                 <AccordionSummary 
//                   expandIcon={<ExpandMore sx={{ color: '#002F6C' }} />}
//                   sx={{
//                     '&.Mui-expanded': { bgcolor: alpha('#002F6C', 0.03) }
//                   }}
//                 >
//                   <Typography 
//                     variant="subtitle1" 
//                     fontWeight="600"
//                     sx={{ color: '#002F6C' }}
//                   >
//                     {faq.question}
//                   </Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                   <Typography variant="body1" sx={{ color: 'text.secondary' }}>
//                     {faq.answer}
//                   </Typography>
//                 </AccordionDetails>
//               </Accordion>
//             ))}
//           </Box>
//         </Container>
//       </Box>
      
//       {/* Call to Action */}
//       <Box 
//         sx={{ 
//           py: 8, 
//           bgcolor: '#D32F2F', 
//           color: 'white',
//           position: 'relative',
//           overflow: 'hidden'
//         }}
//       >
//         {/* Background decorative elements */}
//         <Box sx={{ position: 'absolute', right: -60, top: -60, width: 200, height: 200, bgcolor: alpha('#ffffff', 0.05), borderRadius: '50%' }} />
//         <Box sx={{ position: 'absolute', left: '30%', bottom: -80, width: 150, height: 150, bgcolor: alpha('#ffffff', 0.05), borderRadius: '50%' }} />
//         <Box sx={{ position: 'absolute', left: -30, top: '40%', width: 100, height: 100, bgcolor: alpha('#ffffff', 0.05), borderRadius: '50%' }} />
        
//         <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
//           <Box sx={{ textAlign: 'center' }}>
//             <Typography 
//               variant="h2" 
//               sx={{ 
//                 fontSize: { xs: '2rem', md: '2.5rem' }, 
//                 fontWeight: 700,
//                 mb: 2
//               }}
//             >
//               Ready to Experience Premium Healthcare?
//             </Typography>
//             <Typography 
//               variant="subtitle1" 
//               sx={{ 
//                 mb: 4, 
//                 maxWidth: 700, 
//                 mx: 'auto',
//                 opacity: 0.9
//               }}
//             >
//               Join thousands of satisfied customers who trust us with their health needs. Get started today!
//             </Typography>
//             <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
//               <Button 
//                 variant="contained" 
//                 size="large"
//                 onClick={() => scrollToSection('products')}
//                 sx={{ 
//                   bgcolor: 'white', 
//                   color: '#D32F2F',
//                   '&:hover': { bgcolor: '#f5f5f5' },
//                   px: 4,
//                   py: 1.5
//                 }}
//               >
//                 Shop Medicines
//               </Button>
//               <Button 
//                 variant="outlined" 
//                 size="large"
//                 onClick={() => scrollToSection('contact')}
//                 sx={{ 
//                   color: 'white', 
//                   borderColor: 'white',
//                   '&:hover': { 
//                     borderColor: 'white', 
//                     bgcolor: alpha('#ffffff', 0.1) 
//                   },
//                   px: 4,
//                   py: 1.5
//                 }}
//               >
//                 Contact Support
//               </Button>
//             </Box>
//           </Box>
//         </Container>
//       </Box>
      
//       {/* Footer */}
//       <Box id="contact" sx={{ bgcolor: '#002F6C', color: 'white', pt: 8, pb: 4 }}>
//         <Container maxWidth="lg">
//           <Grid container spacing={4}>
//             <Grid item xs={12} md={4}>
//               <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
//                 MediPlus
//               </Typography>
//               <Typography variant="body2" sx={{ mb: 3, color: alpha('#ffffff', 0.7) }}>
//                 Providing quality healthcare products with quick and reliable delivery services since 2015. Your trusted partner for all your medical needs.
//               </Typography>
//               <Box sx={{ display: 'flex', gap: 2 }}>
//                 <IconButton size="small" sx={{ color: 'white', bgcolor: alpha('#ffffff', 0.1), '&:hover': { bgcolor: alpha('#ffffff', 0.2) } }}>
//                   <Facebook fontSize="small" />
//                 </IconButton>
//                 <IconButton size="small" sx={{ color: 'white', bgcolor: alpha('#ffffff', 0.1), '&:hover': { bgcolor: alpha('#ffffff', 0.2) } }}>
//                   <Twitter fontSize="small" />
//                 </IconButton>
//                 <IconButton size="small" sx={{ color: 'white', bgcolor: alpha('#ffffff', 0.1), '&:hover': { bgcolor: alpha('#ffffff', 0.2) } }}>
//                   <Instagram fontSize="small" />
//                 </IconButton>
//               </Box>
//             </Grid>
            
//             <Grid item xs={6} sm={3} md={2}>
//               <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 3 }}>
//                 Quick Links
//               </Typography>
//               <List disablePadding dense>
//                 <ListItem sx={{ px: 0, py: 0.5 }}>
//                   <Button variant="text" sx={{ color: alpha('#ffffff', 0.7), '&:hover': { color: 'white' }, p: 0, justifyContent: 'flex-start', textTransform: 'none' }}>
//                     Home
//                   </Button>
//                 </ListItem>
//                 <ListItem sx={{ px: 0, py: 0.5 }}>
//                   <Button variant="text" sx={{ color: alpha('#ffffff', 0.7), '&:hover': { color: 'white' }, p: 0, justifyContent: 'flex-start', textTransform: 'none' }}>
//                     Products
//                   </Button>
//                 </ListItem>
//                 <ListItem sx={{ px: 0, py: 0.5 }}>
//                   <Button variant="text" sx={{ color: alpha('#ffffff', 0.7), '&:hover': { color: 'white' }, p: 0, justifyContent: 'flex-start', textTransform: 'none' }}>
//                     Services
//                   </Button>
//                 </ListItem>
//                 <ListItem sx={{ px: 0, py: 0.5 }}>
//                   <Button variant="text" sx={{ color: alpha('#ffffff', 0.7), '&:hover': { color: 'white' }, p: 0, justifyContent: 'flex-start', textTransform: 'none' }}>
//                     About Us
//                   </Button>
//                 </ListItem>
//                 <ListItem sx={{ px: 0, py: 0.5 }}>
//                   <Button variant="text" sx={{ color: alpha('#ffffff', 0.7), '&:hover': { color: 'white' }, p: 0, justifyContent: 'flex-start', textTransform: 'none' }}>
//                     Contact
//                   </Button>
//                 </ListItem>
//               </List>
//             </Grid>
            
//             <Grid item xs={6} sm={3} md={2}>
//               <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 3 }}>
//                 Support
//               </Typography>
//               <List disablePadding dense>
//                 <ListItem sx={{ px: 0, py: 0.5 }}>
//                   <Button variant="text" sx={{ color: alpha('#ffffff', 0.7), '&:hover': { color: 'white' }, p: 0, justifyContent: 'flex-start', textTransform: 'none' }}>
//                     FAQ
//                   </Button>
//                 </ListItem>
//                 <ListItem sx={{ px: 0, py: 0.5 }}>
//                   <Button variant="text" sx={{ color: alpha('#ffffff', 0.7), '&:hover': { color: 'white' }, p: 0, justifyContent: 'flex-start', textTransform: 'none' }}>
//                     Shipping Policy
//                   </Button>
//                 </ListItem>
//                 <ListItem sx={{ px: 0, py: 0.5 }}>
//                   <Button variant="text" sx={{ color: alpha('#ffffff', 0.7), '&:hover': { color: 'white' }, p: 0, justifyContent: 'flex-start', textTransform: 'none' }}>
//                     Return Policy
//                   </Button>
//                 </ListItem>
//                 <ListItem sx={{ px: 0, py: 0.5 }}>
//                   <Button variant="text" sx={{ color: alpha('#ffffff', 0.7), '&:hover': { color: 'white' }, p: 0, justifyContent: 'flex-start', textTransform: 'none' }}>
//                     Privacy Policy
//                   </Button>
//                 </ListItem>
//                 <ListItem sx={{ px: 0, py: 0.5 }}>
//                   <Button variant="text" sx={{ color: alpha('#ffffff', 0.7), '&:hover': { color: 'white' }, p: 0, justifyContent: 'flex-start', textTransform: 'none' }}>
//                     Terms & Conditions
//                   </Button>
//                 </ListItem>
//               </List>
//             </Grid>
            
//             <Grid item xs={12} sm={6} md={4}>
//               <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 3 }}>
//                 Contact Us
//               </Typography>
//               <List disablePadding>
//                 <ListItem sx={{ px: 0, py: 1 }}>
//                   <ListItemIcon sx={{ minWidth: 36, color: alpha('#ffffff', 0.7) }}>
//                     <LocationOn fontSize="small" />
//                   </ListItemIcon>
//                   <ListItemText 
//                     primary="123 Healthcare Street, Medical District, MD 12345" 
//                     sx={{ 
//                       '& .MuiListItemText-primary': { 
//                         color: alpha('#ffffff', 0.7),
//                         fontSize: '0.9rem'
//                       } 
//                     }} 
//                   />
//                 </ListItem>
//                 <ListItem sx={{ px: 0, py: 1 }}>
//                   <ListItemIcon sx={{ minWidth: 36, color: alpha('#ffffff', 0.7) }}>
//                     <Email fontSize="small" />
//                   </ListItemIcon>
//                   <ListItemText 
//                     primary="info@mediplus.com" 
//                     sx={{ 
//                       '& .MuiListItemText-primary': { 
//                         color: alpha('#ffffff', 0.7),
//                         fontSize: '0.9rem'
//                       } 
//                     }} 
//                   />
//                 </ListItem>
//                 <ListItem sx={{ px: 0, py: 1 }}>
//                   <ListItemIcon sx={{ minWidth: 36, color: alpha('#ffffff', 0.7) }}>
//                     <Phone fontSize="small" />
//                   </ListItemIcon>
//                   <ListItemText 
//                     primary="(123) 456-7890" 
//                     sx={{ 
//                       '& .MuiListItemText-primary': { 
//                         color: alpha('#ffffff', 0.7),
//                         fontSize: '0.9rem'
//                       } 
//                     }} 
//                   />
//                 </ListItem>
//                 <ListItem sx={{ px: 0, py: 1 }}>
//                   <ListItemIcon sx={{ minWidth: 36, color: alpha('#ffffff', 0.7) }}>
//                     <AccessTime fontSize="small" />
//                   </ListItemIcon>
//                   <ListItemText 
//                     primary="Mon-Sat: 9AM-9PM, Sun: 10AM-6PM" 
//                     sx={{ 
//                       '& .MuiListItemText-primary': { 
//                         color: alpha('#ffffff', 0.7),
//                         fontSize: '0.9rem'
//                       } 
//                     }} 
//                   />
//                 </ListItem>
//               </List>
              
//               <Box sx={{ mt: 2 }}>
//                 <Typography variant="subtitle2" sx={{ mb: 1 }}>
//                   Subscribe to our newsletter
//                 </Typography>
//                 <Box sx={{ display: 'flex' }}>
//                   <TextField 
//                     size="small"
//                     placeholder="Your email"
//                     variant="outlined"
//                     fullWidth
//                     sx={{
//                       bgcolor: alpha('#ffffff', 0.07),
//                       borderRadius: '4px 0 0 4px',
//                       '& .MuiOutlinedInput-root': {
//                         color: 'white',
//                         '& fieldset': {
//                           borderColor: 'transparent',
//                           borderRight: 'none'
//                         },
//                         '&:hover fieldset': {
//                           borderColor: alpha('#ffffff', 0.3),
//                           borderRight: 'none'
//                         },
//                         '&.Mui-focused fieldset': {
//                           borderColor: alpha('#ffffff', 0.5),
//                           borderRight: 'none'
//                         }
//                       },
//                       '& .MuiInputBase-input::placeholder': {
//                         color: alpha('#ffffff', 0.5),
//                         opacity: 1
//                       }
//                     }}
//                   />
//                   <Button 
//                     variant="contained" 
//                     sx={{ 
//                       bgcolor: '#D32F2F', 
//                       '&:hover': { bgcolor: '#b71c1c' },
//                       borderRadius: '0 4px 4px 0'
//                     }}
//                   >
//                     <ArrowForward />
//                   </Button>
//                 </Box>
//               </Box>
//             </Grid>
//           </Grid>
          
//           <Divider sx={{ my: 4, borderColor: alpha('#ffffff', 0.1) }} />
          
//           <Typography variant="body2" sx={{ textAlign: 'center', color: alpha('#ffffff', 0.6) }}>
//             &copy; {new Date().getFullYear()} MediPlus. All rights reserved. Created with care for your health.
//           </Typography>
//         </Container>
//       </Box>
//     </Box>
//   );
// };

// export default LandingPage;
"use client";
import React, { useState, useEffect, useRef } from "react";
import NavBar from "../components/NavBar";
import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
} from "@mui/material";


// // NavBar Component
// const NavBar = ({ loginButton = false }) => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!mobileMenuOpen);
//   };

//   return (
    
//     <header className="bg-white fixed top-0 w-full z-50">
//       <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
//         <div className="flex items-center">
//           <a href="#home" className="text-2xl font-bold text-primary font-heading flex items-center">
//             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-[#FF6B6B]">
//               <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
//             </svg>
//             <span>HealthCare</span>
//           </a>
//         </div>
        
//         {/* Mobile Menu Button */}
//         <button 
//           id="mobile-menu-button" 
//           className="lg:hidden text-gray-600 focus:outline-none" 
//           aria-label="Toggle menu"
//           onClick={toggleMobileMenu}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//           </svg>
//         </button>
        
//         {/* Desktop Navigation */}
//         <div className="hidden lg:flex items-center space-x-8">
//           <a href="#home" className="text-primary font-medium hover:text-accent transition-colors">Home</a>
//           <a href="#services" className="text-gray-700 font-medium hover:text-primary transition-colors">Services</a>
//           <a href="#doctors" className="text-gray-700 font-medium hover:text-primary transition-colors">Our Doctors</a>
//           <a href="#about" className="text-gray-700 font-medium hover:text-primary transition-colors">About Us</a>
//           <a href="#testimonials" className="text-gray-700 font-medium hover:text-primary transition-colors">Testimonials</a>
//           <a href="#contact" className="text-gray-700 font-medium hover:text-primary transition-colors">Contact</a>
//           {loginButton && (
//             <a 
//               href="#contact"
//               className="bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white px-4 py-2 rounded-md font-medium transition-colors"
//             >
//               Contact Us
//             </a>
//           )}
//         </div>
//       </nav>
      
//       {/* Mobile Navigation Menu */}
//       <div id="mobile-menu" className={`lg:hidden bg-white shadow-lg pb-4 ${mobileMenuOpen ? 'block' : 'hidden'}`}>
//         <div className="container mx-auto px-4 flex flex-col space-y-4">
//           <a href="#home" className="text-primary font-medium py-2 border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>Home</a>
//           <a href="#services" className="text-gray-700 font-medium py-2 border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>Services</a>
//           <a href="#doctors" className="text-gray-700 font-medium py-2 border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>Our Doctors</a>
//           <a href="#about" className="text-gray-700 font-medium py-2 border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>About Us</a>
//           <a href="#testimonials" className="text-gray-700 font-medium py-2 border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>Testimonials</a>
//           <a href="#contact" className="text-gray-700 font-medium py-2 border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>Contact</a>
//           {loginButton && (
//             <a 
//               href="#contact"
//               className="bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white px-4 py-2 rounded-md text-center font-medium"
//               onClick={() => setMobileMenuOpen(false)}
//             >
//               Contact Us
//             </a>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };
<NavBar loginButton={true}  />

const LandingPage = () => {

 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const [itemWidth, setItemWidth] = useState(100);
  const testimonialContainerRef = useRef(null);

  // Features section data
  const features = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary text-2xl">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      ),
      title: "Expert Doctors",
      description: "Specialized care"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4ECDC4] text-2xl">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      ),
      title: "24/7 Support",
      description: "Always available"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FF6B6B] text-2xl">
          <path d="M18 6h-5a2 2 0 0 0-2 2v9a2 2 0 0 1-2 2H4"></path>
          <path d="M10 18V8a2 2 0 0 1 2-2h6"></path>
        </svg>
      ),
      title: "Modern Equipment",
      description: "Latest technology"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 text-2xl">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      ),
      title: "Quality Care",
      description: "Patient-centered"
    }
  ];

  // Services section data
  const services = [
    {
      id: 1,
      title: "Cardiology",
      description: "Comprehensive heart care including diagnosis, treatment, and prevention of cardiovascular diseases.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary text-xl">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Neurology",
      description: "Specialized care for disorders of the nervous system, including the brain, spinal cord, and nerves.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary text-xl">
          <path d="M21.8 18.4l-2.8-2.8c.2-.4.3-.8.3-1.2.1-1.5-1.1-2.7-2.6-2.6-.4 0-.8.1-1.2.3l-1.9-1.9c1.4-1.2 2.3-2.9 2.3-4.7 0-3.3-2.7-6-6-6-3.4 0-5.9 2.6-6 6v.1c0 1.8.8 3.5 2.3 4.7l-1.9 1.9c-.4-.2-.8-.3-1.2-.3C1.6 12 .4 13.2.5 14.7c0 .4.1.8.3 1.2L0 18.7c-.1.1 0 .2 0 .3 0 .1.1.2.2.2h.3l2-1 2 1h.3c.1 0 .2-.1.2-.2v-.3l-.8-2.9c.4-.3.7-.6.9-1.1.5-.9.4-2-.3-2.7l1.9-1.9c.6.3 1.2.5 1.9.5.7 0 1.3-.2 1.9-.5l1.9 1.9c-.6.7-.8 1.8-.3 2.7.2.4.6.8.9 1.1l-.8 2.9v.3c0 .1.1.2.2.2h.3l2-1 2 1h.3c.1 0 .2-.1.2-.2v-.3l-.8-2.8z"></path>
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Pediatrics",
      description: "Comprehensive healthcare for infants, children, and adolescents focusing on growth and development.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary text-xl">
          <path d="M9 12h0.01M15 12h0.01M10 16c.5.3 1.1.5 2 .5s1.5-.2 2-.5"></path>
          <path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"></path>
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "Orthopedics",
      description: "Treatment of conditions involving the musculoskeletal system, including joints, bones, and muscles.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary text-xl">
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1620504155085-d7b35c8618f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "Dentistry",
      description: "Comprehensive dental care including preventive, restorative, and cosmetic procedures for all ages.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary text-xl">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 6a2 2 0 0 0 2 3c2 1 3 2.5 3 4s-1 3-3 3a2 2 0 0 1-2 2 2 2 0 0 1-2-2c-2 0-3-1.5-3-3s1-3 3-4a2 2 0 0 0 2-3"></path>
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1616391182219-e080b4d1043a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      title: "Ophthalmology",
      description: "Specialized care for eye health including diagnosis and treatment of eye disorders and diseases.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary text-xl">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    }
  ];

  // Doctors section data
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Neurologist",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrician",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "Orthopedic Surgeon",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
    }
  ];

  // Testimonials section data
  const testimonials = [
    {
      id: 1,
      name: "Rebecca Thompson",
      role: "Cardiac Patient",
      content: "The care I received at HealthCare Medical Center was exceptional. The doctors were knowledgeable and took the time to explain everything to me. The staff was friendly and made me feel comfortable throughout my stay.",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      rating: 5
    },
    {
      id: 2,
      name: "David Martinez",
      role: "Parent of Patients",
      content: "I've been bringing my children to HealthCare for years. The pediatricians are amazing with kids and provide excellent care. The facility is clean and welcoming. I wouldn't trust anyone else with my family's health.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      rating: 5
    },
    {
      id: 3,
      name: "Jennifer Lee",
      role: "Orthopedic Patient",
      content: "After my surgery, the rehabilitation program at HealthCare was instrumental in my recovery. The therapists were skilled and supportive, pushing me to achieve my goals while ensuring my comfort and safety.",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      rating: 4.5
    }
  ];

  // Contact details section data
  const contactDetails = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary text-2xl">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      ),
      title: "Our Location",
      details: "123 Medical Plaza Dr.\nHealthville, CA 90210\nUnited States"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary text-2xl">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      ),
      title: "Phone Number",
      details: "Main: +1 (555) 123-4567\nEmergency: +1 (555) 911-0000\nFax: +1 (555) 123-4568"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary text-2xl">
          <rect width="20" height="16" x="2" y="4" rx="2"></rect>
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
        </svg>
      ),
      title: "Email Address",
      details: "info@healthcare.com\nappointments@healthcare.com\nsupport@healthcare.com"
    }
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const updateItemWidth = () => {
    if (window.innerWidth >= 1024) {
      setItemWidth(33.333);
    } else if (window.innerWidth >= 768) {
      setItemWidth(50);
    } else {
      setItemWidth(100);
    }
  };

  useEffect(() => {
    // Set page title
    document.title = "HealthCare - Medical Center";
    
    // Update testimonial carousel width based on screen size
    updateItemWidth();
    window.addEventListener('resize', updateItemWidth);
    
    // Add smooth scrolling for anchor links
    const handleAnchorClick = (e) => {
      const target = e.target;
      const anchorElement = target.closest('a[href^="#"]');
      
      if (anchorElement) {
        e.preventDefault();
        
        const targetId = anchorElement.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    
    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('resize', updateItemWidth);
    };
  }, []);

  const nextSlide = () => {
    const totalSlides = testimonials.length;
    const viewportSize = window.innerWidth;
    let maxIndex;
    
    if (viewportSize >= 1024) {
      maxIndex = totalSlides - 3;
    } else if (viewportSize >= 768) {
      maxIndex = totalSlides - 2;
    } else {
      maxIndex = totalSlides - 1;
    }
    
    maxIndex = Math.max(0, maxIndex);
    setCurrentTestimonialIndex(prevIndex => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    const totalSlides = testimonials.length;
    const viewportSize = window.innerWidth;
    let maxIndex;
    
    if (viewportSize >= 1024) {
      maxIndex = totalSlides - 3;
    } else if (viewportSize >= 768) {
      maxIndex = totalSlides - 2;
    } else {
      maxIndex = totalSlides - 1;
    }
    
    maxIndex = Math.max(0, maxIndex);
    setCurrentTestimonialIndex(prevIndex => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
  };

  const renderStars = (rating) => {
    return (
      <div className="text-[#FF6B6B] flex">
        {[...Array(Math.floor(rating))].map((_, i) => (
          <svg key={i} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        ))}
        {rating % 1 > 0 && (
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-white"></div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <NavBar loginButton={true} />
      
      {/* Main Content */}
      <main>
        <Box
      id="home"
      sx={{
        mt: 0,
        pt: { xs: "64px", md: "64px" },
        minHeight: { xs: "500px", md: "600px" },
        backgroundColor: "#0F1A3A",
        position: "relative",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Left Content */}
      <Container
        sx={{
          position: "relative",
          zIndex: 2,
          width: { xs: "100%", md: "60%" },
          py: { xs: 4, md: 8 },
          px: { xs: 3, md: 6 },
          ml: "10px",
          color: "white",
          marginLeft:"6px",
        }}
      >
        <Box sx={{ maxWidth: "680px" }}>
          <Typography
            variant="subtitle1"
            sx={{
              color: "#FF6B6B",
              fontWeight: 700,
              mb: 2,
              letterSpacing: "1.5px",
              fontSize: "1.1rem",
            }}
          >
            YOUR HEALTH IS OUR PRIORITY
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              mb: 3,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              lineHeight: 1.2,
            }}
          >
            Comprehensive Medical Care For Your Family
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.9)",
              fontSize: { xs: "1.1rem", md: "1.25rem" },
              mb: 4,
              lineHeight: 1.7,
            }}
          >
            Our team of board-certified physicians provides personalized healthcare 
            solutions for patients of all ages with cutting-edge medical technology.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button
              href="#services"
              variant="contained"
              sx={{
                backgroundColor: "#FF6B6B",
                "&:hover": { backgroundColor: "#E05555" },
                px: 4,
                py: 1.5,
                fontWeight: 600,
                fontSize: "1rem",
                borderRadius: "8px",
                minWidth: "160px",
              }}
            >
              Our Services
            </Button>

            <Button
              href="#about"
              variant="outlined"
              sx={{
                borderColor: "white",
                borderWidth: 2,
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  borderColor: "white",
                },
                px: 4,
                py: 1.5,
                fontWeight: 600,
                fontSize: "1rem",
                borderRadius: "8px",
                minWidth: "160px",
              }}
            >
              About Us
            </Button>
          </Stack>
        </Box>
      </Container>

      {/* Right Video with mix-blend-mode */}
      <Box
        sx={{
          position: "absolute",
          right: 0,
          top: 0,
          height: "100%",
          width: { xs: "100%", md: "50%" },
          zIndex: 1,
          overflow: "hidden",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
            mixBlendMode: "darken", // try "screen", "multiply", or "overlay" too
            opacity: 0.9,
            backgroundColor: "#0F1A3A",
          }}
        >
          <source
            src="https://video-previews.elements.envatousercontent.com/09f79677-748f-4f1f-965b-74d3f47c934d/watermarked_preview/watermarked_preview.mp4"
            type="video/mp4"
          />
        </video>
      </Box>
    </Box>
        {/* Features Banner */}
        <section className="bg-white py-10 shadow-md">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`bg-${index === 0 ? 'primary' : index === 1 ? '[#4ECDC4]' : index === 2 ? '[#FF6B6B]' : 'gray-700'}/10 p-4 rounded-full`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 font-heading">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Services Section */}
        <section id="services" className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-primary font-medium mb-2">Our Medical Services</p>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-800">
                Comprehensive Healthcare Services
              </h2>
              <div className="w-24 h-1 bg-[#FF6B6B] mx-auto mt-4"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div 
                  key={service.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-lg"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={`${service.title} Department`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 font-heading text-gray-800">{service.title}</h3>
                    <p className="text-gray-600 mb-4">
                      {service.description}
                    </p>
                    <a href={`#services-${service.id}`} className="text-primary font-medium flex items-center hover:text-[#FF6B6B] transition-colors">
                      Learn More
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 ml-2" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <a 
                href="#services" 
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-md inline-block font-medium transition-colors"
              >
                View All Services
              </a>
            </div>
          </div>
        </section>
        
        {/* About Section */}
        <section id="about" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <p className="text-primary font-medium mb-2">About Us</p>
                <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-800 mb-6">
                  Providing Quality Healthcare Since 1995
                </h2>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  At HealthCare Medical Center, we are dedicated to providing exceptional healthcare services to our community. With a team of highly skilled doctors, state-of-the-art facilities, and a patient-centered approach, we strive to improve the health and wellbeing of every individual we serve.
                </p>
                
                <div className="space-y-4 mb-8">
                  {["Experienced team of medical professionals", 
                    "Advanced diagnostic and treatment technologies", 
                    "Compassionate and patient-centered care", 
                    "Comprehensive range of medical services"].map((feature, index) => (
                    <div key={index} className="flex items-start">
                      <div className="text-[#FF6B6B] mr-3 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <p className="text-gray-600">{feature}</p>
                    </div>
                  ))}
                </div>
                
                <a 
                  href="#doctors" 
                  className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md inline-block font-medium transition-colors"
                >
                  Meet Our Doctors
                </a>
              </div>
              
              <div className="order-1 lg:order-2 relative">
                <img 
                  src="https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=900&q=80" 
                  alt="Medical Staff at HealthCare Medical Center" 
                  className="rounded-lg shadow-xl w-full h-auto max-h-[500px] object-cover"
                />
                <div className="absolute -bottom-5 -left-5 bg-[#FF6B6B] text-white p-4 rounded-lg shadow-lg hidden md:block">
                  <div className="font-heading font-bold text-3xl mb-1">25+</div>
                  <div className="text-sm">Years of Experience</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Doctors Section */}
        <section id="doctors" className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-primary font-medium mb-2">Our Medical Team</p>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-800">
                Meet Our Expert Doctors
              </h2>
              <div className="w-24 h-1 bg-[#FF6B6B] mx-auto mt-4"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {doctors.map((doctor) => (
                <div 
                  key={doctor.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 hover:shadow-lg group"
                >
                  <div className="h-64 overflow-hidden relative">
                    <img 
                      src={doctor.image} 
                      alt={doctor.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-primary/80 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a href="#" className="text-white hover:text-[#FF6B6B]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                      </a>
                      <a href="#" className="text-white hover:text-[#FF6B6B]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                        </svg>
                      </a>
                      <a href="#" className="text-white hover:text-[#FF6B6B]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect width="4" height="12" x="2" y="9"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-xl font-bold font-heading text-gray-800">{doctor.name}</h3>
                    <p className="text-primary mb-2">{doctor.specialty}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-primary font-medium mb-2">Patient Testimonials</p>
              <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-800">
                What Our Patients Say
              </h2>
              <div className="w-24 h-1 bg-[#FF6B6B] mx-auto mt-4"></div>
            </div>
            
            <div className="relative">
              <div 
                ref={testimonialContainerRef}
                className="testimonial-container overflow-x-hidden flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonialIndex * itemWidth}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div 
                    key={testimonial.id} 
                    className="min-w-full md:min-w-[50%] lg:min-w-[33.333%] p-4"
                  >
                    <div className="bg-white p-6 rounded-lg shadow-md h-full">
                      <div className="flex items-center mb-4">
                        {renderStars(testimonial.rating)}
                      </div>
                      <p className="text-gray-600 mb-6 italic">
                        "{testimonial.content}"
                      </p>
                      <div className="flex items-center">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="w-12 h-12 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h4 className="font-bold text-gray-800 font-heading">{testimonial.name}</h4>
                          <p className="text-gray-500 text-sm">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button 
                className="absolute top-1/2 -left-4 -translate-y-1/2 bg-white p-3 rounded-full shadow-md text-primary hover:text-[#FF6B6B] focus:outline-none hidden md:block" 
                aria-label="Previous testimonial"
                onClick={prevSlide}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              
              <button 
                className="absolute top-1/2 -right-4 -translate-y-1/2 bg-white p-3 rounded-full shadow-md text-primary hover:text-[#FF6B6B] focus:outline-none hidden md:block" 
                aria-label="Next testimonial"
                onClick={nextSlide}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
            
            <div className="flex justify-center mt-8 md:hidden">
              <button 
                className="bg-white p-3 rounded-full shadow-md text-primary hover:text-[#FF6B6B] focus:outline-none mx-2" 
                aria-label="Previous testimonial"
                onClick={prevSlide}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              
              <button 
                className="bg-white p-3 rounded-full shadow-md text-primary hover:text-[#FF6B6B] focus:outline-none mx-2" 
                aria-label="Next testimonial"
                onClick={nextSlide}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
<section id="contact" className="py-16 bg-gray-100">
  <div className="container mx-auto px-4">
    {/* Section Header */}
    <div className="text-center mb-12">
      <p className="text-primary font-medium mb-2">Get In Touch</p>
      <h2 className="text-3xl md:text-4xl font-bold font-heading text-gray-800">
        Contact Us
      </h2>
      <div className="w-24 h-1 bg-[#FF6B6B] mx-auto mt-4"></div>
    </div>
    
    {/* Contact Cards */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
      {contactDetails.map((item, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            {item.icon}
          </div>
          <h3 className="text-xl font-bold font-heading text-gray-800 mb-2">{item.title}</h3>
          <p className="text-gray-600 whitespace-pre-line">
            {item.details}
          </p>
        </div>
      ))}
    </div>
    
    {/* Map Container */}
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-[400px] w-full relative">
        {/* Google Maps Iframe */}
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.7152203584424!2d-118.24368848478973!3d34.05297998060799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c648d9808fbd%3A0xabc7cabc37d719d5!2s123%20S%20Main%20St%2C%20Los%20Angeles%2C%20CA%2090012%2C%20USA!5e0!3m2!1sen!2sus!4v1656526152776!5m2!1sen!2sus" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps"
          className="absolute inset-0"
        ></iframe>
        
        {/* Fallback content in case map doesn't load */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 hidden">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="48" 
            height="48" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-primary mb-4"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <h3 className="text-xl font-bold mb-2 text-gray-800">Our Location</h3>
          <p className="text-gray-600 text-center whitespace-pre-line">
            123 Medical Plaza Dr.<br />
            Healthville, CA 90210<br />
            United States
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

        
        
        {/* Newsletter Section */}
<section className="bg-[#2F6DA3] py-12">
  <div className="container mx-auto px-4">
    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
      
      {/* Left Text Block */}
      <div className="text-white max-w-xl">
        <h2 className="text-3xl font-bold mb-2">Subscribe to Our Newsletter</h2>
        <p className="text-white/90 text-lg">
          Stay updated with our latest health tips, services, and special offers.
        </p>
      </div>

      {/* Input and Button */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md lg:max-w-lg">
        <input 
          type="email" 
          placeholder="Your Email Address" 
          className="px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF6B6B] w-full text-black"
        />
        <button 
          type="button" 
          className="bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white px-6 py-3 rounded-md font-semibold whitespace-nowrap"
        >
          Subscribe
        </button>
      </div>
    </div>
  </div>
</section>

      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <a href="#home" className="text-2xl font-bold font-heading flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-[#FF6B6B]">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                <span>HealthCare</span>
              </a>
              <p className="text-gray-400 mb-6">
                Providing quality healthcare services for over 25 years. Your health is our priority.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-[#FF6B6B] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-[#FF6B6B] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-[#FF6B6B] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-[#FF6B6B] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold font-heading mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Our Services</a></li>
                <li><a href="#doctors" className="text-gray-400 hover:text-white transition-colors">Our Doctors</a></li>
                <li><a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Testimonials</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold font-heading mb-4">Services</h3>
              <ul className="space-y-3">
                <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Cardiology</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Neurology</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Pediatrics</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Orthopedics</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Dentistry</a></li>
                <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Ophthalmology</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold font-heading mb-4">Working Hours</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-gray-400">Monday - Friday:</span>
                  <span className="text-white">8:00 AM - 7:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Saturday:</span>
                  <span className="text-white">9:00 AM - 5:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Sunday:</span>
                  <span className="text-white">Closed</span>
                </li>
                <li className="pt-2">
                  <a 
                    href="#contact" 
                    className="bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white px-4 py-2 rounded-md inline-block mt-2 font-medium transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400">
                &copy; {new Date().getFullYear()} HealthCare Medical Center. All Rights Reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Button (mobile) */}
        <div className="fixed bottom-6 right-6 lg:hidden z-40">
          <a 
            href="#contact" 
            className="bg-[#FF6B6B] hover:bg-[#FF6B6B]/90 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
