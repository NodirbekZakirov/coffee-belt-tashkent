@echo off
setlocal enabledelayedexpansion
title The Coffee Belt Tashkent - Local Development Server

cd /d "%~dp0"

echo =======================================================
echo ☕ Запуск сайта кофейни "The Coffee Belt" (Ташкент)
echo =======================================================
echo.

:: 1. Проверка установки Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ОШИБКА] Node.js не найден! Пожалуйста, установите Node.js с https://nodejs.org/
    echo.
    pause
    exit /b 1
)

:: 2. Проверка папки node_modules
if not exist "node_modules\" (
    echo [1/3] Установка зависимостей проекта (npm install)...
    call npm install
    if %errorlevel% neq 0 (
        echo [ОШИБКА] Не удалось установить пакеты.
        pause
        exit /b 1
    )
)

:: 3. Синхронизация базы данных SQLite
echo [2/3] Проверка базы данных SQLite (dev.db)...
call npx prisma db push

:: 4. Автоматическое открытие в Google Chrome
echo [3/3] Открытие сайта в Google Chrome...
echo.
echo =======================================================
echo   Сайт открывается в Google Chrome: http://localhost:3000
echo   Не закрывайте это окно CMD во время работы!
echo =======================================================
echo.

:: Запуск открытия Google Chrome
powershell -Command "Start-Sleep -Seconds 3; if (Test-Path 'C:\Program Files\Google\Chrome\Application\chrome.exe') { Start-Process 'C:\Program Files\Google\Chrome\Application\chrome.exe' 'http://localhost:3000' } elseif (Test-Path 'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe') { Start-Process 'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe' 'http://localhost:3000' } else { start chrome 'http://localhost:3000' }" >nul 2>&1 &

:: Запуск сервера Next.js dev
call npx next dev -p 3000

if %errorlevel% neq 0 (
    echo.
    echo [ОШИБКА] Сервер остановлен с ошибкой.
)

pause
