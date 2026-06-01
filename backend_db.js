// backend/db/database.js
const Database = require("better-sqlite3");
const path     = require("path");

const DB_PATH = path.join(__dirname, "students.db");
const db      = new Database(DB_PATH);

// Enable WAL mode for better performance
db.pragma("journal_mode = WAL");

// ── Create Table ─────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS students (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL,
    email       TEXT    NOT NULL UNIQUE,
    department  TEXT    NOT NULL,
    grade       TEXT    NOT NULL,
    phone       TEXT,
    created_at  TEXT    DEFAULT (datetime('now')),
    updated_at  TEXT    DEFAULT (datetime('now'))
  );
`);

// ── Seed sample data (only if table is empty) ────────────────
const count = db.prepare("SELECT COUNT(*) as cnt FROM students").get();
if (count.cnt === 0) {
  const insert = db.prepare(`
    INSERT INTO students (name, email, department, grade, phone)
    VALUES (?, ?, ?, ?, ?)
  `);
  const students = [
    ["Ali Raza",    "ali.raza@uni.edu",    "Computer Science", "A", "0301-1234567"],
    ["Sara Ahmed",  "sara.ahmed@uni.edu",  "Mathematics",      "B+","0312-7654321"],
    ["Usman Khan",  "usman.khan@uni.edu",  "Physics",          "A-","0333-9876543"],
  ];
  students.forEach(s => insert.run(...s));
  console.log("📦 Database seeded with sample students.");
}

module.exports = db;
