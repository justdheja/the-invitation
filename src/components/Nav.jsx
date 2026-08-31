import data from '../data.json'

export default function Nav() {
  return (
    <header className="nav">
      <nav className="nav__links nav__links--left">
        <a href="#story">Our Story</a>
        <a href="#rsvp">RSVP</a>
      </nav>
      <a href="#top" className="nav__logo">
        {data.couple.initials}
      </a>
      <nav className="nav__links nav__links--right">
        <a href="#calendar">Venue</a>
        <a href="#gallery">Gallery</a>
      </nav>
    </header>
  )
}
