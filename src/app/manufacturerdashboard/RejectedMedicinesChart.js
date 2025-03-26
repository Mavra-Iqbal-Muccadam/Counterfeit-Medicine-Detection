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
const RejectedMedicinesChart = () => {
  const data = [
    { name: "Capsules", value: 5, color: "#3357FF" },
    { name: "Tablets", value: 10, color: "#FFA500" },
    { name: "Antibiotics", value: 20, color: "#a812e3" },
    { name: "Drugs", value: 15, color: "#E91E63" },
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
      <Typography variant="h6" sx={{ textAlign: "center", color: "#000000" }}>Rejected Medicines</Typography>
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx={100}
          cy={100}
          innerRadius={40}
          outerRadius={60}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} stroke="white" strokeWidth={3} />
          ))}
        </Pie>
        <Tooltip formatter={(value, name) => [`${value} rejected`, name]} />
      </PieChart>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
        {data.map((category) => (
          <Box key={category.name} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ width: 15, height: 15, backgroundColor: category.color, borderRadius: 2 }}></Box>
            <Typography variant="body2" sx={{ color: "#000000" }}>{category.name}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RejectedMedicinesChart;