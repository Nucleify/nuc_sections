'use client'

import { useEffect, useState } from 'react'

/** Matches `$lg` in `nuc_globals` — desktop nav shows inline links, mobile uses drawer. */
const DESKTOP_NAV_MIN_PX = 1024

/** Matches `$doc-layout-min` — docs pages keep drawer nav below this width. */
const DOCS_LAYOUT_MIN_PX = 1400

type UseNavbarViewportOptions = {
  docsLayout?: boolean
}

export function useNavbarViewport(options: UseNavbarViewportOptions = {}): {
  isDesktopNav: boolean
} {
  const minWidth = options.docsLayout ? DOCS_LAYOUT_MIN_PX : DESKTOP_NAV_MIN_PX
  const query = `(min-width: ${minWidth}px)`

  const [isDesktopNav, setIsDesktopNav] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  )

  useEffect(() => {
    const media = window.matchMedia(query)
    const sync = (): void => setIsDesktopNav(media.matches)

    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [query])

  return { isDesktopNav }
}
