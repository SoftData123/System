import { BrowserRouter, Route, Routes } from "react-router-dom";
import ReactLoading from "react-loading";
import { useEffect, useState } from "react";
import axios from "axios";

import Home from "./components/home";
import Login from "./components/login";
import Admin from "./components/admin";
import Payment from "./components/payment";
import Bill from "./components/bill";
import Register from "./components/register";
import Dashboard from "./components/dashboard"; // <-- Import Dashboard

import "./App.css";

function App() {
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/")
      .then((res) => {
        setAuth(res.data.success);
        setLoading(false);
      })
      .catch(() => {
        setAuth(false);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loadingComp">
        <ReactLoading type="spinningBubbles" color="#ffffff" height={150} width={150} />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bill" element={<Bill />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/bill/payment" element={<Payment />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* Add Dashboard route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
