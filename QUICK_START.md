# 🚀 QUICK START GUIDE - Student Record Management System

## ⚡ Get Running in 3 Steps

### Step 1️⃣: Install Dependencies
```bash
cd backend
npm install
```

### Step 2️⃣: Start Server
```bash
npm start
```
Expected output: `✅ Server running at http://localhost:5000`

### Step 3️⃣: Open Browser
Visit: `http://localhost:5000`

---

## 🎮 Using the App

| Action | Steps |
|--------|-------|
| **Add Student** | Click "+ Add Student" → Fill form → Click "Save Student" |
| **Search** | Type in search box (searches name & email in real-time) |
| **Filter** | Select department from dropdown |
| **Edit** | Click "Edit" on a row → Modify → Click "Save Student" |
| **Delete** | Click "Delete" on a row → Confirm → Student removed |

---

## 📊 Dashboard Features

- **Stats Cards**: Total students, CS students, A-grade count, department count
- **Search Bar**: Real-time search by name or email
- **Department Filter**: Filter by selected department
- **Student Table**: All records with edit/delete buttons
- **Notifications**: Toast messages for success/error

---

## 📱 Test Data

Pre-loaded with 3 students:
1. **Ali Raza** - Computer Science, Grade A
2. **Sara Ahmed** - Mathematics, Grade B+
3. **Usman Khan** - Physics, Grade A-

---

## 🔧 Important Files

```
backend/
├── server.js          ← Express app setup
├── routes/students.js ← CRUD endpoints
├── db/database.js     ← Database schema
├── middleware/validate.js ← Input validation
└── .env              ← Configuration

frontend/
├── index.html        ← Page structure
├── css/style.css     ← Responsive styling
└── js/app.js         ← Frontend logic
```

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Port 5000 in use" | Change `PORT=3000` in `backend/.env` |
| "Module not found" | Run `npm install` again in backend folder |
| "Cannot GET /" | Make sure you visit `http://localhost:5000` |
| "Database locked" | Restart server (Ctrl+C, then npm start) |

---

## 📖 Documentation

- **README.md** - Full project documentation
- **SETUP_INSTRUCTIONS.md** - Detailed setup and troubleshooting
- **ARCHITECTURE.md** - Technical design and data flow

---

## ✅ What Works

✓ Create new students with validation
✓ Read/search all students
✓ Update existing student records
✓ Delete students with confirmation
✓ Filter by department
✓ Real-time search
✓ Statistics dashboard
✓ Responsive mobile design
✓ Toast notifications
✓ Form error messages

---

## 🔗 API Quick Reference

```bash
# Get all students
GET http://localhost:5000/api/students

# Get filtered students
GET http://localhost:5000/api/students?search=ali&department=Computer%20Science

# Create student
POST http://localhost:5000/api/students
Body: {
  "name": "Student Name",
  "email": "email@uni.edu",
  "department": "Computer Science",
  "grade": "A",
  "phone": "0300-0000000"
}

# Update student
PUT http://localhost:5000/api/students/1
Body: { ...same as create }

# Delete student
DELETE http://localhost:5000/api/students/1
```

---

## 🎯 Database Schema

```sql
CREATE TABLE students (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL UNIQUE,
  department  TEXT NOT NULL,
  grade       TEXT NOT NULL,
  phone       TEXT,
  created_at  TEXT DEFAULT (datetime('now')),
  updated_at  TEXT DEFAULT (datetime('now'))
);
```

### Departments
Computer Science, Mathematics, Physics, Chemistry, Biology, Engineering

### Grades
A+, A, A-, B+, B, B-, C+, C, C-, D, F

---

## 🎓 Tech Stack

| Layer | Technology |
|-------|-----------|
| Server | Node.js + Express.js |
| Database | SQLite (better-sqlite3) |
| Frontend | HTML5 + CSS3 + Vanilla JS |
| API | REST with JSON |

---

## 📞 Key Commands

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Start server (production)
npm start

# Start server (development, auto-reload)
npm run dev

# Stop server
Ctrl + C
```

---

## 🎨 Customization

### Change Port
Edit `backend/.env`:
```
PORT=3000
```

### Add Department
1. Edit `backend/middleware/validate.js` - add to DEPARTMENTS array
2. Edit `frontend/index.html` - add to department dropdown

### Change Server Host (for network access)
Edit `backend/server.js` line:
```javascript
app.listen(PORT, '0.0.0.0', () => {
```

---

## ✨ Features

✅ **Full CRUD** - Create, Read, Update, Delete
✅ **Validation** - Frontend + Backend
✅ **Search** - Real-time by name/email
✅ **Filter** - By department
✅ **Responsive** - Mobile, tablet, desktop
✅ **Database** - SQLite with schema
✅ **API** - RESTful endpoints
✅ **UI** - Modern, clean design
✅ **Notifications** - Toast messages
✅ **Forms** - Modal dialogs

---

## 🚀 Next Steps

1. ✅ Get running (see top of this guide)
2. ✅ Explore the UI
3. ✅ Add some students
4. ✅ Try searching and filtering
5. ✅ Read the full documentation
6. 📚 Learn the code structure
7. 🔧 Start customizing!

---

## 📊 Summary

**What**: Complete full-stack CRUD application
**Where**: `Student_record_system/backend` (API) + `frontend` (UI)
**Tech**: Node.js, Express, SQLite, Vanilla JS
**Status**: ✅ Fully functional and ready to use!

---

**Happy Coding! 🎉**

For more details, see:
- 📖 README.md - Full documentation
- 🔧 SETUP_INSTRUCTIONS.md - Detailed setup
- 🏗️ ARCHITECTURE.md - Technical details
