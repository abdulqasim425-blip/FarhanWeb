import { useState } from 'react'
import { useForm } from '@formspree/react'
import { profile } from '../data.js'

// Your Formspree form ID: the last part of https://formspree.io/f/abcdwxyz  ->  abcdwxyz
// Set it in a .env file as VITE_FORMSPREE_ID (see .env.example).
const FORM_ID = import.meta.env.VITE_FORMSPREE_ID

export default function Contact() {
  const [state, sendToFormspree] = useForm(FORM_ID || 'not-configured')
  const [form, setForm] = useState({ name: '', email: '', budget: '', message: '' })
  const [errors, setErrors] = useState({})
  const [mailtoOpened, setMailtoOpened] = useState(false)

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const validate = () => {
    const err = {}
    if (!form.name.trim()) err.name = 'Please enter your name'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'Enter a valid email'
    if (form.message.trim().length < 10) err.message = 'Tell me a little more (10+ characters)'
    return err
  }

  const submit = (e) => {
    e.preventDefault()
    const err = validate()
    setErrors(err)
    if (Object.keys(err).length) return

    // Formspree not configured yet: fall back to the visitor's email app.
    if (!FORM_ID) {
      const subject = encodeURIComponent(`Project enquiry from ${form.name}`)
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\nBudget: ${form.budget || 'Not specified'}\n\n${form.message}`
      )
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      setMailtoOpened(true)
      return
    }

    // The package reads the form fields (including the hidden _gotcha spam trap) and posts them.
    sendToFormspree(e)
  }

  if (state.succeeded) {
    return (
      <section className="section" id="contact">
        <div className="container contact">
          <div className="form" role="status" aria-live="polite">
            <h2>Submit successful! ✅</h2>
            <p className="ok">
              Thank you, your message was sent successfully. I will reply within 24 hours.
            </p>
            <button className="btn btn--ghost" type="button" onClick={() => window.location.reload()}>
              Send another message
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section" id="contact">
      <div className="container contact">
        <div className="contact__info">
          <span className="eyebrow">Contact</span>
          <h2>Let’s build something great</h2>
          <p>Tell me about your project and I will reply within 24 hours.</p>
          <ul className="contact__list">
            <li><strong>Email</strong><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
            <li><strong>Location</strong><span>{profile.location}</span></li>
          </ul>
          <div className="socials">
            {profile.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label}</a>
            ))}
          </div>
        </div>

        <form className="form" onSubmit={submit} noValidate>
          <label>
            Name
            <input name="name" value={form.name} onChange={change} placeholder="Your name" />
            {errors.name && <small className="err">{errors.name}</small>}
          </label>
          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={change} placeholder="you@example.com" />
            {errors.email && <small className="err">{errors.email}</small>}
          </label>
          <label>
            Budget
            <select name="budget" value={form.budget} onChange={change}>
              <option value="">Select a range</option>
              <option>Under $500</option>
              <option>$500 – $1,000</option>
              <option>$1,000 – $3,000</option>
              <option>$3,000+</option>
            </select>
          </label>
          <label>
            Project details
            <textarea name="message" rows="5" value={form.message} onChange={change} placeholder="What do you want to build?" />
            {errors.message && <small className="err">{errors.message}</small>}
          </label>

          {/* Spam trap: hidden from real visitors, bots fill it and Formspree discards the message. */}
          <input
            type="text"
            name="_gotcha"
            tabIndex="-1"
            autoComplete="off"
            aria-hidden="true"
            style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
          />

          <button className="btn" type="submit" disabled={state.submitting}>
            {state.submitting ? 'Sending…' : 'Send message'}
          </button>

          {mailtoOpened && (
            <p className="ok">Your email app should open with the message ready to send.</p>
          )}
          {state.errors && (
            <p className="err">
              Something went wrong. Please try again or email me at {profile.email}.
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
