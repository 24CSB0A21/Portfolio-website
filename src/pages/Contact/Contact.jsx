import ContactForm from '../../components/ContactForm/ContactForm'
import styles from './Contact.module.css'

// Contact page - shows contact info on the left and the form on the right
// The ContactForm component manages all its own form state internally
function Contact() {
  return (
    <div className="page-wrapper">
      {/* page title */}
      <div className="section-heading">
        <h2>Contact</h2>
      </div>

      {/* two-column layout: info card on the left, form on the right */}
      <div className={styles.layout}>
        {/* left side: contact details and social links */}
        <aside className={styles.infoCard}>
          <h3>Get in Touch</h3>
          <p>
            I'm open to discussing internships, software development opportunities,
            projects and collaborations.
          </p>

          {/* list of contact details */}
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

          {/* social buttons - open in a new tab */}
          <div className={styles.socialLinks}>
            <a href="https://github.com" target="_blank" rel="noreferrer" className={styles.socialBtn}>GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={styles.socialBtn}>LinkedIn</a>
          </div>
        </aside>

        {/* right side: the contact form */}
        {/* ContactForm handles its own state (name, email, message, errors) internally */}
        <ContactForm />
      </div>
    </div>
  )
}

export default Contact
