import data from '../data.json'

const { initials: COUPLE_INITIALS } = data.couple

export default function Loader({ fadeOut }) {
  return (
    <div className={`loader${fadeOut ? ' loader--fade' : ''}`} aria-hidden={fadeOut}>
      <div className="loader__ring">
        <span className="loader__initials">{COUPLE_INITIALS}</span>
      </div>
    </div>
  )
}
