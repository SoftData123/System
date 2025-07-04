import React, { useEffect, useState } from "react";
import { user } from "../img";
import styles from "./login.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(null); // null = loading, true = logged in, false = not
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in by hitting a protected route or session check
    axios
      .get("http://localhost:5000/admin/login", { withCredentials: true })
      .then((res) => {
        setAuth(res.data.success === true);
        if (res.data.success) {
          navigate("/dashboard"); // redirect if already logged in
        }
      })
      .catch(() => setAuth(false));
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/admin/login",
        {
          username: name,
          password: password,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        window.alert("Login successful!");
        setAuth(true);
        navigate("/dashboard"); // redirect after successful login
      } else {
        window.alert(res.data.message || "Login failed");
      }
    } catch (err) {
      window.alert("Something went wrong: " + err.message);
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

  if (auth === true) {
    return null; // already redirected above; this prevents flicker
  }

  return (
    <div className={styles.login}>
      <div className={styles.loginCard}>
        <img className={styles.logo} src={user} alt="admin icon" />
        <p className={styles.title}>Supermarket Admin</p>

        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
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

          <button type="submit" className={styles.link3}>
            LOGIN
          </button>
        </form>

        <Link to="/" className={`${styles.link3} ${styles.backLink}`}>
          BACK
        </Link>
      </div>
    </div>
  );
}
