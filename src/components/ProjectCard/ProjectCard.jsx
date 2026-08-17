import { useState } from 'react'
import { Link } from 'react-router-dom'
import TechBadge from '../TechBadge/TechBadge'
import styles from './ProjectCard.module.css'

// ProjectCard - all content comes through props, no hardcoded data inside
function ProjectCard({ id, title, description, shortDesc, tech, link, github, year, status }) {
  // state 3: each card has its own showDetails state (not shared between cards)
  const [showDetails, setShowDetails] = useState(false)

  return (
    <article className={styles.card}>
      <div className={styles.topRow}>
        <span className={status === 'In Progress' ? styles.inProgress : styles.completed}>
          {status}
        </span>
        <span className={styles.year}>{year}</span>
      </div>

      <h3 className={styles.title}>{title}</h3>

      {/* tech array is passed from Projects page -> ProjectCard -> TechBadge (prop drilling) */}
      <div className={styles.techRow}>
        {tech.map(t => (
          <TechBadge key={t} label={t} />
        ))}
      </div>

      <p className={styles.desc}>
        {showDetails ? description : shortDesc}
      </p>

      <div className={styles.buttons}>
        <button
          className={styles.detailsBtn}
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Show Less ▲' : 'View Details ▼'}
        </button>

        <div className={styles.linkRow}>
          <Link to={`/projects/${id}`} className={styles.fullPageLink}>
            Full Page →
          </Link>
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
