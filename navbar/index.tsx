'use client'

import { usePathname } from 'next/navigation'
import type { JSX } from 'react'

import {
  AdAnchor,
  AdButton,
  AdLogo,
  DOC_CATEGORIES,
  NucDarkModeToggler,
  NucDocumentationNavbarNav,
  NucLangSwitcher,
  NucNavbarDrawer,
  NucNavbarLinks,
  NucSectionEmailUsDialog,
  useNavbar,
  useNavbarViewport,
} from 'nucleify'

import './_index.scss'

function getLangFromPathname(pathname: string): string {
  const [firstSegment] = pathname.split('/').filter(Boolean)
  return firstSegment || 'en'
}

function isDevDocsPath(pathname: string): boolean {
  return pathname.includes('/dev') || pathname.includes('/docs')
}

function isDocsPath(pathname: string): boolean {
  return pathname.includes('/docs')
}

export function NucSectionNavbar(): JSX.Element {
  const pathname = usePathname()
  const lang = getLangFromPathname(pathname)
  const isDevPage = isDevDocsPath(pathname)
  const isDocsPage = isDocsPath(pathname)
  const { navbarExpanded, toggleNavbar } = useNavbar('next')
  const { isDesktopNav } = useNavbarViewport({ docsLayout: isDocsPage })

  const navbarClassName = [
    'navbar',
    isDevPage ? 'navbar-dev' : '',
    isDocsPage ? 'navbar-docs' : '',
  ]
    .filter(Boolean)
    .join(' ')
  const homeHref = `/${lang}/${isDevPage ? 'dev' : 'home'}`

  const closeDrawer = (): void => {
    if (navbarExpanded) {
      toggleNavbar()
    }
  }

  return (
    <nav className={navbarClassName}>
      <div className="container">
        <AdAnchor
          aria-label="Home"
          className="application-header"
          href={homeHref}
        >
          <AdLogo adType="main" />
          {isDevPage ? (
            <h1 className="application-header-text">Nucleify</h1>
          ) : null}
        </AdAnchor>

        {isDocsPage ? (
          <div className="navbar-docs-nav">
            <NucDocumentationNavbarNav categories={DOC_CATEGORIES} />
          </div>
        ) : null}

        {isDevPage ? (
          <>
            {isDesktopNav ? (
              <div className="navbar-center">
                <NucNavbarLinks variant="text" />
              </div>
            ) : null}
            <div className="navbar-end">
              {isDesktopNav ? <NucNavbarLinks variant="actions" /> : null}
              <NucLangSwitcher />
              {!isDesktopNav ? (
                <AdButton
                  aria-label="Menu"
                  className="navbar-drawer-toggler"
                  icon={navbarExpanded ? undefined : 'prime:align-justify'}
                  onClick={toggleNavbar}
                />
              ) : null}
            </div>
          </>
        ) : (
          <div className="navbar-actions">
            <NucDarkModeToggler />
            <NucSectionEmailUsDialog />
          </div>
        )}
      </div>

      {isDevPage && !isDesktopNav ? (
        <NucNavbarDrawer onHide={closeDrawer} visible={navbarExpanded}>
          <NucNavbarLinks onCloseDrawer={closeDrawer} />
          <NucLangSwitcher />
        </NucNavbarDrawer>
      ) : null}
    </nav>
  )
}
