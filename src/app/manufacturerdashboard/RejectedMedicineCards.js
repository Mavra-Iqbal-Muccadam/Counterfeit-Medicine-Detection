"use client";
import { useState, useEffect } from "react";
import { fetchMedicinesByStatus } from "../testingblockchain/medicinework/accepted-rejected/fetch";
import MedicineCard from "../components/MedicineCard";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const RejectedMedicineCards = ({ onCardClick }) => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    setLoading(true);
    try {
      const medicines = await fetchMedicinesByStatus("Rejected");
      setMedicines(medicines);
    } catch (error) {
      console.error('Error fetching rejected medicines:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (medicines.length === 0) {
    return (
      <Typography sx={{ textAlign: "center", mt: 4 }}>
        No rejected medicines found
      </Typography>
    );
  }

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(240px, 1fr))", gap: 3 }}>
      {medicines.map((medicine) => (
        <MedicineCard 
          key={medicine.tokenId} 
          medicine={medicine} 
          onCardClick={onCardClick}
        />
      ))}
    </Box>
  );
};

export default RejectedMedicineCards;