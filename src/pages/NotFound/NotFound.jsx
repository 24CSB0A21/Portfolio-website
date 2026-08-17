import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

function NotFound() {
  return (
    <div className="page-wrapper">
      <div className={styles.container}>
        <p className={styles.code}>404</p>
        <h1 className={styles.heading}>Page Not Found</h1>
        <p className={styles.message}>
          The page you're looking for doesn't exist.
        </p>
        <Link to="/" className="primary-btn" id="back-to-home-btn">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
