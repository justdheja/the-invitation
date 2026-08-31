// Decorative ornamental corner bracket, used to frame cards/sections.
// `corner` selects which corner it sits in and rotates the artwork accordingly.
const ROTATIONS = {
  tl: 0,
  tr: 90,
  br: 180,
  bl: 270,
}

export default function Corner({ corner = 'tl', color = 'var(--pink-deep)', size = 48, className = '' }) {
  const rotation = ROTATIONS[corner] ?? 0

  return (
    <svg
      className={`corner corner--${corner} ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      style={{ transform: `rotate(${rotation}deg)` }}
      aria-hidden="true"
    >
      <path
        d="M4 44V16C4 9.373 9.373 4 16 4H44"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M4 34V22C4 16.477 8.477 12 14 12H26"
        stroke={color}
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />
      <circle cx="4" cy="44" r="2.5" fill={color} />
      <circle cx="44" cy="4" r="2.5" fill={color} />
    </svg>
  )
}
