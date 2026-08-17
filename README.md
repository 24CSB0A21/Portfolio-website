# Rakshith Dongari — Portfolio (Assignment 2)

A fully functional **React** single-page application converted from a static HTML/CSS portfolio.  
Built with **Vite + React 18**, **react-router-dom v6**, and **plain CSS Modules** — no third-party component libraries.

---

## 🚀 Setup & Run Instructions

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
# → Open http://localhost:5173

# 3. Production build (zero console errors)
npm run build
npm run preview   # preview the built site
```

> **Node requirement**: Node ≥ 18

---

## 📁 Folder Structure

```
src/
├── assets/                     # static assets
├── components/
│   ├── Layout/                 # Shared layout (Navbar + Footer wrapper)
│   ├── Navbar/                 # Sticky navbar with theme toggle + hamburger
│   ├── Footer/                 # Footer with Link-based navigation
│   ├── ProjectCard/            # Generic card — all content via props
│   ├── TechBadge/              # Leaf component (grandchild in prop drilling chain)
│   ├── ContactForm/            # Fully controlled form with validation
│   └── LoadingScreen/          # Full-screen loading overlay
├── pages/
│   ├── Home/                   # Hero + about summary (loading useEffect)
│   ├── About/                  # Education, skills, achievements
│   ├── Projects/               # Maps projects.js → ProjectCard list
│   ├── ProjectDetail/          # Dynamic /projects/:projectId (useParams)
│   ├── Contact/                # ContactForm + info panel
│   └── NotFound/               # 404 catch-all
├── data/
│   └── projects.js             # Central project data array
├── App.jsx                     # Router + theme state
├── App.css                     # Global tokens (light + dark CSS vars)
└── main.jsx                    # ReactDOM entry
```

---

## 🧩 Component Tree & State-Lifting Decisions

```
App  ←  theme state (useState #1) lifted here so every child can access it
 ├─ Navbar   ← receives theme + toggleTheme via props (drilling level 1)
 ├─ Routes
 │   ├─ /           Home           ← loading state (useState internal)
 │   ├─ /about      About
 │   ├─ /projects   Projects       ← receives projects array from data module
 │   │    └─ ProjectCard           ← level 2: receives project fields as props
 │   │         └─ TechBadge        ← level 3: receives `label` string (grandchild)
 │   ├─ /projects/:projectId  ProjectDetail  ← useParams()
 │   ├─ /contact    Contact
 │   │    └─ ContactForm           ← controlled form state (useState #2)
 │   └─ *           NotFound
 └─ Footer
```

**Why theme is lifted to `App`**: The Navbar (theme toggle button) and every page need to both *read* the current theme (to apply styles) and *trigger* a change. Lifting to `App` avoids prop-threading issues and keeps a single source of truth without requiring Context API.

---

## ⚛️ useState Hooks (3 independent pieces of state)

| # | State | Component | Purpose |
|---|-------|-----------|---------|
| **1** | `theme` (`'light'` \| `'dark'`) | `App.jsx` | Global theme toggle — lifted to top level, shared downward via props |
| **2** | `formData`, `errors`, `submitted` | `ContactForm.jsx` | Controlled form: every input bound to state; submit disabled until valid |
| **3** | `expanded` (boolean) | `ProjectCard.jsx` | Per-card "View Details" toggle — each card instance has its own independent state |

---

## 🔁 useEffect Hooks

| # | Location | Dependencies | Purpose | Cleanup |
|---|----------|-------------|---------|---------|
| **Effect 1** | `Home.jsx` | `[]` (mount only) | `setTimeout` for 1.2-second loading sequence before showing hero content | `clearTimeout(timer)` prevents state update on unmounted component |
| **Effect 2** | `App.jsx` | `[theme]` | Writes theme value to `localStorage` and sets `data-theme` attribute on `<html>` whenever theme changes; lazy initialiser reads saved preference on first render | n/a — no subscription/event |
| **Effect 3** | `Navbar.jsx` | `[]` (mount only) | `window.addEventListener('resize', ...)` auto-closes hamburger menu when viewport widens past 768 px | `window.removeEventListener(...)` prevents memory leak |
| **Effect 4** | `Navbar.jsx` | `[]` (mount only) | `document.addEventListener('mousedown', ...)` closes menu when clicking outside the nav | `document.removeEventListener(...)` cleanup |

---

## 🗺️ Routes

| Path | Component | Notes |
|------|-----------|-------|
| `/` | `Home` | Loading screen on mount |
| `/about` | `About` | Education · Skills · Achievements |
| `/projects` | `Projects` | List of all project cards |
| `/projects/:projectId` | `ProjectDetail` | Dynamic route via `useParams()` |
| `/contact` | `Contact` | Controlled form with validation |
| `*` | `NotFound` | 404 with back-to-home link |

All navigation uses `<NavLink>` / `<Link>` — **no plain `<a>` tags** for internal routes.

---

## 🎨 Styling

- Warm **cream/brown/gold** palette inherited from Assignment 1
- **Dark mode** implemented via `[data-theme="dark"]` CSS variable overrides
- **CSS Modules** per component for class scoping
- Responsive breakpoints: mobile ≤ 480 px, tablet ≤ 768 px

---

## ♿ Accessibility

- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- Single `<h1>` per page; logical heading hierarchy
- `aria-label`, `aria-expanded`, `aria-describedby` on interactive elements
- Form errors announced via `role="alert"`
- WCAG AA color contrast maintained in both light and dark modes
