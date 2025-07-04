const express = require("express");
const router = express.Router();

const products = [
  { p_id: 1, name: "Apple", price: 100, discount: 10 },
  { p_id: 2, name: "Banana", price: 50, discount: 0 },
  { p_id: 3, name: "Orange", price: 80, discount: 5 },
];

// GET /bill/ - returns products
router.get("/", (req, res) => {
  res.json({ success: true, products });
});

// GET /bill/payment - check payment route access (auth or just success)
router.get("/payment", (req, res) => {
  res.json({ success: true });
});

// POST /bill/:number/:amount - handle payment POST (you already call this)
router.post("/:number/:amount", (req, res) => {
  // Here you'd handle payment logic, save bill, etc.
  console.log("Payment received:", req.params.number, req.params.amount, req.body);

  res.json({ success: true, message: "Payment processed" });
});

module.exports = router;
