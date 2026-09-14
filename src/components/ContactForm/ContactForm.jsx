import { useState } from 'react'
import styles from './ContactForm.module.css'

// Base URL — shared env variable set in /.env
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001'

// ContactForm - fully controlled form with client-side + server-side validation.
//
// Data flow (Part 4):
//   form submit → client validate → POST /api/contact → server validate
//   → 201 success (reset form) or 4xx error (display server message)
function ContactForm() {
  // one state variable per form field
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [message, setMessage] = useState('')

  // stores validation error messages (client or server)
  const [errors, setErrors] = useState({})

  // true while the POST request is in-flight (disables button, changes label)
  const [submitting, setSubmitting] = useState(false)

  // non-empty string when the server returns a top-level (non-field) error
  const [serverError, setServerError] = useState('')

  // true after a successful 201 response — shows the success screen
  const [submitted, setSubmitted] = useState(false)

  // ── Client-side validation (runs before the network call) ─────────────────
  // Preserving the original rules from Assignment 2.
  // The backend is the FINAL authority — server errors are displayed too.
  function validate() {
    const newErrors = {}
    if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    if (!email.includes('@') || !email.includes('.')) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    return newErrors // empty object means no client errors
  }

  async function handleSubmit(e) {
    e.preventDefault()

    // 1. Run client-side validation first
    const foundErrors = validate()
    setErrors(foundErrors)
    setServerError('')

    if (Object.keys(foundErrors).length > 0) return // stop if client errors

    // 2. Send to the backend
    try {
      setSubmitting(true)

      const response = await fetch(`${API_BASE}/api/contact`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name, email, message }),
      })

      const data = await response.json()

      if (response.status === 201) {
        // ── Success: show success screen then reset after 4 s ──────────────
        setSubmitted(true)
        setTimeout(() => {
          setName('')
          setEmail('')
          setMessage('')
          setErrors({})
          setServerError('')
          setSubmitted(false)
        }, 4000)
        return
      }

      // ── Server validation error (400) — display the server's message ──────
      // The server returns { "error": "<field> is required" } or similar.
      // We try to map it to a field; otherwise show it as a top-level error.
      if (data.error) {
        const msg = data.error.toLowerCase()
        if (msg.includes('name')) {
          setErrors({ name: data.error })
        } else if (msg.includes('email')) {
          setErrors({ email: data.error })
        } else if (msg.includes('message')) {
          setErrors({ message: data.error })
        } else {
          setServerError(data.error) // unexpected field or generic server error
        }
      } else {
        setServerError('Something went wrong. Please try again.')
      }
    } catch (err) {
      // Network error or backend completely unreachable
      console.error('[ContactForm] POST failed:', err)
      setServerError(
        'Unable to send message. Please make sure the backend server is running.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  // The submit button stays disabled until all three fields pass client validation
  const formIsValid =
    name.trim().length >= 2 &&
    email.includes('@') &&
    email.includes('.') &&
    message.trim().length >= 10

  // ── Show success screen after 201 ────────────────────────────────────────
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

      {/* top-level server error (non-field errors) */}
      {serverError && (
        <p className={styles.errorMsg} style={{ marginBottom: '4px' }}>
          ⚠ {serverError}
        </p>
      )}

      {/* name field */}
      <div className={styles.field}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
          className={errors.name ? styles.inputError : ''}
        />
        {/* show client or server error for this field */}
        {errors.name && <p className={styles.errorMsg}>{errors.name}</p>}
      </div>

      {/* email field */}
      <div className={styles.field}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className={errors.email ? styles.inputError : ''}
        />
        {errors.email && <p className={styles.errorMsg}>{errors.email}</p>}
      </div>

      {/* message field */}
      <div className={styles.field}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What would you like to discuss?"
          rows={6}
          className={errors.message ? styles.inputError : ''}
        />
        {errors.message && <p className={styles.errorMsg}>{errors.message}</p>}
      </div>

      {/* button is greyed out and unclickable until formIsValid is true */}
      <button
        type="submit"
        className={styles.submitBtn}
        disabled={!formIsValid || submitting}
      >
        {submitting
          ? 'Sending...'
          : formIsValid
            ? 'Send Message ✈'
            : 'Fill All Fields to Send'}
      </button>
    </form>
  )
}

export default ContactForm
