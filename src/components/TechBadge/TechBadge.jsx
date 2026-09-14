import styles from './TechBadge.module.css'

// TechBadge - the deepest component in the prop drilling chain
// Prop drilling: Projects page → ProjectCard → TechBadge (3 levels deep)
// receives a single `label` string (e.g. "React", "Python") and renders it as a pill
function TechBadge({ label }) {
  return <span className={styles.badge}>{label}</span>
}

export default TechBadge
