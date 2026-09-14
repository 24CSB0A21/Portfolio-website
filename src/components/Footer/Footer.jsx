import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

function Footer() {
  // dynamically get the current year so the copyright stays up to date
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* brand name - same style as the navbar logo */}
        <p className={styles.brand}>
          RAKSHITH <span>DONGARI</span>
        </p>

        {/* footer nav links - using Link instead of <a> to avoid page reload */}
        <nav className={styles.links}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        {/* copyright line with auto-updated year */}
        <p className={styles.copy}>
          © {year} Rakshith Dongari · NIT Warangal · 24CSB0A21
        </p>
      </div>
    </footer>
  )
}

export default Footer
