"use client";
import React from "react";


const InputField = ({ name, label, type = "text", onChange, required = false }) => {
  return (
    <div className={styles.inputField}> {/* ✅ Correct way to apply CSS Module */}
      <label className={styles.label}>{label}</label>
      <input className={styles.input} type={type} name={name} onChange={onChange} required={required} />
    </div>
  );
};

export default InputField;
