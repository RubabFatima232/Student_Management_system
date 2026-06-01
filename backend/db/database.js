// backend/db/database.js
const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'students.db');
let db = null;

// Initialize database
async function initializeDB() {
  const SQL = await initSqlJs();
  
  // Load existing database or create new
  let fileBuffer = null;
  if (fs.existsSync(DB_PATH)) {
    fileBuffer = fs.readFileSync(DB_PATH);
  }
  
  if (fileBuffer) {
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }
  
  // Create table
  db.run(`
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
  
  // Seed sample data
  const count = db.exec(`SELECT COUNT(*) as cnt FROM students`);
  const isEmpty = count.length === 0 || count[0].values.length === 0 || count[0].values[0][0] === 0;
  
  if (isEmpty) {
    const students = [
      ['Ali Raza',    'ali.raza@uni.edu',    'Computer Science', 'A', '0301-1234567'],
      ['Sara Ahmed',  'sara.ahmed@uni.edu',  'Mathematics',      'B+','0312-7654321'],
      ['Usman Khan',  'usman.khan@uni.edu',  'Physics',          'A-','0333-9876543'],
    ];
    
    students.forEach(s => {
      db.run(`
        INSERT INTO students (name, email, department, grade, phone)
        VALUES (?, ?, ?, ?, ?)
      `, s);
    });
    
    saveDB();
    console.log("📦 Database seeded with sample students.");
  }
  
  return db;
}

// Save database to file
function saveDB() {
  if (db) {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DB_PATH, buffer);
  }
}

// Helper: Execute query and return all results
function getAll(query, params = []) {
  const stmt = db.prepare(query);
  stmt.bind(params);
  const results = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject());
  }
  stmt.free();
  return results;
}

// Helper: Execute query and return single result
function getOne(query, params = []) {
  const results = getAll(query, params);
  return results.length > 0 ? results[0] : null;
}

// Helper: Execute query without returning results (INSERT, UPDATE, DELETE)
function run(query, params = []) {
  const stmt = db.prepare(query);
  stmt.bind(params);
  stmt.step();
  stmt.free();
  saveDB();
  return { changes: db.getRowsModified() };
}

// Export database wrapper
module.exports = {
  initializeDB,
  getAll,
  getOne,
  run,
  exec: (query) => db.exec(query),
  prepare: (query) => ({
    all: (params) => getAll(query, params),
    get: (params) => getOne(query, params),
    run: (params) => run(query, params)
  })
};

