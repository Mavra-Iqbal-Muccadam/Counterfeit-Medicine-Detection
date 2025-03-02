"use client";
import ManufacturerForm from "../components/ManufacturerForm"; 
import styles from "./page.module.css"; 

export default function manufacturer() {
  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>Register as a Manufacturer</h1>
      <ManufacturerForm />
    </div>
  );
};
