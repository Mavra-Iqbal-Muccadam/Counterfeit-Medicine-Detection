"use client";
import React from "react";
import styles from "../styles/Button.module.css";

const Button = ({ text, type = "button", onClick }) => {
  return (
    <button type={type} onClick={onClick} className={styles.btn}> {/* ✅ Use styles.btn */}
      {text}
    </button>
  );
};

export default Button;



