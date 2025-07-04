import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./dashboard.module.css";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/admin/logout", {}, { withCredentials: true });
      navigate("/admin/login");
    } catch (err) {
      alert("Logout failed: " + err.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Welcome, Admin!</h1>
        <p className={styles.subtitle}>You have successfully logged in.</p>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </div>
  );
}
