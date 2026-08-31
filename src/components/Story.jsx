import Corner from './Corner'
import data from '../data.json'

const { eyebrow: EYEBROW, heading: HEADING, photo1: PHOTO_1, photo2: PHOTO_2, paragraphs: PARAGRAPHS } = data.story

export default function Story() {
  return (
    <section id="story" className="story">
      <Corner corner="tr" className="story__corner story__corner--tr" />
      <Corner corner="bl" className="story__corner story__corner--bl" />

      <div className="section-inner story__inner">
        <p className="eyebrow tracked">{EYEBROW}</p>
        <h2 className="story__heading">{HEADING}</h2>

        <div className="story__grid">
          <img src={PHOTO_1} alt="A candid moment together" className="story__photo" />

          <div className="story__text">
            {PARAGRAPHS.map((p, i) => (
              <p key={i} className={p.italic ? 'story__text--italic' : undefined}>
                {p.text}
              </p>
            ))}
          </div>

          <img src={PHOTO_2} alt="Walking hand in hand" className="story__photo story__photo--offset" />
        </div>
      </div>
    </section>
  )
}
