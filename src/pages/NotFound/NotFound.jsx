import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

// NotFound - shown for any URL that doesn't match a defined route (path="*")
function NotFound() {
  return (
    <div className="page-wrapper">
      <div className={styles.container}>
        <p className={styles.code}>404</p>              {/* large gradient "404" text */}
        <h1 className={styles.heading}>Page Not Found</h1>
        <p className={styles.message}>
          The page you're looking for doesn't exist.
        </p>
        {/* Link goes back to home without a full page reload */}
        {/* id is added so the button can be easily found in browser tests */}
        <Link to="/" className="primary-btn" id="back-to-home-btn">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
