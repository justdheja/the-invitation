import { useState } from 'react'
import data from '../data.json'

const PHOTOS = data.gallery.photos

export default function Gallery() {
  const [index, setIndex] = useState(0)
  const total = PHOTOS.length

  const prev = () => setIndex((i) => (i - 1 + total) % total)
  const next = () => setIndex((i) => (i + 1) % total)

  const left = PHOTOS[(index - 1 + total) % total]
  const center = PHOTOS[index]
  const right = PHOTOS[(index + 1) % total]

  return (
    <section id="gallery" className="gallery">
      <div className="section-inner gallery__inner">
        <p className="eyebrow tracked">Memories</p>
        <h2 className="gallery__heading">A Peek Into Us</h2>

        <div className="gallery__stage">
          <button className="gallery__arrow gallery__arrow--left" onClick={prev} aria-label="Previous photo">
            &#8592;
          </button>

          <div className="gallery__cards">
            <img src={left.src} alt="" className="gallery__card gallery__card--side gallery__card--left" />
            <img src={center.src} alt={center.caption} className="gallery__card gallery__card--center" />
            <img src={right.src} alt="" className="gallery__card gallery__card--side gallery__card--right" />
          </div>

          <button className="gallery__arrow gallery__arrow--right" onClick={next} aria-label="Next photo">
            &#8594;
          </button>
        </div>

        <p className="gallery__caption">{center.caption}</p>
      </div>
    </section>
  )
}
