import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Image from "next/image";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
const PendingMedicinesChart = () => {
  const data = [
    { name: "Capsules", Capsules: 10 },
    { name: "Tablets", Tablets: 20 },
    { name: "Antibiotics", Antibiotics: 15 },
    { name: "Drugs", Drugs: 25 },
  ];

  return (
    <Box
      sx={{
        padding: '15px',
        borderRadius: '15px',
        background: 'rgba(255, 255, 255, 0.6)',
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.2)',
        flex: 1,
        backdropFilter: "blur(25px)",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0px 15px 35px rgba(0, 0, 0, 0.3)',
        },
      }}
    >
      <Typography variant="h6" sx={{ textAlign: "center", color: "#000000" }}>Pending Medicines</Typography>
      <BarChart width={200} height={200} data={data}>
        <XAxis width={150} dataKey="name" tick={{ fill: "#000000" }} />
        <YAxis tick={{ fill: "#000000" }} />
        <Tooltip formatter={(value, name) => [`${value} pending`, name]} />
        <Bar dataKey="Capsules" fill="#3357FF" name="Capsules" barSize={20} />
        <Bar dataKey="Tablets" fill="#FFA500" name="Tablets" barSize={20} />
        <Bar dataKey="Antibiotics" fill="#a812e3" name="Antibiotics" barSize={20} />
        <Bar dataKey="Drugs" fill="#E91E63" name="Drugs" barSize={20} />
      </BarChart>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
        {data.map((_, index) => (
          <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ width: 15, height: 15, backgroundColor: ["#3357FF", "#FFA500", "#a812e3", "#E91E63"][index], borderRadius: 2 }}></Box>
            <Typography variant="body2" sx={{ color: "#000000" }}>{["Capsules", "Tablets", "Antibiotics", "Drugs"][index]}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default PendingMedicinesChart;