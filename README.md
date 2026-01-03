# Matches App — Backend

Backend API for the Matches application built with Node.js, Express and PostgreSQL. Provides user authentication and endpoints to fetch matches and manage favorites.

---

## 🚀 Features

- User registration and login with JWT
- Protected endpoints using JWT middleware
- Fetch matches with optional filters (sport, search by team)
- Add / Remove favorites for authenticated users
- Seed script to insert sample matches

---

## 🧭 Tech Stack

- Node.js + Express
- PostgreSQL (pg)
- bcrypt for password hashing
- JSON Web Tokens (jsonwebtoken)
- dotenv for configuration

---

## 📁 Folder Structure

```
MatchesBackend/
├── src/
│   ├── config/      # DB configuration (pg pool)
│   ├── controllers/ # Route handlers (auth, match, favorite)
│   ├── middleware/  # auth middleware
│   ├── routes/      # express routes
│   ├── seed.js      # seed sample matches
│   └── index.js     # server entry
├── package.json
```

---

## 🔧 Environment Variables

Create a `.env` file with:

```
PORT=5000
DATABASE_URL=postgres://user:password@localhost:5432/dbname
JWT_SECRET=your_jwt_secret
```

- For production (e.g., hosted DB) `DATABASE_URL` may include SSL; the project config already sets `ssl: { rejectUnauthorized: false }`.

---

## 🧾 Database Schema (example)

Run these SQL commands to create required tables if using a fresh DB:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE matches (
  id SERIAL PRIMARY KEY,
  sport TEXT,
  league TEXT,
  team_a TEXT,
  team_b TEXT,
  start_time TIMESTAMP
);

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  match_id INTEGER REFERENCES matches(id) ON DELETE CASCADE
);
```

---

## 🧪 Run Locally

1. Install dependencies

```bash
git clone https://github.com/sudheeshna86/MatchesBackend
cd MatchesBackend
npm install
```

2. Set `.env` values (see Environment Variables section)

3. Start server

```bash
npm run dev
```

Server listens on `http://localhost:5000` (or `PORT` from `.env`).

---

## 🔌 Key Endpoints

| Method | Endpoint | Description | Auth required |
| ------ | -------- | ----------- | ------------- |
| POST | `/auth/register` | Register a new user. Payload: `{ name, email, password }` | No |
| POST | `/auth/login` | Login user. Payload: `{ email, password }` → Returns `{ token }` | No |
| GET | `/matches` | Fetch matches. Optional query parameters: `sport`, `search` (by team name) | No |
| GET | `/favorites` | Get current user's favorite matches | Yes (Bearer token)
| POST | `/favorites/:matchId` | Add a match to favorites (use match id in URL) | Yes (Bearer token)
| DELETE | `/favorites/:matchId` | Remove a match from favorites (use match id in URL) | Yes (Bearer token)

---

---

## 🧾 Seed Data

Run the seed script to add sample matches:

```bash
node src/seed.js
```

---

