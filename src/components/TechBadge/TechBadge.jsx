import styles from './TechBadge.module.css'

// TechBadge - receives a single label string as a prop
// This is the grandchild in the prop drilling chain: Projects -> ProjectCard -> TechBadge
function TechBadge({ label }) {
  return <span className={styles.badge}>{label}</span>
}

export default TechBadge
