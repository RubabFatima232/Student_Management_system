@echo off
REM ── Student Record System Setup Script for Windows ──

echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║  Student Record Management System - Setup Script      ║
echo ╚════════════════════════════════════════════════════════╝
echo.

REM Change to backend directory
cd backend

REM Check if Node.js is installed
echo Checking for Node.js...
where node >nul 2>nul
if errorlevel 1 (
    echo ✗ Node.js is not installed! Please install Node.js first.
    echo   Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js found

REM Install dependencies
echo.
echo Installing dependencies...
call npm install

if errorlevel 1 (
    echo ✗ Failed to install dependencies
    pause
    exit /b 1
)

echo ✓ Dependencies installed successfully

REM Display next steps
echo.
echo ╔════════════════════════════════════════════════════════╗
echo ║  Setup Complete!                                      ║
echo ╚════════════════════════════════════════════════════════╝
echo.
echo Next steps:
echo.
echo 1. Make sure you're in the 'backend' directory:
echo    cd backend
echo.
echo 2. Start the server:
echo    npm start          (for production)
echo    npm run dev        (for development with auto-reload)
echo.
echo 3. Open your browser and navigate to:
echo    http://localhost:5000
echo.
echo 4. That's it! Start managing student records.
echo.
echo ✓ The app comes pre-seeded with sample data.
echo.
pause
