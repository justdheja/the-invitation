import { useEffect, useState } from 'react'
import { findGuestBySlug } from '../lib/sheet'

// Reads ?to=<slug> from the URL and looks up the guest's name from the sheet.
export function useGuest() {
  const [state, setState] = useState({ loading: true, guest: null, slug: null, error: null })

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const slug = params.get('to')

    if (!slug) {
      setState({ loading: false, guest: null, slug: null, error: null })
      return
    }

    let cancelled = false
    findGuestBySlug(slug)
      .then((guest) => {
        if (!cancelled) setState({ loading: false, guest, slug, error: null })
      })
      .catch((error) => {
        if (!cancelled) setState({ loading: false, guest: null, slug, error })
      })

    return () => {
      cancelled = true
    }
  }, [])

  return state
}
