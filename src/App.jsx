import Nav from './components/Nav'
import Hero from './components/Hero'
import Story from './components/Story'
import Calendar from './components/Calendar'
import Gallery from './components/Gallery'
import Rsvp from './components/Rsvp'
import Footer from './components/Footer'
import { useGuest } from './hooks/useGuest'
import './App.css'

export default function App() {
  const { guest, slug, loading } = useGuest()
  const guestName = guest?.name

  // Only reveal wedding details once a guest is confirmed against the
  // sheet via ?to=<slug> — no slug, an unrecognized slug, and the brief
  // loading window all fall back to hero-only, so a bare visit to the
  // site can't be used to browse the details as an uninvited guest.
  const notFound = !loading && !guest
  const showDetails = Boolean(guestName)

  return (
    <div className="page">
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
