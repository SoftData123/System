const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const session = require("express-session");

const bill = require("./routers/bill");
const admin = require("./routers/admin");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongourl = process.env.MONGO_URL;

// Middleware setup
app.use(express.json());

// CORS config to allow credentials (cookies)
app.use(cors({
  origin: "http://localhost:5173",  // your React frontend origin
  credentials: true,
}));

// Session middleware setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'some_secret_key', // replace with strong secret
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,  // set true if HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  }
}));

// Routes
app.use("/bill", bill);
app.use("/admin", admin);

app.get("/", (req, res) => {
  res.status(200).json({ success: true });
});

mongoose.connect(mongourl)
  .then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch((err) => {
    console.error(err.message);
  });
