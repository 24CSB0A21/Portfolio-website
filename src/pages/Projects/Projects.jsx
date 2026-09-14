import { useState, useEffect } from 'react'
import ProjectCard from '../../components/ProjectCard/ProjectCard'
import styles from './Projects.module.css'

// Base URL comes from the Vite environment variable defined in /.env
// Falls back to port 5001 (macOS port 5000 is taken by AirPlay Receiver)
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001'

// Projects page - now loads project data from the Express backend instead of
// the local static file (src/data/projects.js).
//
// Data flow (Part 3):
//   React → fetch() → GET /api/projects → Express → projects.json → ProjectCard
function Projects() {
  // State 1: the array of projects returned by the API (initially empty)
  const [projects, setProjects] = useState([])

  // State 2: true while the fetch is in-flight
  const [loading, setLoading] = useState(true)

  // State 3: non-empty string when something goes wrong
  const [error, setError] = useState('')

  // Fetch projects from the backend on first render.
  // An AbortController lets us cancel the request if the component unmounts
  // before the response arrives (prevents state-update-on-unmounted-component).
  useEffect(() => {
    const controller = new AbortController()

    async function fetchProjects() {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(`${API_BASE}/api/projects`, {
          signal: controller.signal,
        })

        // Guard: treat any non-2xx status as an error
        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`)
        }

        const data = await response.json()

        // The API returns techStack but ProjectCard expects the prop named 'tech'.
        // Normalise here so ProjectCard requires no changes.
        const normalised = data.map(project => ({
          ...project,
          tech: project.techStack ?? project.tech ?? [],
        }))

        setProjects(normalised)
      } catch (err) {
        // Ignore intentional AbortError (component unmounted)
        if (err.name === 'AbortError') return

        console.error('[Projects] fetch failed:', err)

        setError(
          'Unable to load projects. Please make sure the backend server is running.'
        )
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()

    // Cleanup: cancel in-flight request if component unmounts
    return () => controller.abort()
  }, []) // empty dep array → run once on mount

  // ── Render: loading state ────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="page-wrapper">
        <div className="section-heading">
          <h2>Projects</h2>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '12px' }}>
          Loading projects...
        </p>
      </div>
    )
  }

  // ── Render: error state ──────────────────────────────────────────────────
  if (error) {
    return (
      <div className="page-wrapper">
        <div className="section-heading">
          <h2>Projects</h2>
        </div>
        <div
          style={{
            marginTop: '16px',
            padding: '20px 24px',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--surface2)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
          }}
        >
          <strong style={{ color: 'var(--brown)' }}>⚠ Could not load projects</strong>
          <p style={{ marginTop: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            {error}
          </p>
        </div>
      </div>
    )
  }

  // ── Render: success state — identical layout to Assignment 2 ─────────────
  return (
    <div className="page-wrapper">
      <div className="section-heading">
        <h2>Projects</h2>
      </div>

      {/* map over the projects array fetched from the API */}
      {/* each project's fields are passed as individual props to ProjectCard */}
      {/* this is prop drilling level 1: Projects → ProjectCard */}
      <div className={styles.list}>
        {projects.map(project => (
          <ProjectCard
            key={project.id}            // React needs a unique key for list items
            id={project.id}
            title={project.title}
            description={project.description}
            shortDesc={project.shortDesc}
            tech={project.tech}         // normalised from techStack in the API response
            link={project.link}
            github={project.github}
            year={project.year}
            status={project.status}
          />
        ))}
      </div>
    </div>
  )
}

export default Projects
