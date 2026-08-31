import { useEffect, useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Story from './components/Story'
import Calendar from './components/Calendar'
import Gallery from './components/Gallery'
import Rsvp from './components/Rsvp'
import Footer from './components/Footer'
import Loader from './components/Loader'
import { useGuest } from './hooks/useGuest'
import './App.css'

// How long the fade-out transition takes — must match .loader--fade in App.css.
const LOADER_FADE_MS = 500

export default function App() {
  const { guest, slug, loading } = useGuest()
  const guestName = guest?.name

  // Keep the loader mounted a beat after loading finishes so it can fade
  // out smoothly, instead of the page just popping into its final state.
  const [loaderVisible, setLoaderVisible] = useState(true)

  useEffect(() => {
    if (loading) return
    const timer = setTimeout(() => setLoaderVisible(false), LOADER_FADE_MS)
    return () => clearTimeout(timer)
  }, [loading])

  useEffect(() => {
    document.documentElement.style.overflow = loaderVisible ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [loaderVisible])

  // Only reveal wedding details once a guest is confirmed against the
  // sheet via ?to=<slug> — no slug, an unrecognized slug, and the brief
  // loading window all fall back to hero-only, so a bare visit to the
  // site can't be used to browse the details as an uninvited guest.
  const notFound = !loading && !guest
  const showDetails = Boolean(guestName)

  return (
    <div className="page">
      {loaderVisible && <Loader fadeOut={!loading} />}
      {showDetails && <Nav />}
      <Hero guestName={guestName} notFound={notFound} showDetails={showDetails} />
      {showDetails && (
        <>
          <Story />
          <Calendar />
          <Gallery />
          <Rsvp slug={slug} guestName={guestName} />
          <Footer />
        </>
      )}
    </div>
  )
}
