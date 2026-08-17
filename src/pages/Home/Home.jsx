import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen'
import styles from './Home.module.css'

function Home() {
  // effect 1: show loading screen for 1 second when the page first loads
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1200)
    // cleanup to avoid memory leak if user leaves page before timer finishes
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <LoadingScreen />
  }

  return (
    <section className={`${styles.hero} page-wrapper`}>
      {/* Profile / Hero Card */}
      <div className={styles.heroCard}>
        <div className={styles.heroTop}>
          <div className={styles.badge}>
            <span className={styles.dot}></span>
            Open to Opportunities
          </div>
          <h1 className={styles.name}>Rakshith Dongari</h1>
          <p className={styles.designation}>Computer Science Undergraduate</p>
          <p className={styles.college}>National Institute of Technology Warangal</p>
        </div>

        <div className={styles.infoGrid}>
          <div className={styles.infoItem}>
            <h4>Institute Email</h4>
            <p>dr24csb0a21@student.nitw.ac.in</p>
          </div>
          <div className={styles.infoItem}>
            <h4>Personal Email</h4>
            <p>rakshithdongari2006@gmail.com</p>
          </div>
          <div className={styles.infoItem}>
            <h4>Phone</h4>
            <p>+91-7013404518</p>
          </div>
          <div className={styles.infoItem}>
            <h4>Roll No.</h4>
            <p>24CSB0A21</p>
          </div>
        </div>

        <div className={styles.profileLinks}>
          <a href="https://github.com" target="_blank" rel="noreferrer" className={styles.profileBtn}>GitHub</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={styles.profileBtn}>LinkedIn</a>
          <a href="#" className={styles.profileBtn}>Resume</a>
        </div>
      </div>

      {/* About Card */}
      <div className={styles.aboutCard}>
        <div className="section-heading">
          <h2>About Me</h2>
        </div>
        <p>
          I'm a Computer Science undergraduate at{' '}
          <strong>National Institute of Technology Warangal</strong> passionate about
          software development, artificial intelligence, and building scalable technology solutions.
        </p>
        <p>
          I enjoy solving algorithmic problems and developing full-stack applications. My interests
          include Artificial Intelligence, Retrieval-Augmented Generation systems, Web Development,
          Competitive Programming, and Software Engineering.
        </p>

        <div className={styles.aboutGrid}>
          <div className={styles.aboutItem}>
            <h4>College</h4>
            <p>NIT Warangal</p>
          </div>
          <div className={styles.aboutItem}>
            <h4>Degree</h4>
            <p>B.Tech · Computer Science</p>
          </div>
          <div className={styles.aboutItem}>
            <h4>CGPA</h4>
            <p>8.04</p>
          </div>
          <div className={styles.aboutItem}>
            <h4>Coursework</h4>
            <p>DSA · OS · DBMS · OOP · SDLC</p>
          </div>
        </div>

        <div className={styles.ctaBtns}>
          <Link to="/projects" className="primary-btn">View Projects</Link>
          <Link to="/contact" className="secondary-btn">Contact Me</Link>
        </div>
      </div>
    </section>
  )
}

export default Home
