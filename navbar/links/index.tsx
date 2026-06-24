'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { JSX } from 'react'

import { getNavLinks, t } from 'nucleify'

import './_index.scss'

type NucNavbarLinksVariant = 'all' | 'text' | 'actions'

type NucNavbarLinksProps = {
  onCloseDrawer?: () => void
  variant?: NucNavbarLinksVariant
}

function filterNavLinks(
  links: ReturnType<typeof getNavLinks>,
  variant: NucNavbarLinksVariant
) {
  if (variant === 'text') return links.filter((link) => !link.isButton)
  if (variant === 'actions') return links.filter((link) => link.isButton)
  return links
}

function getLangFromPathname(pathname: string): string {
  const [firstSegment] = pathname.split('/').filter(Boolean)
  return firstSegment || 'en'
}

export function NucNavbarLinks({
  onCloseDrawer,
  variant = 'all',
}: NucNavbarLinksProps): JSX.Element {
  const pathname = usePathname()
  const lang = getLangFromPathname(pathname)
  const navLinks = filterNavLinks(getNavLinks(lang, t), variant)

  const containerClassName = [
    'nav-links-container',
    variant === 'actions' ? 'nav-links-container-actions' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={containerClassName}>
      {navLinks.map((link) => (
        <Link
          className={
            link.isButton
              ? `p-button ${link.class || 'login-button'}`
              : 'nav-link'
          }
          href={link.href}
          key={link.label}
          onClick={onCloseDrawer}
        >
          {link.label}
        </Link>
      ))}
    </div>
  )
}
