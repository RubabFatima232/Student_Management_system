// backend/server.js
const express = require("express");
const cors    = require("cors");
const path    = require("path");
require("dotenv").config();

const studentRoutes = require("./routes/students");
const { initializeDB } = require("./db/database");

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../frontend")));

// ── API Routes ──────────────────────────────────────────────
app.use("/api/students", studentRoutes);

// ── Health check ────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running", timestamp: new Date() });
});

// ── Catch-all: serve frontend ────────────────────────────────
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// ── Start Server ─────────────────────────────────────────────
async function startServer() {
  try {
    // Initialize database
    await initializeDB();
    console.log("✅ Database initialized");
    
    // Start listening
    app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

startServer();

