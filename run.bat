@echo off
setlocal enabledelayedexpansion
title The Coffee Belt Tashkent - Local Development Server

cd /d "%~dp0"

echo =======================================================
echo ☕ Запуск сайта кофейни "The Coffee Belt" (Ташкент)
echo =======================================================
echo.

powershell -Command "Start-Sleep -Seconds 3; if (Test-Path 'C:\Program Files\Google\Chrome\Application\chrome.exe') { Start-Process 'C:\Program Files\Google\Chrome\Application\chrome.exe' 'http://localhost:3000' } elseif (Test-Path 'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe') { Start-Process 'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe' 'http://localhost:3000' } else { start chrome 'http://localhost:3000' }" >nul 2>&1 &

call npx next dev -p 3000

pause
