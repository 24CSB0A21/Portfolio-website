import { useState } from 'react'
import { Link } from 'react-router-dom'
import TechBadge from '../TechBadge/TechBadge'
import styles from './ProjectCard.module.css'

// ProjectCard - generic card component, all content comes through props
// no data is hardcoded here - the Projects page passes everything in
function ProjectCard({ id, title, description, shortDesc, tech, link, github, year, status }) {
  // state 3: each card instance has its own independent showDetails value
  // clicking "View Details" on one card does NOT affect any other card
  const [showDetails, setShowDetails] = useState(false)

  return (
    <article className={styles.card}>
      {/* top row: status badge + year */}
      <div className={styles.topRow}>
        {/* apply different style depending on whether project is done or in progress */}
        <span className={status === 'In Progress' ? styles.inProgress : styles.completed}>
          {status}
        </span>
        <span className={styles.year}>{year}</span>
      </div>

      {/* project title */}
      <h3 className={styles.title}>{title}</h3>

      {/* tech stack badges */}
      {/* prop drilling: Projects page → ProjectCard → TechBadge (3 levels deep) */}
      <div className={styles.techRow}>
        {tech.map(t => (
          <TechBadge key={t} label={t} /> // passes each tech string down to TechBadge
        ))}
      </div>

      {/* show short description by default, full description when expanded */}
      <p className={styles.desc}>
        {showDetails ? description : shortDesc}
      </p>

      {/* action buttons */}
      <div className={styles.buttons}>
        {/* toggle button: flips showDetails between true and false */}
        <button
          className={styles.detailsBtn}
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Show Less ▲' : 'View Details ▼'}
        </button>

        {/* link to the full project detail page using the project id */}
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
