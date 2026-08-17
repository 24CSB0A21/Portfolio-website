import ContactForm from '../../components/ContactForm/ContactForm'
import styles from './Contact.module.css'

function Contact() {
  return (
    <div className="page-wrapper">
      <div className="section-heading">
        <h2>Contact</h2>
      </div>

      <div className={styles.layout}>
        <aside className={styles.infoCard}>
          <h3>Get in Touch</h3>
          <p>
            I'm open to discussing internships, software development opportunities,
            projects and collaborations.
          </p>

          <div className={styles.contactItems}>
            <div className={styles.contactItem}>
              <strong>Personal Email</strong>
              <p>rakshithdongari2006@gmail.com</p>
            </div>
            <div className={styles.contactItem}>
              <strong>Institute Email</strong>
              <p>dr24csb0a21@student.nitw.ac.in</p>
            </div>
            <div className={styles.contactItem}>
              <strong>Phone</strong>
              <p>+91-7013404518</p>
            </div>
            <div className={styles.contactItem}>
              <strong>Roll No.</strong>
              <p>24CSB0A21</p>
            </div>
          </div>

          <div className={styles.socialLinks}>
            <a href="https://github.com" target="_blank" rel="noreferrer" className={styles.socialBtn}>GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={styles.socialBtn}>LinkedIn</a>
          </div>
        </aside>

        {/* ContactForm handles all form state internally */}
        <ContactForm />
      </div>
    </div>
  )
}

export default Contact
