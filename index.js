// index.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { initializeDatabase } = require("./db.connect");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors()); 
app.use(express.json());

// Import routes
const jobRoutes = require("./JobRoutes");
app.use("/jobs", jobRoutes);

// Base route
app.get("/", (req, res) => {
  res.send("Job Posting API is running...");
});

// Initialize database and start server
initializeDatabase()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err.message);
  });
