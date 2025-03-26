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
const AcceptedMedicinesChart = () => {
  const data = [
    { name: "Drugs", value: 50, color: "#E91E63", unfilledColor: "#E0E0E0" },
    { name: "Capsules", value: 17, color: "#3357FF", unfilledColor: "#E0E0E0" },
    { name: "Tablets", value: 30, color: "#FFA500", unfilledColor: "#E0E0E0" },
    { name: "Antibiotics", value: 66, color: "#a812e3", unfilledColor: "#E0E0E0" },
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
      <Typography variant="h6" sx={{ textAlign: "center", color: "#000000" }}>Accepted Medicines</Typography>
      <PieChart width={200} height={200}>
        {data.map((category, index) => (
          <Pie
            key={category.name}
            data={[
              { name: category.name, value: category.value },
              { name: "Remaining", value: 100 - category.value },
            ]}
            cx={100}
            cy={100}
            innerRadius={30 + index * 15}
            outerRadius={45 + index * 15}
            startAngle={90}
            endAngle={-270}
            paddingAngle={3}
            dataKey="value"
          >
            <Cell fill={category.color} stroke="white" strokeWidth={3} />
            <Cell fill={category.unfilledColor} stroke="white" strokeWidth={3} />
          </Pie>
        ))}
        <Tooltip formatter={(value, name) => [`${value}%`, name]} />
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

export default AcceptedMedicinesChart;