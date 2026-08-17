import { useParams, Link } from 'react-router-dom'
import { projects } from '../../data/projects'
import TechBadge from '../../components/TechBadge/TechBadge'
import styles from './ProjectDetail.module.css'

// Dynamic route: /projects/:id — reads the id from the URL
function ProjectDetail() {
  const { id } = useParams()
  const project = projects.find(p => p.id === Number(id))

  if (!project) {
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

  // find previous and next projects for navigation
  const index = projects.findIndex(p => p.id === project.id)
  const prevProject = projects[index - 1]
  const nextProject = projects[index + 1]

  return (
    <div className="page-wrapper">
      <nav className={styles.breadcrumb}>
        <Link to="/projects">← All Projects</Link>
        <span> / {project.title}</span>
      </nav>

      <article className={styles.detailCard}>
        <header className={styles.cardHeader}>
          <div className={styles.meta}>
            <span className={project.status === 'In Progress' ? styles.inProgress : styles.completed}>
              {project.status}
            </span>
            <span className={styles.year}>{project.year}</span>
          </div>

          <h1 className={styles.title}>{project.title}</h1>

          <div className={styles.techRow}>
            {project.tech.map(t => (
              <TechBadge key={t} label={t} />
            ))}
          </div>
        </header>

        <section className={styles.body}>
          <h2 className={styles.sectionLabel}>About This Project</h2>
          <p className={styles.description}>{project.description}</p>
        </section>

        <footer className={styles.cardFooter}>
          <Link to="/projects" className="secondary-btn">← Back to Projects</Link>
        </footer>
      </article>

      {/* Previous / Next navigation */}
      <div className={styles.navBtns}>
        {prevProject ? (
          <Link to={`/projects/${prevProject.id}`} className={styles.navBtn}>
            ← {prevProject.title}
          </Link>
        ) : <span />}
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
