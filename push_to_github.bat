@echo off
title Push to GitHub - The Coffee Belt
cd /d "%~dp0"

echo =======================================================
echo 🚀 Подготовка к деплою на Vercel (Загрузка в GitHub)
echo =======================================================
echo.

git init
git add .
git commit -m "Deploy The Coffee Belt website to Vercel"

echo.
echo Вставьте ссылку на ваш новый пустой репозиторий GitHub (например: https://github.com/ВАШ_НИК/coffee-belt.git):
set /p REPO_URL=

if not "%REPO_URL%"=="" (
    git branch -M main
    git remote remove origin >nul 2>&1
    git remote add origin %REPO_URL%
    git push -u origin main --force
    echo.
    echo ✅ Код успешно отправлен в GitHub! Теперь откройте vercel.com для импорта.
) else (
    echo [ОШИБКА] Ссылка на репозиторий не была введена.
)

pause
