# Rakshith Dongari — Portfolio (Assignment 3)

Assignment 3 extends the existing **React Portfolio from Assignment 2** with a
**Node.js / Express** backend. The frontend now fetches all project and contact
data from a REST API instead of local static files.

---

## 📋 Project Overview

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React 18 + Vite | SPA portfolio UI |
| Routing | React Router v6 | Client-side routing |
| Data fetching | `fetch` + `useEffect` | Load API data into React state |
| Backend | Node.js + Express | REST API server |
| Cross-Origin | CORS | Allow frontend ↔ backend communication |
| Config | dotenv | Environment variables |
| Storage | JSON files | Persist project and contact data |

No database or ORM is used. All data is stored in plain JSON files on disk.

---

## 🗂️ Repository Structure

```
fsd_week3/
├── src/                        # React frontend (Assignment 2 + 3 changes)
│   ├── components/
│   │   ├── ContactForm/        # Controlled form → POST /api/contact
│   │   ├── Layout/
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   ├── ProjectCard/
│   │   ├── TechBadge/
│   │   └── LoadingScreen/
│   ├── pages/
│   │   ├── Home/
│   │   ├── About/
│   │   ├── Projects/           # fetch() → GET /api/projects
│   │   ├── ProjectDetail/      # fetch() → GET /api/projects/:id
│   │   ├── Contact/
│   │   └── NotFound/
│   ├── data/
│   │   └── projects.js         # KEPT for reference — frontend no longer reads this
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
│
├── server/                     # Express backend (Assignment 3 — NEW)
│   ├── data/
│   │   ├── projects.json       # Project data served by the API
│   │   └── contacts.json       # Contact form submissions (appended on POST)
│   ├── server.js               # Express app entry point
│   ├── package.json
│   ├── .env                    # NOT committed (git-ignored)
│   └── .env.example            # Safe template committed to git
│
├── .env                        # Vite env — VITE_API_BASE_URL (git-ignored)
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

## 🛠️ Technologies

### Frontend
- **React 18** — component UI
- **React Router v6** — `<BrowserRouter>`, `<Routes>`, `useParams()`
- **fetch API** — native browser API, no Axios
- **useState / useEffect** — state and side effects
- **CSS Modules** — scoped component styling
- **Vite** — build tool and dev server

### Backend
- **Node.js** — runtime
- **Express** — HTTP framework
- **cors** — cross-origin resource sharing middleware
- **dotenv** — loads `.env` into `process.env`
- **nodemon** (dev only) — auto-restarts server on file changes

### Storage
- Plain **JSON files** on disk (`server/data/`)
- No database, no ORM, no external service

---

## 📦 Installation

### 1. Frontend dependencies (project root)

```bash
npm install
```

### 2. Backend dependencies

```bash
cd server
npm install
```

---

## ⚙️ Environment Setup

### Backend — `server/.env`

Create this file (it is **git-ignored** and must never be committed):

```
PORT=5001
DATA_FILE_PATH=./data
ALLOWED_ORIGIN=http://localhost:5173
```

> **Note on PORT**: macOS reserves port 5000 for AirPlay Receiver.
> Use `5001` (or disable AirPlay Receiver in System Settings → General → AirDrop & Handoff to use `5000`).

A safe template is committed at `server/.env.example` — copy it:

```bash
cp server/.env.example server/.env
```

### Frontend — `.env` (project root)

```
VITE_API_BASE_URL=http://localhost:5001
```

Vite only exposes variables prefixed with `VITE_` to the browser bundle.

> **Important**: Neither `.env` file should ever be committed to git.
> Both are covered by `.gitignore`.

---

## 🚀 Running the Application

Both servers must run **simultaneously in separate terminals**.

### Terminal 1 — Backend

```bash
cd server
npm run dev        # nodemon (auto-restart on changes)
# or
npm start          # plain node (production)
```

The server starts on `http://localhost:5001`.

### Terminal 2 — Frontend

```bash
npm run dev        # from project root
# Open http://localhost:5173
```

---

## 🌐 API Documentation

Base URL: `http://localhost:5001`

---

### GET / — Health Check

**Purpose:** Verify the server is running.

**Response 200:**
```json
{ "status": "ok" }
```

---

### GET /api/projects — Get All Projects

**Purpose:** Returns all projects from `server/data/projects.json`.

**Response 200:**
```json
[
  {
    "id": 1,
    "title": "RAG Studio: PDF RAG Chatbot",
    "description": "...",
    "shortDesc": "...",
    "techStack": ["Python", "AI", "RAG", "ChromaDB"],
    "image": null,
    "link": "#",
    "github": "#",
    "year": "2025",
    "status": "Completed"
  }
]
```

---

### GET /api/projects/:id — Get Single Project

**Purpose:** Returns a single project by numeric id.

**Response 200** (found):
```json
{ "id": 1, "title": "RAG Studio: PDF RAG Chatbot", "techStack": [...], ... }
```

**Response 404** (not found):
```json
{ "error": "Project not found" }
```

---

### POST /api/contact — Submit Contact Form

**Purpose:** Validates and persists a contact form submission.

**Headers:** `Content-Type: application/json`

**Request body:**
```json
{
  "name": "Rakshith",
  "email": "test@example.com",
  "message": "Hello, I'd like to connect."
}
```

**Response 201** (success):
```json
{ "message": "Contact submitted successfully" }
```

**Response 400** (validation failure):

Validation runs in order — first failing field is returned:

| Field | Error |
|---|---|
| name missing/empty | `{ "error": "Name is required" }` |
| email missing/empty | `{ "error": "Email is required" }` |
| email invalid format | `{ "error": "Invalid email format" }` |
| message missing/empty | `{ "error": "Message is required" }` |

Each valid submission is appended to `server/data/contacts.json`.
Previous submissions are never overwritten.
Each entry contains `id` (timestamp), `name`, `email`, `message`, `timestamp` (ISO 8601).

---

### GET /api/contact — Get All Contact Submissions

**Purpose:** Returns all stored contact form submissions as a JSON array.

**Auth:** None — intentionally open endpoint. Authentication is out of scope for this assignment.

**Response 200:**
```json
[
  {
    "id": 1789291852935,
    "name": "Rakshith",
    "email": "test@example.com",
    "message": "Hello",
    "timestamp": "2026-09-13T09:30:52.935Z"
  }
]
```

Returns `[]` if no submissions exist yet.

---

### Error Handling

**Unknown route — 404:**
```json
{ "error": "Route not found" }
```

**Unexpected server error — 500:**
```json
{ "error": "Internal server error" }
```

HTML error pages are never returned. Stack traces are never exposed. The server remains running after errors.

---

## 💾 Storage

| File | Contents |
|---|---|
| `server/data/projects.json` | All 4 portfolio projects |
| `server/data/contacts.json` | Array of contact form submissions (appended on each valid POST) |

No database or ORM is used. Files are read/written using Node's built-in `fs` module.

---

## 🧪 curl Test Commands

Replace `5001` with `5000` if your port differs.

```bash
# 1. Health check
curl http://localhost:5001/

# 2. Get all projects
curl http://localhost:5001/api/projects

# 3. Get single project (valid)
curl http://localhost:5001/api/projects/1

# 4. Get single project (invalid — expect 404)
curl http://localhost:5001/api/projects/999

# 5. Valid contact submission (expect 201)
curl -X POST http://localhost:5001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Rakshith","email":"test@example.com","message":"Hello"}'

# 6. Invalid email (expect 400)
curl -X POST http://localhost:5001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Rakshith","email":"invalid","message":"Hello"}'

# 7. Missing message (expect 400)
curl -X POST http://localhost:5001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Rakshith","email":"test@example.com"}'

# 8. Get all stored contacts
curl http://localhost:5001/api/contact

# 9. Unknown route (expect 404)
curl http://localhost:5001/api/doesnotexist
```

---

## ✅ Assignment 3 Code Review Checklist

### Backend
- [x] Backend lives in `/server`
- [x] `GET /` returns `{ "status": "ok" }`
- [x] `GET /api/projects` returns JSON array
- [x] `GET /api/projects/:id` returns project or 404 JSON
- [x] `POST /api/contact` validates and persists submission
- [x] `GET /api/contact` returns stored submissions
- [x] 404 catch-all returns JSON (never HTML)
- [x] Global error handler returns JSON (never HTML or stack traces)
- [x] CORS enabled using `ALLOWED_ORIGIN` from `.env`
- [x] Port from `process.env.PORT` (not hardcoded)
- [x] `server/.env` is git-ignored
- [x] `server/.env.example` is committed

### Frontend
- [x] Static project data no longer used by frontend
- [x] `Projects` page: `fetch` + `useEffect` + loading + error states
- [x] `ProjectDetail`: `useParams()` + API call + handles 404 and network errors
- [x] `ProjectDetail`: works on direct URL and browser refresh
- [x] `ContactForm`: POSTs to `/api/contact`, shows server errors, resets on success

### Assignment 2 Regression
- [x] Navbar, theme toggle, routing, 404 page all work
- [x] Home, About, Projects, Contact pages unchanged
- [x] Responsive design and existing styling preserved

---

## 🔒 .gitignore

```
node_modules/
server/node_modules/
dist/
.env
.env.local
server/.env
*.log
.DS_Store
```

`server/.env.example` **is** committed to git — it contains no secrets.
