import React from "react";
import Button from "@mui/material/Button";

export default function DynamicButton({ text, isActive, onClick }) {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      disableElevation
      style={{
        background: isActive ? "#fff" : "transparent",
        color: isActive ? "#000" : "#fff",
        border: "1px solid #fff", // optional border for better visibility
      }}
    >
      {text}
    </Button>
  );
}
