import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import TechBadge from '../../components/TechBadge/TechBadge'
import styles from './ProjectDetail.module.css'

// Base URL — shared env variable set in /.env
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001'

// ProjectDetail - renders a single project fetched from the backend.
//
// Data flow (Part 4):
//   useParams() → id → fetch GET /api/projects/:id → Express → projects.json
//
// The page works on direct URL load or browser refresh (no dependency on Projects
// page having been visited first).
function ProjectDetail() {
  const { id } = useParams() // reads the :id part from the URL

  // State: the fetched project object (null until loaded)
  const [project, setProject] = useState(null)

  // State: the full list of projects — needed for Prev/Next navigation
  const [allProjects, setAllProjects] = useState([])

  // State: true while the network request is in-flight
  const [loading, setLoading] = useState(true)

  // State: non-empty string when something goes wrong
  const [error, setError] = useState('')

  // Fetch the specific project whenever the id param changes (e.g. Prev/Next nav)
  useEffect(() => {
    const controller = new AbortController()

    async function fetchProject() {
      try {
        setLoading(true)
        setError('')
        setProject(null)

        const response = await fetch(`${API_BASE}/api/projects/${id}`, {
          signal: controller.signal,
        })

        // 404 → the id doesn't exist in the backend
        if (response.status === 404) {
          setError('not_found')
          return
        }

        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`)
        }

        const data = await response.json()

        // Normalise techStack → tech so TechBadge receives the right prop name
        setProject({
          ...data,
          tech: data.techStack ?? data.tech ?? [],
        })
      } catch (err) {
        if (err.name === 'AbortError') return
        console.error('[ProjectDetail] fetch failed:', err)
        setError('unreachable')
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
    return () => controller.abort()
  }, [id]) // re-run whenever the project id in the URL changes

  // Fetch all projects once for Prev/Next navigation links
  useEffect(() => {
    let cancelled = false

    fetch(`${API_BASE}/api/projects`)
      .then(r => r.json())
      .then(data => { if (!cancelled) setAllProjects(data) })
      .catch(() => {}) // nav links are non-critical; silently skip on error

    return () => { cancelled = true }
  }, []) // only runs once on mount

  // ── Render: loading ──────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="page-wrapper">
        <p style={{ color: 'var(--text-muted)', marginTop: '60px', fontSize: '1rem' }}>
          Loading project...
        </p>
      </div>
    )
  }

  // ── Render: 404 — project id not in the backend ──────────────────────────
  if (error === 'not_found') {
    return (
      <div className="page-wrapper">
        <div className={styles.notFound}>
          <h2>Project Not Found</h2>
          <p>No project with id "{id}" exists.</p>
          <Link to="/projects" className="primary-btn">Back to Projects</Link>
        </div>
      </div>
    )
  }

  // ── Render: network/server error ─────────────────────────────────────────
  if (error) {
    return (
      <div className="page-wrapper">
        <div className={styles.notFound}>
          <h2>Could Not Load Project</h2>
          <p>Unable to reach the backend. Please make sure the server is running.</p>
          <Link to="/projects" className="primary-btn">Back to Projects</Link>
        </div>
      </div>
    )
  }

  // ── Final null guard — prevents crash if project hasn't resolved yet ─────
  // This covers any edge case where loading=false but project is still null.
  if (!project) return null

  // ── Build Prev / Next links from the full projects list ──────────────────
  const index       = allProjects.findIndex(p => p.id === project.id)
  const prevProject = index > 0 ? allProjects[index - 1] : null
  const nextProject = index >= 0 && index < allProjects.length - 1
    ? allProjects[index + 1]
    : null

  // ── Render: success ──────────────────────────────────────────────────────
  return (
    <div className="page-wrapper">
      {/* breadcrumb trail: All Projects / Project Name */}
      <nav className={styles.breadcrumb}>
        <Link to="/projects">← All Projects</Link>
        <span>/ {project.title}</span>
      </nav>

      <article className={styles.detailCard}>
        {/* card header: status badge, year, title, tech stack */}
        <header className={styles.cardHeader}>
          <div className={styles.meta}>
            {/* dynamically apply completed or inProgress style based on project status */}
            <span className={project.status === 'In Progress' ? styles.inProgress : styles.completed}>
              {project.status}
            </span>
            <span className={styles.year}>{project.year}</span>
          </div>

          <h1 className={styles.title}>{project.title}</h1>

          {/* tech badges — prop drilling: ProjectDetail → TechBadge */}
          <div className={styles.techRow}>
            {project.tech.map(t => (
              <TechBadge key={t} label={t} /> // passes each tech string as a label prop
            ))}
          </div>
        </header>

        {/* card body: full project description */}
        <section className={styles.body}>
          <h2 className={styles.sectionLabel}>About This Project</h2>
          <p className={styles.description}>{project.description}</p>
        </section>

        {/* card footer: back button */}
        <footer className={styles.cardFooter}>
          <Link to="/projects" className="secondary-btn">← Back to Projects</Link>
        </footer>
      </article>

      {/* Previous / Next navigation between projects */}
      <div className={styles.navBtns}>
        {/* only show prev button if there is a previous project */}
        {prevProject ? (
          <Link to={`/projects/${prevProject.id}`} className={styles.navBtn}>
            ← {prevProject.title}
          </Link>
        ) : <span />}   {/* empty span keeps the layout aligned if no prev */}

        {/* only show next button if there is a next project */}
        {nextProject ? (
          <Link to={`/projects/${nextProject.id}`} className={styles.navBtn}>
            {nextProject.title} →
          </Link>
        ) : <span />}
      </div>
    </div>
  )
}

export default ProjectDetail
