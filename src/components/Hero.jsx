import data from '../data.json'
import { useParallax } from '../hooks/useParallax'

const { name1: NAME_1, name2: NAME_2 } = data.couple
const {
  photo: HERO_PHOTO,
  heading: HERO_HEADING,
  notFoundMessage: NOT_FOUND_MESSAGE,
} = data.hero
const DATE_LABEL = data.wedding.dateLabel

export default function Hero({ guestName, notFound, showDetails }) {
  const { ref, offset } = useParallax({ speed: 0.35, maxTravel: 120 })

  return (
    <section id="top" className="hero" ref={ref}>
      <div
        className="hero__bg"
        style={{ backgroundImage: `url(${HERO_PHOTO})`, transform: `translateY(${offset}px)` }}
      />
      <div className="hero__scrim" />

      <div className="hero__greeting">
        {guestName ? <p className="hero__greeting-text">Dear {guestName},</p> : null}
      </div>

      <div className="hero__content">
        <span className="hero__name hero__name--left">{NAME_1}</span>

        <div className="hero__frame">
          <img src={HERO_PHOTO} alt={`${NAME_1} and ${NAME_2}`} className="hero__photo" />
        </div>

        <span className="hero__name hero__name--right">{NAME_2}</span>
      </div>

      <div className={`hero__card${notFound ? ' hero__card--notice' : ''}`}>
        <h1 className="hero__heading">{HERO_HEADING}</h1>
        {notFound ? (
          <p className="hero__date--muted">{NOT_FOUND_MESSAGE}</p>
        ) : (
          <p className="hero__date tracked">{DATE_LABEL}</p>
        )}
      </div>

      {showDetails && (
        <a href="#story" className="hero__scroll" aria-label="Scroll to our story">
          &#8595;
        </a>
      )}
    </section>
  )
}
