import { useEffect, useRef, useState } from 'react'

// Tracks scroll position and returns a translateY offset for a parallax
// background layer, clamped so it never scrolls past the extra bleed
// given to that layer (see .hero__bg's negative inset in App.css).
export function useParallax({ speed = 0.15, maxTravel = 120 } = {}) {
  const ref = useRef(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    let frame = null

    function update() {
      frame = null
      const el = ref.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      // How far the section has scrolled past the top of the viewport.
      const scrolled = Math.max(0, -rect.top)
      const next = Math.min(scrolled * speed, maxTravel)
      setOffset(next)
    }

    function onScroll() {
      if (frame == null) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame != null) cancelAnimationFrame(frame)
    }
  }, [speed, maxTravel])

  return { ref, offset }
}
