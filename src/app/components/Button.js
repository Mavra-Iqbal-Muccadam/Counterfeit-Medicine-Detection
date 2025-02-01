"use client";
import React from "react";


const Button = ({ text, type = "button", onClick }) => {
  return (
    <button type={type} onClick={onClick} className={styles.btn}> {/* ✅ Use styles.btn */}
      {text}
    </button>
  );
};

export default Button;



