import data from '../data.json'

const { dateLabel: DATE_LABEL, venue: VENUE, time: TIME } = data.wedding
const { closing: CLOSING } = data.calendar

export default function Calendar() {
  return (
    <section id="calendar" className="calendar">
      <div className="section-inner calendar__inner">
        <p className="eyebrow tracked calendar__eyebrow">Save The Date</p>
        <h2 className="calendar__heading">Mark Your Calendar!</h2>

        <div className="ticket">
          <div className="ticket__row">
            <span className="ticket__label tracked">Date</span>
            <span className="ticket__value">{DATE_LABEL}</span>
          </div>
          <div className="ticket__divider" />
          <div className="ticket__row">
            <span className="ticket__label tracked">Venue</span>
            <span className="ticket__value">{VENUE}</span>
          </div>
          <div className="ticket__divider" />
          <div className="ticket__row">
            <span className="ticket__label tracked">Time</span>
            <span className="ticket__value">{TIME}</span>
          </div>
        </div>

        <p className="calendar__closing">{CLOSING}</p>
      </div>
    </section>
  )
}
