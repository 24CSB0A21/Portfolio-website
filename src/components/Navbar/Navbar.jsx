import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

// Navbar gets darkMode and toggleDarkMode from App via Layout (prop drilling)
function Navbar({ darkMode, toggleDarkMode }) {
  const [showMenu, setShowMenu] = useState(false)

  // effect 3: close the hamburger menu when window is resized to desktop size
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) {
        setShowMenu(false)
      }
    }
    window.addEventListener('resize', handleResize)
    // cleanup: remove listener when component unmounts
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <NavLink to="/" className={styles.logo}>
          RAKSHITH <span>DONGARI</span>
        </NavLink>

        <ul className={`${styles.navLinks} ${showMenu ? styles.open : ''}`}>
          <li>
            <NavLink to="/" end className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink} onClick={() => setShowMenu(false)}>
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink} onClick={() => setShowMenu(false)}>
              ABOUT
            </NavLink>
          </li>
          <li>
            <NavLink to="/projects" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink} onClick={() => setShowMenu(false)}>
              PROJECTS
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink} onClick={() => setShowMenu(false)}>
              CONTACT
            </NavLink>
          </li>
        </ul>

        <div className={styles.controls}>
          <button className={styles.themeToggle} onClick={toggleDarkMode}>
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button className={styles.hamburger} onClick={() => setShowMenu(!showMenu)}>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
