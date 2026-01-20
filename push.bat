@echo off
echo ========================================
echo   Push to GitHub
echo ========================================
echo.

echo [1/5] Initializing Git...
git init

echo.
echo [2/5] Adding all files...
git add .

echo.
echo [3/5] Committing...
git commit -m "Add Japanese Learning Game with BGM and optimized performance"

echo.
echo [4/5] Setting up remote...
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/MrPusitCH/japan-midtermquizz.git

echo.
echo [5/5] Pushing to GitHub...
git push -u origin main

echo.
echo ========================================
echo   Done! Check: https://github.com/MrPusitCH/japan-midtermquizz
echo ========================================
pause
