// Fetches guest list from a published Google Sheet CSV and looks up by slug.
// Expected CSV columns: slug, name

const CSV_URL = import.meta.env.VITE_GUEST_SHEET_CSV_URL

function parseCsv(text) {
  const rows = text
    .trim()
    .split(/\r?\n/)
    .map((line) => line.split(',').map((cell) => cell.trim().replace(/^"|"$/g, '')))

  const [header, ...body] = rows
  return body.map((row) =>
    Object.fromEntries(header.map((key, i) => [key.toLowerCase(), row[i] ?? '']))
  )
}

let cache = null

export async function fetchGuests() {
  if (cache) return cache
  if (!CSV_URL) throw new Error('VITE_GUEST_SHEET_CSV_URL not set')

  const res = await fetch(CSV_URL, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Failed to load guest sheet: ${res.status}`)

  const text = await res.text()
  cache = parseCsv(text)
  return cache
}

export async function findGuestBySlug(slug) {
  if (!slug) return null
  const guests = await fetchGuests()
  return guests.find((g) => g.slug?.toLowerCase() === slug.toLowerCase()) ?? null
}
