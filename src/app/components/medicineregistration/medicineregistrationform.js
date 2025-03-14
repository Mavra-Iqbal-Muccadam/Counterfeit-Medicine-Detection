import React, { useState } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import VisuallyHiddenInput from './uploadbutton.js'
import FormPropsTextFields from './textfield.js'
import ManufactureDateInput from './date.js'
import Composition from './composition.js'; 
import Checkboxes from './dosageform.js';
import MultilineTextFields from './description.js';

export default function SimpleContainer() {

  const [selectedDosageForms, setSelectedDosageForms] = useState([]);

  const handleDosageChange = (selected) => {
    setSelectedDosageForms(selected);
  };

  const handleSubmit = () => {
    console.log("Selected Dosage Forms:", selectedDosageForms);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
      maxWidth="sm"
      sx={{
        bgcolor: "pink",
        minHeight: "100vh", // Ensures it covers full height if content is small
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // Centers content vertically
        alignItems: "center", // Centers horizontally
        padding: 2,
      }}
    >

      <VisuallyHiddenInput />
      <FormPropsTextFields label="Medicine Name" />
      <FormPropsTextFields label="Batch Number" />
      <ManufactureDateInput label="Manufacture Date" />
      <ManufactureDateInput label="Expiry Date" />
      <Composition />
      <Checkboxes onChange={handleDosageChange} />
      <ManufactureDateInput label="Expiry Date" />
      <VisuallyHiddenInput />
      <MultilineTextFields />



        
      
      </Container>
    </React.Fragment>
  );
}