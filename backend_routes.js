// backend/routes/students.js
const express  = require("express");
const router   = express.Router();
const db       = require("../db/database");
const validate = require("../middleware/validate");

// ── READ ALL — GET /api/students ─────────────────────────────
router.get("/", (req, res) => {
  try {
    const { search, department } = req.query;
    let query  = "SELECT * FROM students";
    const args = [];

    if (search || department) {
      const clauses = [];
      if (search) {
        clauses.push("(name LIKE ? OR email LIKE ?)");
        args.push(`%${search}%`, `%${search}%`);
      }
      if (department) {
        clauses.push("department = ?");
        args.push(department);
      }
      query += " WHERE " + clauses.join(" AND ");
    }

    query += " ORDER BY created_at DESC";
    const students = db.prepare(query).all(...args);
    res.json({ success: true, count: students.length, data: students });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── READ ONE — GET /api/students/:id ────────────────────────
router.get("/:id", (req, res) => {
  try {
    const student = db.prepare("SELECT * FROM students WHERE id = ?").get(req.params.id);
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });
    res.json({ success: true, data: student });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── CREATE — POST /api/students ──────────────────────────────
router.post("/", validate, (req, res) => {
  try {
    const { name, email, department, grade, phone } = req.body;

    // Check duplicate email
    const existing = db.prepare("SELECT id FROM students WHERE email = ?").get(email);
    if (existing) return res.status(409).json({ success: false, message: "Email already exists" });

    const result = db.prepare(`
      INSERT INTO students (name, email, department, grade, phone)
      VALUES (?, ?, ?, ?, ?)
    `).run(name, email.toLowerCase(), department, grade, phone || null);

    const newStudent = db.prepare("SELECT * FROM students WHERE id = ?").get(result.lastInsertRowid);
    res.status(201).json({ success: true, message: "Student created", data: newStudent });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── UPDATE — PUT /api/students/:id ──────────────────────────
router.put("/:id", validate, (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, department, grade, phone } = req.body;

    const existing = db.prepare("SELECT * FROM students WHERE id = ?").get(id);
    if (!existing) return res.status(404).json({ success: false, message: "Student not found" });

    // Check email conflict with another student
    const emailConflict = db.prepare("SELECT id FROM students WHERE email = ? AND id != ?").get(email, id);
    if (emailConflict) return res.status(409).json({ success: false, message: "Email already used by another student" });

    db.prepare(`
      UPDATE students SET name=?, email=?, department=?, grade=?, phone=?, updated_at=datetime('now')
      WHERE id=?
    `).run(name, email.toLowerCase(), department, grade, phone || null, id);

    const updated = db.prepare("SELECT * FROM students WHERE id = ?").get(id);
    res.json({ success: true, message: "Student updated", data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── DELETE — DELETE /api/students/:id ───────────────────────
router.delete("/:id", (req, res) => {
  try {
    const existing = db.prepare("SELECT * FROM students WHERE id = ?").get(req.params.id);
    if (!existing) return res.status(404).json({ success: false, message: "Student not found" });

    db.prepare("DELETE FROM students WHERE id = ?").run(req.params.id);
    res.json({ success: true, message: `Student "${existing.name}" deleted` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
