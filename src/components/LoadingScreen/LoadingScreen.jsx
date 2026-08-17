import styles from './LoadingScreen.module.css'

function LoadingScreen() {
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner}></div>
      <p className={styles.text}>Loading...</p>
    </div>
  )
}

export default LoadingScreen
