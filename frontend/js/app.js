// frontend/js/app.js

// ── Configuration ────────────────────────────────────────────
const API_URL = '/api/students';
let allStudents = [];
let filteredStudents = [];
let editingStudentId = null;

// ── DOM Elements ─────────────────────────────────────────────
const formModal = document.getElementById('formModal');
const deleteModal = document.getElementById('deleteModal');
const tableBody = document.getElementById('tableBody');
const toast = document.getElementById('toast');
const searchInput = document.getElementById('searchInput');
const deptFilter = document.getElementById('deptFilter');

// ── Initialize ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  loadStudents();
  setInterval(updateStats, 1000);
});

// ── Event Listeners ──────────────────────────────────────────
function setupEventListeners() {
  // Modal controls
  document.getElementById('openAddModal').addEventListener('click', openAddModal);
  document.getElementById('closeModal').addEventListener('click', closeFormModal);
  document.getElementById('cancelModal').addEventListener('click', closeFormModal);
  document.getElementById('closeDeleteModal').addEventListener('click', closeDeleteModal);
  document.getElementById('cancelDelete').addEventListener('click', closeDeleteModal);
  
  // Form submission
  document.getElementById('saveBtn').addEventListener('click', saveStudent);
  document.getElementById('confirmDelete').addEventListener('click', confirmDelete);
  
  // Filter controls
  searchInput.addEventListener('input', applyFilters);
  deptFilter.addEventListener('change', applyFilters);
  document.getElementById('clearFilters').addEventListener('click', clearFilters);
  
  // Close modal on backdrop click
  formModal.addEventListener('click', (e) => {
    if (e.target === formModal) closeFormModal();
  });
  deleteModal.addEventListener('click', (e) => {
    if (e.target === deleteModal) closeDeleteModal();
  });
}

// ── API Calls ────────────────────────────────────────────────

/**
 * Fetch all students from the backend
 */
async function loadStudents() {
  try {
    showLoading();
    const response = await fetch(API_URL);
    const result = await response.json();
    
    if (result.success) {
      allStudents = result.data;
      filteredStudents = [...allStudents];
      renderTable();
      updateStats();
    }
  } catch (err) {
    console.error('Error loading students:', err);
    showToast('Failed to load students', 'error');
    tableBody.innerHTML = '<div class="empty-state"><div class="empty-state-icon">⚠️</div><div class="empty-state-title">Error Loading Data</div></div>';
  }
}

/**
 * Create a new student (POST)
 */
async function createStudent(data) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to create student');
    }
    
    allStudents.push(result.data);
    applyFilters();
    closeFormModal();
    showToast(`✅ Student "${result.data.name}" created successfully`, 'success');
    return true;
  } catch (err) {
    console.error('Create error:', err);
    showToast(err.message, 'error');
    return false;
  }
}

/**
 * Update an existing student (PUT)
 */
async function updateStudent(id, data) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to update student');
    }
    
    const index = allStudents.findIndex(s => s.id === id);
    if (index !== -1) {
      allStudents[index] = result.data;
    }
    applyFilters();
    closeFormModal();
    showToast(`✅ Student "${result.data.name}" updated successfully`, 'success');
    return true;
  } catch (err) {
    console.error('Update error:', err);
    showToast(err.message, 'error');
    return false;
  }
}

/**
 * Delete a student (DELETE)
 */
async function deleteStudent(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to delete student');
    }
    
    allStudents = allStudents.filter(s => s.id !== id);
    applyFilters();
    closeDeleteModal();
    showToast(result.message || '✅ Student deleted successfully', 'success');
    return true;
  } catch (err) {
    console.error('Delete error:', err);
    showToast(err.message, 'error');
    return false;
  }
}

// ── Form Modal Logic ─────────────────────────────────────────

function openAddModal() {
  editingStudentId = null;
  resetForm();
  document.getElementById('modalTitle').textContent = 'Add New Student';
  document.getElementById('studentId').value = '';
  formModal.classList.remove('hidden');
}

function openEditModal(id) {
  const student = allStudents.find(s => s.id === id);
  if (!student) return;
  
  editingStudentId = id;
  document.getElementById('studentId').value = id;
  document.getElementById('fName').value = student.name;
  document.getElementById('fEmail').value = student.email;
  document.getElementById('fDept').value = student.department;
  document.getElementById('fGrade').value = student.grade;
  document.getElementById('fPhone').value = student.phone || '';
  
  document.getElementById('modalTitle').textContent = 'Edit Student';
  clearFormError();
  formModal.classList.remove('hidden');
}

function closeFormModal() {
  formModal.classList.add('hidden');
  resetForm();
}

function resetForm() {
  document.getElementById('fName').value = '';
  document.getElementById('fEmail').value = '';
  document.getElementById('fDept').value = '';
  document.getElementById('fGrade').value = '';
  document.getElementById('fPhone').value = '';
  clearFormError();
}

function showFormError(message) {
  const errorDiv = document.getElementById('formError');
  errorDiv.textContent = message;
  errorDiv.classList.remove('hidden');
}

function clearFormError() {
  document.getElementById('formError').classList.add('hidden');
}

async function saveStudent() {
  clearFormError();
  
  const name = document.getElementById('fName').value.trim();
  const email = document.getElementById('fEmail').value.trim();
  const department = document.getElementById('fDept').value;
  const grade = document.getElementById('fGrade').value;
  const phone = document.getElementById('fPhone').value.trim();
  
  // Validation
  if (!name || name.length < 2) {
    showFormError('Name must be at least 2 characters');
    return;
  }
  if (!email || !email.includes('@')) {
    showFormError('Please enter a valid email');
    return;
  }
  if (!department) {
    showFormError('Please select a department');
    return;
  }
  if (!grade) {
    showFormError('Please select a grade');
    return;
  }
  
  const data = { name, email, department, grade };
  if (phone) data.phone = phone;
  
  if (editingStudentId) {
    await updateStudent(editingStudentId, data);
  } else {
    await createStudent(data);
  }
}

// ── Delete Modal Logic ───────────────────────────────────────

function openDeleteModal(id) {
  const student = allStudents.find(s => s.id === id);
  if (!student) return;
  
  editingStudentId = id;
  document.getElementById('deleteStudentName').textContent = student.name;
  deleteModal.classList.remove('hidden');
}

function closeDeleteModal() {
  deleteModal.classList.add('hidden');
  editingStudentId = null;
}

async function confirmDelete() {
  if (editingStudentId) {
    await deleteStudent(editingStudentId);
  }
}

// ── Filtering & Search ───────────────────────────────────────

function applyFilters() {
  const search = searchInput.value.toLowerCase();
  const dept = deptFilter.value;
  
  filteredStudents = allStudents.filter(student => {
    const matchSearch = !search || 
      student.name.toLowerCase().includes(search) ||
      student.email.toLowerCase().includes(search);
    
    const matchDept = !dept || student.department === dept;
    
    return matchSearch && matchDept;
  });
  
  renderTable();
}

function clearFilters() {
  searchInput.value = '';
  deptFilter.value = '';
  applyFilters();
}

// ── Rendering ────────────────────────────────────────────────

function renderTable() {
  if (filteredStudents.length === 0) {
    tableBody.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📚</div>
        <div class="empty-state-title">No Students Found</div>
        <div class="empty-state-desc">
          ${allStudents.length === 0 ? 'Add your first student to get started' : 'Try adjusting your filters'}
        </div>
      </div>
    `;
    updateResultCount(0);
    return;
  }
  
  const rows = filteredStudents.map(student => `
    <div class="student-row">
      <div class="col-name" data-label="Name">${escapeHtml(student.name)}</div>
      <div class="col-email" data-label="Email">${escapeHtml(student.email)}</div>
      <div class="col-dept" data-label="Department">${escapeHtml(student.department)}</div>
      <div class="col-grade" data-label="Grade">${student.grade}</div>
      <div data-label="Phone">${student.phone ? escapeHtml(student.phone) : '—'}</div>
      <div class="col-actions">
        <button class="btn-edit btn-sm" onclick="openEditModal(${student.id})">Edit</button>
        <button class="btn-delete btn-sm" onclick="openDeleteModal(${student.id})">Delete</button>
      </div>
    </div>
  `).join('');
  
  tableBody.innerHTML = `<div class="table-content">${rows}</div>`;
  updateResultCount(filteredStudents.length);
}

function showLoading() {
  tableBody.innerHTML = '<div class="loading">Loading students…</div>';
}

// ── Statistics ───────────────────────────────────────────────

function updateStats() {
  // Total students
  document.getElementById('statTotal').textContent = allStudents.length;
  
  // Computer Science count
  const csCount = allStudents.filter(s => s.department === 'Computer Science').length;
  document.getElementById('statCS').textContent = csCount;
  
  // Grade A/A+ count
  const aGradeCount = allStudents.filter(s => s.grade === 'A' || s.grade === 'A+').length;
  document.getElementById('statA').textContent = aGradeCount;
  
  // Unique departments
  const depts = new Set(allStudents.map(s => s.department));
  document.getElementById('statDepts').textContent = depts.size;
}

function updateResultCount(count) {
  document.getElementById('resultCount').textContent = `${count} ${count === 1 ? 'record' : 'records'}`;
}

// ── Notifications ───────────────────────────────────────────

function showToast(message, type = 'info') {
  toast.textContent = message;
  toast.className = `toast ${type}`;
  toast.classList.remove('hidden');
  
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3000);
}

// ── Utilities ────────────────────────────────────────────────

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
