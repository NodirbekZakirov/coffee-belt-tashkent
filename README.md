# ☕ The Coffee Belt — Сайт Кофейни (Ташкент)

Официальный веб-сайт для кофейни **"The Coffee Belt"** (Ташкент, ул. Ойбек 12, возле метро "Oybek").

Сайт разработан на **Next.js 14 (App Router)** с использованием **TypeScript**, **Tailwind CSS**, **Framer Motion**, **Prisma ORM** и **Auth.js (NextAuth v5)**.

---

## 🚀 БЫСТРЫЙ ЛОКАЛЬНЫЙ ЗАПУСК

### 1. Установка зависимостей
```bash
npm install
```

### 2. Инициализация и наполнение базы данных
Сайт использует SQLite по умолчанию для локальной разработки (файл `prisma/dev.db` создастся автоматически).
```bash
npx prisma db push
npm run db:seed
```

### 3. Запуск сервера разработки
```bash
npm run dev
```
Откройте [http://localhost:3000](http://localhost:3000) в браузере.

---

## 🔐 НАСТРОЙКА GOOGLE CLOUD OAUTH (для входа в Админ-Панель)

Публичный сайт доступен всем посетителям. Админка по адресу `/admin` защищена авторизацией Google и пускает **только e-mail владельца**, указанный в переменной `ADMIN_EMAIL`.

### Пошаговая инструкция для Google Cloud Console:

1. Перейдите в [Google Cloud Console](https://console.cloud.google.com/) и создайте новый проект (например, `coffee-belt-tashkent`).
2. В меню слева откройте: **APIs & Services → OAuth consent screen**.
   - Выберите тип **External** и нажмите **Create**.
   - Укажите **App name** (например, `The Coffee Belt Admin`), **User support email** и **Developer contact information**. Нажмите **Save and Continue**.
3. Перейдите в раздел **Credentials → Create Credentials → OAuth client ID**.
   - **Application type:** Web application.
   - **Name:** `Coffee Belt Web Client`.
   - **Authorized redirect URIs** (Обязательно добавьте оба URL):
     - Для локальной разработки: `http://localhost:3000/api/auth/callback/google`
     - Для продакшена Vercel: `https://<ваш-домен>.vercel.app/api/auth/callback/google`
4. Нажмите **Create** и скопируйте **Client ID** и **Client Secret**.
5. Добавьте их в ваш `.env.local`:
   ```env
   AUTH_GOOGLE_ID="ваш-client-id.apps.googleusercontent.com"
   AUTH_GOOGLE_SECRET="ваш-client-secret"
   ADMIN_EMAIL="email-владельца@gmail.com"
   AUTH_SECRET="сгенерируйте-через-npx-auth-secret"
   NEXTAUTH_URL="http://localhost:3000"
   ```

---

## 📲 ОПЦИОНАЛЬНО: УВЕДОМЛЕНИЯ О БРОНИ В TELEGRAM

Сайт может автоматически присылать форматированное уведомление с деталями бронирования столика прямо в ваш Telegram-чат или бот!

1. Создайте бота через [@BotFather](https://t.me/BotFather) и скопируйте API Token.
2. Получите ваш Chat ID (например, через [@userinfobot](https://t.me/userinfobot) или добавьте бота в группу и узнайте ID).
3. Добавьте переменные в `.env.local` или в Vercel Environment Variables:
   ```env
   TELEGRAM_BOT_TOKEN="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
   TELEGRAM_CHAT_ID="-100123456789"
   ```
*(Если переменные не заданы, система пропускает отправку в Telegram без ошибок)*.

---

## 📋 ЧЕК-ЛИСТ КОНТЕНТА ОТ ВЛАДЕЛЬЦА ПЕРЕД ЗАПУСКОМ

Сайт уже поставляется с реалистичными плейсхолдер-данными и фото. Перед открытием для публики попросите у владельца:

- [ ] **Актуальное меню и цены (в сумах):** категория, название, описание ингредиентов, цена.
- [ ] **15–20 реальных фотографий:** интерьер, живая зелень, напитки, эклеры, настольные игры, фасад с улицы.
- [ ] **Google e-mail владельца:** для внесения в `ADMIN_EMAIL`.
- [ ] **Официальный логотип (PNG/SVG):** если есть обновленная версия.
- [ ] **Контактный номер WhatsApp/Telegram:** для кликабельных кнопок чата.
- [ ] **Wi-Fi пароль и имя сети:** для редактирования в админке.

---

## 🌐 ДЕПЛОЙ НА VERCEL + NEON/SUPABASE POSTGRESQL

### 1. База данных PostgreSQL (Neon.tech / Supabase)
1. Зарегистрируйтесь на [Neon.tech](https://neon.tech) (бесплатный тариф) и создайте проект `coffee-belt-db`.
2. Скопируйте **Connection String** вида:
   `postgres://user:password@ep-xyz.aws.neon.tech/neondb?sslmode=require`
3. В файле `prisma/schema.prisma` при работе с PostgreSQL замените `provider = "sqlite"` на `provider = "postgresql"`.

### 2. Деплой на Vercel
1. Загрузите репозиторий на GitHub.
2. Войдите в [Vercel Dashboard](https://vercel.com) → **Add New Project** → Выберите репозиторий.
3. В разделе **Environment Variables** укажите:
   - `DATABASE_URL`: ваша ссылка PostgreSQL из Neon/Supabase.
   - `AUTH_SECRET`: сгенерированный секрет (`npx auth secret`).
   - `AUTH_GOOGLE_ID`: Client ID из Google Cloud.
   - `AUTH_GOOGLE_SECRET`: Client Secret из Google Cloud.
   - `ADMIN_EMAIL`: e-mail владельца.
   - `NEXTAUTH_URL`: `https://<ваш-домен>.vercel.app`
   - `TELEGRAM_BOT_TOKEN` (опционально)
   - `TELEGRAM_CHAT_ID` (опционально)
4. Нажмите **Deploy**. Vercel автоматически соберет проект и развернет его на CDN!
5. После деплоя выполните сидирование БД в продакшене через Vercel CLI или утилиту Prisma:
   ```bash
   npx prisma db push
   npx ts-node prisma/seed.ts
   ```

---

## 🛠 ТЕХНИЧЕСКИЙ СТЕК
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + custom coffee design system tokens
- **Animations:** Framer Motion (`framer-motion`), Canvas Confetti
- **Auth:** Auth.js v5 (NextAuth) + Google OAuth
- **Database / ORM:** SQLite (dev) / PostgreSQL (prod) + Prisma ORM
- **Icons:** Lucide React
