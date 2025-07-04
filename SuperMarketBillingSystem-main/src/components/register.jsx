import React, { useEffect, useState } from "react";
import { user } from "../img";
import styles from "./login.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading";

export default function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(null); // null initially
  const navigate = useNavigate();

  useEffect(() => {
    // Make sure to send cookies with request
    axios
      .get("http://localhost:5000/admin/register", { withCredentials: true })
      .then((res) => setAuth(res.data.success))
      .catch(() => setAuth(false));
  }, []);

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/admin/register",
        {
          username: name,
          password: password,
        },
        {
          withCredentials: true, // send cookies
        }
      );

      if (res.data.success) {
        window.alert(`User ${name} registered successfully!`);
        navigate("/admin/login");  // Redirect after success
      } else {
        window.alert("Registration failed.");
      }
    } catch (err) {
      window.alert("Something went wrong.\n" + err.message);
    }
  };

  if (auth === null) {
    return (
      <div className={styles.loadingComp}>
        <ReactLoading
          type="spinningBubbles"
          color="#6C63FF"
          height={150}
          width={150}
        />
      </div>
    );
  }

  if (!auth) {
    return (
      <div className={styles.login}>
        <p className={styles.title}>403 - Unauthorized</p>
        <Link to="/admin/login" className={styles.link3}>
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.login}>
      <div className={styles.loginCard}>
        <img className={styles.logo} src={user} alt="admin" />
        <p className={styles.title}>Supermarket Admin</p>
        <p className={styles.title}>Register New Admin</p>

        <form className={styles.form}>
          <label htmlFor="username">Admin Name</label>
          <input
            className={styles.input}
            type="text"
            name="username"
            id="username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            className={styles.input}
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="button"
            className={styles.link3}
            onClick={handleRegister}
          >
            Register
          </button>
        </form>

        <Link to="/" className={`${styles.link3} ${styles.backLink}`}>
          Back
        </Link>
      </div>
    </div>
  );
}
