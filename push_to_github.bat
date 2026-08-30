@echo off
title Upload Coffee Belt Project to GitHub
chcp 65001 > nul
cd /d "%~dp0"

echo =======================================================
echo 🚀 Автоматическая публикация проекта на GitHub
echo =======================================================
echo.

set /p REPO_URL="Вставьте ссылку на ваш GitHub репозиторий (например, https://github.com/username/coffee-belt.git): "

if "%REPO_URL%"=="" (
    echo [ОШИБКА] Вы не ввели ссылку на репозиторий!
    pause
    exit /b 1
)

echo.
echo [1/4] Индексация файлов...
git add .

echo [2/4] Создание коммита...
git commit -m "Complete The Coffee Belt Tashkent Website"

echo [3/4] Настройка ветки main...
git branch -M main

echo [4/4] Привязка репозитория и загрузка...
git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo =======================================================
    echo 🎉 УСПЕХ! Проект успешно загружен на GitHub!
    echo Теперь вы можете подключить его к Vercel в 1 клик.
    echo =======================================================
) else (
    echo.
    echo [ОШИБКА] Не удалось загрузить на GitHub. Проверьте ссылку и авторизацию.
)

pause
