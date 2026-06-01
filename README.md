# Student Record Management System - CRUD Application

A complete full-stack web application for managing student records with Create, Read, Update, and Delete operations.

## 📋 Project Structure

```
Student_record_system/
├── backend/
│   ├── db/
│   │   └── database.js          # SQLite database setup and initialization
│   ├── middleware/
│   │   └── validate.js          # Request validation middleware
│   ├── routes/
│   │   └── students.js          # Student CRUD API routes
│   ├── server.js                # Express server setup
│   ├── package.json             # Backend dependencies
│   └── .env                     # Environment configuration
├── frontend/
│   ├── css/
│   │   └── style.css            # Responsive styling
│   ├── js/
│   │   └── app.js               # Frontend logic and API calls
│   └── index.html               # Main HTML page
└── README.md                    # This file
```

## ✨ Features

### Full CRUD Operations
- **Create**: Add new student records with validation
- **Read**: Fetch all students or search/filter by name, email, department
- **Update**: Edit existing student information
- **Delete**: Remove student records with confirmation

### Frontend
- Modern, responsive UI with Tailwind-inspired design
- Real-time search and filtering
- Statistics dashboard showing total students, department counts, and grades
- Modal forms for creating and editing students
- Delete confirmation dialog
- Toast notifications for user feedback
- Mobile-friendly layout

### Backend
- Express.js REST API with proper routing
- SQLite database with WAL mode for performance
- Input validation middleware
- Error handling and status codes
- CORS enabled for cross-origin requests
- Seeded with sample student data

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create .env file** (if needed):
   ```
   PORT=5000
   NODE_ENV=development
   ```

### Running the Application

1. **Start the backend server** (from `backend/` directory):
   ```bash
   npm start        # Production mode
   # or
   npm run dev      # Development with nodemon
   ```

2. **Access the application**:
   - Open your browser and navigate to `http://localhost:5000`

## 📊 API Endpoints

### Base URL: `http://localhost:5000/api`

#### Students Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| **GET** | `/students` | Fetch all students (supports search & department filter) |
| **GET** | `/students/:id` | Fetch a specific student by ID |
| **POST** | `/students` | Create a new student |
| **PUT** | `/students/:id` | Update an existing student |
| **DELETE** | `/students/:id` | Delete a student |

#### Query Parameters (for GET /students)
- `search` - Search by name or email
- `department` - Filter by department

#### Example Requests

**Get all students:**
```bash
GET /api/students
```

**Search students:**
```bash
GET /api/students?search=ali
GET /api/students?department=Computer%20Science
```

**Create a student:**
```bash
POST /api/students
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@uni.edu",
  "department": "Computer Science",
  "grade": "A",
  "phone": "0300-1234567"
}
```

**Update a student:**
```bash
PUT /api/students/1
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@uni.edu",
  "department": "Mathematics",
  "grade": "A+",
  "phone": "0300-9876543"
}
```

**Delete a student:**
```bash
DELETE /api/students/1
```

## 📦 Database Schema

### Students Table

```sql
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
```

### Supported Departments
- Computer Science
- Mathematics
- Physics
- Chemistry
- Biology
- Engineering

### Supported Grades
A+, A, A-, B+, B, B-, C+, C, C-, D, F

## 🎯 Frontend Features

### Main Dashboard
- **Stats Cards**: Display total students, CS students, A-grade students, department count
- **Search Bar**: Real-time search by name or email
- **Department Filter**: Filter students by selected department
- **Student Table**: Display all records with edit and delete buttons

### Modals
- **Add/Edit Modal**: Form for creating or editing students
- **Delete Confirmation**: Confirm before deleting a record
- **Error Messages**: Display validation errors

### Responsive Design
- Mobile-first approach
- Adapts to all screen sizes
- Smooth animations and transitions

## 📝 Data Flow

### Create Operation
```
Frontend Form → Validation → API POST → Backend Validation → Database Insert → Response → UI Update
```

### Read Operation
```
Page Load → API GET → Database Query → JSON Response → UI Render
```

### Update Operation
```
Edit Button → Load Data → Modal Form → API PUT → Backend Validation → Database Update → UI Refresh
```

### Delete Operation
```
Delete Button → Confirmation Modal → API DELETE → Database Remove → UI Update
```

## 🔒 Validation

### Frontend Validation
- Name: Minimum 2 characters
- Email: Valid email format
- Department: Selected from predefined list
- Grade: Selected from predefined list

### Backend Validation
- All fields required (except phone)
- Email format validation
- Unique email constraint
- Department and grade validation
- Duplicate email prevention during updates

## 🛠️ Technologies Used

### Backend
- **Framework**: Express.js
- **Database**: SQLite with better-sqlite3
- **Validation**: Custom middleware
- **CORS**: Enabled for cross-origin requests
- **Environment**: dotenv for configuration

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Responsive design with flexbox and grid
- **Vanilla JavaScript**: No frameworks or libraries
- **Fetch API**: For backend communication

## 📄 Sample Data

The application comes pre-seeded with sample students:

| Name | Email | Department | Grade | Phone |
|------|-------|-----------|-------|-------|
| Ali Raza | ali.raza@uni.edu | Computer Science | A | 0301-1234567 |
| Sara Ahmed | sara.ahmed@uni.edu | Mathematics | B+ | 0312-7654321 |
| Usman Khan | usman.khan@uni.edu | Physics | A- | 0333-9876543 |

## 🐛 Troubleshooting

### Port Already in Use
If port 5000 is already in use, change it in `.env`:
```
PORT=3000
```

### Database Lock Error
This is usually temporary. Restart the server:
```bash
npm run dev
```

### Module Not Found Errors
Reinstall dependencies:
```bash
npm install
```

### CORS Issues
Ensure the backend is running and the frontend is accessing the correct URL.

## 📈 Future Enhancements

- Add authentication and authorization
- Implement data export (CSV, PDF)
- Add student photo uploads
- Implement pagination for large datasets
- Add advanced filtering and sorting
- Build admin dashboard
- Add data analytics
- Implement backup functionality

## 📝 License

MIT License - Feel free to use this project for learning purposes.

## 👤 Author

Developed as a full-stack CRUD application exercise.

---

**Happy Coding! 🚀**
