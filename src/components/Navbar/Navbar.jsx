import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

// Navbar receives darkMode (boolean) and toggleDarkMode (function) from App via Layout
// this is prop drilling - App passes it down through Layout to Navbar
function Navbar({ darkMode, toggleDarkMode }) {
  // controls whether the hamburger menu is open on mobile
  const [showMenu, setShowMenu] = useState(false)

  // effect 3: listen for window resize events
  // if the user makes the window wider than 768px, auto-close the hamburger menu
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) {
        setShowMenu(false) // close the mobile menu on desktop
      }
    }
    window.addEventListener('resize', handleResize) // attach the listener
    // cleanup: remove the listener when Navbar unmounts to avoid memory leak
    return () => window.removeEventListener('resize', handleResize)
  }, []) // empty array = only runs once when component first mounts

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        {/* clicking the logo goes to the home page */}
        <NavLink to="/" className={styles.logo}>
          RAKSHITH <span>DONGARI</span>
        </NavLink>

        {/* nav links - open class is added when hamburger is clicked on mobile */}
        <ul className={`${styles.navLinks} ${showMenu ? styles.open : ''}`}>
          <li>
            {/* NavLink automatically adds 'active' class to the current route */}
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
          {/* theme toggle button - shows sun in dark mode, moon in light mode */}
          <button className={styles.themeToggle} onClick={toggleDarkMode}>
            {darkMode ? '☀️' : '🌙'}
          </button>

          {/* hamburger button - only visible on mobile screens */}
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
