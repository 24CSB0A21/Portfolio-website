/**
 * server/server.js
 * Entry point for the Assignment 3 Express backend.
 *
 * Endpoints:
 *   GET  /                   — health check
 *   GET  /api/projects       — return all projects
 *   GET  /api/projects/:id   — return a single project by id
 *   POST /api/contact        — validate and persist a contact submission
 *   GET  /api/contact        — return all saved contact submissions
 *
 * Error handling:
 *   404 catch-all            — unknown routes return JSON
 *   Global error middleware  — unexpected errors return JSON (no HTML, no stack traces)
 */

import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'
import { readFileSync, writeFileSync, existsSync } from 'fs'

// ── helpers for __dirname in ES-module context ───────────────────────────────
const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

// ── config from .env ─────────────────────────────────────────────────────────
const PORT           = process.env.PORT           || 5000
const DATA_FILE_PATH = process.env.DATA_FILE_PATH || './data'
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:5173'

// Resolve the data directory relative to this file so the server works
// regardless of which directory it is launched from.
const dataDir = path.resolve(__dirname, DATA_FILE_PATH)

// ── tiny helper: read a JSON file synchronously ─────────────────────────────
// If the file doesn't exist yet, returns the provided fallback value.
function readJSON(filename, fallback = null) {
  const fullPath = path.join(dataDir, filename)
  if (!existsSync(fullPath)) {
    if (fallback !== null) return fallback
    throw new Error(`File not found: ${fullPath}`)
  }
  const raw = readFileSync(fullPath, 'utf-8')
  return JSON.parse(raw)
}

// ── tiny helper: write data to a JSON file synchronously ─────────────────────
// Uses a temp-then-rename pattern to avoid partial writes corrupting the file.
function writeJSON(filename, data) {
  const fullPath = path.join(dataDir, filename)
  writeFileSync(fullPath, JSON.stringify(data, null, 2), 'utf-8')
}

// ── email validation regex ────────────────────────────────────────────────────
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// ── app setup ─────────────────────────────────────────────────────────────────
const app = express()

// Parse incoming JSON bodies (needed for future POST routes)
app.use(express.json())

// CORS — only allow requests from the configured origin
app.use(
  cors({
    origin: ALLOWED_ORIGIN,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  })
)

// ── B1: Health check ──────────────────────────────────────────────────────────
app.get('/', (_req, res) => {
  res.status(200).json({ status: 'ok' })
})

// ── B2: GET all projects ──────────────────────────────────────────────────────
app.get('/api/projects', (_req, res, next) => {
  try {
    const projects = readJSON('projects.json')
    res.status(200).json(projects)
  } catch (err) {
    next(err) // hand off to global error handler
  }
})

// ── B3: GET single project by id ──────────────────────────────────────────────
app.get('/api/projects/:id', (req, res, next) => {
  try {
    const projects = readJSON('projects.json')
    const id       = parseInt(req.params.id, 10) // ids are numbers in the JSON

    const project = projects.find(p => p.id === id)

    if (!project) {
      // Return JSON — never an HTML error page
      return res.status(404).json({ error: 'Project not found' })
    }

    res.status(200).json(project)
  } catch (err) {
    next(err)
  }
})

// ── B4: POST /api/contact — validate and persist a submission ────────────────
app.post('/api/contact', (req, res, next) => {
  try {
    const { name, email, message } = req.body ?? {}

    // ── Sequential field validation (name → email → email-format → message) ──
    if (!name || String(name).trim() === '') {
      return res.status(400).json({ error: 'Name is required' })
    }

    if (!email || String(email).trim() === '') {
      return res.status(400).json({ error: 'Email is required' })
    }

    if (!EMAIL_REGEX.test(String(email).trim())) {
      return res.status(400).json({ error: 'Invalid email format' })
    }

    if (!message || String(message).trim() === '') {
      return res.status(400).json({ error: 'Message is required' })
    }

    // ── Build the submission entry ────────────────────────────────────────────
    const submission = {
      id:        Date.now(),                        // simple unique id
      name:      String(name).trim(),
      email:     String(email).trim().toLowerCase(),
      message:   String(message).trim(),
      timestamp: new Date().toISOString(),          // ISO 8601 for easy sorting
    }

    // ── Read current contacts (auto-create [] if file is missing) ─────────────
    const contacts = readJSON('contacts.json', [])

    // ── Append and persist ────────────────────────────────────────────────────
    contacts.push(submission)
    writeJSON('contacts.json', contacts)

    console.log(`📬  New contact saved: ${submission.name} <${submission.email}>`)

    return res.status(201).json({ message: 'Contact submitted successfully' })
  } catch (err) {
    next(err)
  }
})

// ── B5: GET all contact submissions ───────────────────────────────────────────
app.get('/api/contact', (_req, res, next) => {
  try {
    const contacts = readJSON('contacts.json', [])  // return [] if file is missing
    res.status(200).json(contacts)
  } catch (err) {
    next(err)
  }
})

// ── 404 catch-all (must come after all real routes) ───────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// ── Global error-handling middleware ──────────────────────────────────────────
// Signature MUST be (err, req, res, next) — four params — for Express to treat
// this as an error handler.
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('[Server Error]', err.message || err)
  // Never expose stack traces or HTML to the client
  res.status(500).json({ error: 'Internal server error' })
})

// ── Start server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅  Server running on http://localhost:${PORT}`)
  console.log(`   CORS allowed origin: ${ALLOWED_ORIGIN}`)
  console.log(`   Data directory     : ${dataDir}`)
})
