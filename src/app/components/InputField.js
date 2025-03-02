"use client";
import React from "react";
import styles from "../styles/InputField.module.css";
  

const InputField = ({ name, label, type = "text", onChange, required = false }) => {
  return (
    <div className={styles.inputField}>  {/* ✅ Correct CSS Module Application */}
      <label className={styles.label}>{label}</label>
      <input className={styles.input} type={type} name={name} onChange={onChange} required={required} />
    </div>
  );
};

export default InputField;
