import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.brand}>
          RAKSHITH <span>DONGARI</span>
        </p>

        <nav className={styles.links}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/contact">Contact</Link>
        </nav>

        <p className={styles.copy}>
          © {year} Rakshith Dongari · NIT Warangal · 24CSB0A21
        </p>
      </div>
    </footer>
  )
}

export default Footer
