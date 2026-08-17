import { useState } from 'react'
import styles from './ContactForm.module.css'

// ContactForm - state 2: controlled form with validation
function ContactForm() {
  // separate state variables for each field (simpler than one object)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  // basic form validation
  function validate() {
    let newErrors = {}
    if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    if (!email.includes('@') || !email.includes('.')) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()
    const foundErrors = validate()
    setErrors(foundErrors)

    if (Object.keys(foundErrors).length === 0) {
      setSubmitted(true)
      // reset form after 4 seconds
      setTimeout(() => {
        setName('')
        setEmail('')
        setMessage('')
        setErrors({})
        setSubmitted(false)
      }, 4000)
    }
  }

  // button is disabled until all fields are filled correctly
  const formIsValid =
    name.trim().length >= 2 &&
    email.includes('@') &&
    email.includes('.') &&
    message.trim().length >= 10

  if (submitted) {
    return (
      <div className={styles.success}>
        <span className={styles.checkmark}>✓</span>
        <h3>Message Sent!</h3>
        <p>Thanks {name}! I'll get back to you soon.</p>
      </div>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}
      </div>

      <div className={styles.field}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What would you like to discuss?"
          rows={6}
        />
        {errors.message && <p className={styles.error}>{errors.message}</p>}
      </div>

      <button type="submit" className={styles.submitBtn} disabled={!formIsValid}>
        {formIsValid ? 'Send Message ✈' : 'Fill All Fields to Send'}
      </button>
    </form>
  )
}

export default ContactForm
