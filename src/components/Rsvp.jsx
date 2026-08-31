import { useState } from 'react'
import { submitRsvp } from '../lib/rsvp'
import Corner from './Corner'
import data from '../data.json'

const { eyebrow: EYEBROW, heading: HEADING, subtext: SUBTEXT } = data.rsvp

const STATUS = {
  IDLE: 'idle',
  SUBMITTING: 'submitting',
  SUCCESS: 'success',
  ERROR: 'error',
}

export default function Rsvp({ slug, guestName }) {
  const [name, setName] = useState(guestName || '')
  const [phone, setPhone] = useState('')
  const [attending, setAttending] = useState('yes')
  const [guestCount, setGuestCount] = useState(1)
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(STATUS.IDLE)
  const [errorMessage, setErrorMessage] = useState('')

  const isSubmitting = status === STATUS.SUBMITTING

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus(STATUS.SUBMITTING)
    setErrorMessage('')

    try {
      await submitRsvp({
        slug,
        name,
        phone,
        attending,
        guestCount: attending === 'yes' ? Number(guestCount) || 1 : 0,
        message,
      })
      setStatus(STATUS.SUCCESS)
    } catch (err) {
      setStatus(STATUS.ERROR)
      setErrorMessage(err?.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <section id="rsvp" className="rsvp">
      <div className="section-inner rsvp__inner">
        <p className="eyebrow tracked rsvp__eyebrow">{EYEBROW}</p>
        <h2 className="rsvp__heading">{HEADING}</h2>
        <p className="rsvp__subtext">{SUBTEXT}</p>

        <div className="rsvp__card">
          <Corner corner="tl" className="rsvp__corner rsvp__corner--tl" />
          <Corner corner="tr" className="rsvp__corner rsvp__corner--tr" />
          <Corner corner="bl" className="rsvp__corner rsvp__corner--bl" />
          <Corner corner="br" className="rsvp__corner rsvp__corner--br" />

          {status === STATUS.SUCCESS ? (
            <p className="rsvp__success">
              Thank you! We can't wait to celebrate with you 🎉
            </p>
          ) : (
            <form className="rsvp__form" onSubmit={handleSubmit}>
              <label className="rsvp__field">
                <span className="tracked rsvp__label">Name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled
                />
              </label>

              <label className="rsvp__field">
                <span className="tracked rsvp__label">Phone</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="Your phone number"
                />
              </label>

              <label className="rsvp__field">
                <span className="tracked rsvp__label">Attending</span>
                <select value={attending} onChange={(e) => setAttending(e.target.value)}>
                  <option value="yes">Joyfully Accepts</option>
                  <option value="no">Regretfully Declines</option>
                </select>
              </label>

              {attending === 'yes' && (
                <label className="rsvp__field">
                  <span className="tracked rsvp__label">Guest Count</span>
                  <input
                    type="number"
                    min="1"
                    max={2}
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                  />
                </label>
              )}

              <label className="rsvp__field rsvp__field--full">
                <span className="tracked rsvp__label">Message</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Leave us a message (optional)"
                  rows={3}
                />
              </label>

              {status === STATUS.ERROR && (
                <p className="rsvp__error">{errorMessage}</p>
              )}

              <button type="submit" className="btn-pill rsvp__submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending…' : 'RSVP Now'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
