// backend/middleware/validate.js

const DEPARTMENTS = ["Computer Science", "Mathematics", "Physics", "Chemistry", "Biology", "Engineering"];
const GRADES      = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F"];

module.exports = (req, res, next) => {
  const { name, email, department, grade } = req.body;
  const errors = [];

  if (!name || name.trim().length < 2)
    errors.push("Name must be at least 2 characters.");

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.push("Valid email is required.");

  if (!department || !DEPARTMENTS.includes(department))
    errors.push(`Department must be one of: ${DEPARTMENTS.join(", ")}.`);

  if (!grade || !GRADES.includes(grade))
    errors.push(`Grade must be one of: ${GRADES.join(", ")}.`);

  if (errors.length > 0)
    return res.status(400).json({ success: false, message: errors.join(" ") });

  next();
};
