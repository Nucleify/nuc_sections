'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { JSX } from 'react'

import {
  AdAnchor,
  AdLogo,
  AdLogoSymbol,
  getActiveLocale,
  getColumns,
  t,
} from 'nucleify'

import './_index.scss'

function tWithParams(
  key: string,
  params: Record<string, string | number>
): string {
  let value = t(key)
  for (const [paramKey, paramValue] of Object.entries(params)) {
    value = value.replaceAll(`{{${paramKey}}}`, String(paramValue))
  }
  return value
}

function decodeLocaleEmail(value: string): string {
  return value.replace("{'@'}", '@')
}

export function NucSectionFooter(): JSX.Element {
  const pathname = usePathname() || ''
  const lang = getActiveLocale()
  const year = new Date().getFullYear()
  const devPrefix = pathname.includes('/dev') ? '/dev' : ''
  const columns = getColumns(lang, t, devPrefix)
  const logoSize = 72
  const companyLink =
    'https://aleo.com/pl/firma/atomic-it-spolka-z-ograniczona-odpowiedzialnoscia'
  const companyEmail = decodeLocaleEmail(t('footer-company-email'))

  return (
    <section id="footer">
      <div className="footer-content-container">
        <div className="top">
          <AdLogoSymbol dimensions={logoSize} />

          <div className="brand">
            <AdAnchor className="header" href="#start">
              <AdLogo dimensions={logoSize} nuiType="main" />
              <h1 className="name">Nucleify</h1>
            </AdAnchor>
          </div>

          <div className="columns">
            {columns.map((column, columnIndex) => (
              <div className="column" key={columnIndex}>
                {column.map((item, itemIndex) => (
                  <Link href={item.url} key={itemIndex}>
                    {item.header ? (
                      <p className="column-header">{item.name}</p>
                    ) : (
                      <span>{item.name}</span>
                    )}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="bottom">
          <div className="company-info">
            <a href={companyLink} rel="noreferrer" target="_blank">
              {t('footer-company-name')}
            </a>
            <span className="separator">|</span>
            <a href={companyLink} rel="noreferrer" target="_blank">
              {t('footer-company-nip')}
            </a>
            <span className="separator">|</span>
            <a href={companyLink} rel="noreferrer" target="_blank">
              {t('footer-company-address')}
            </a>
            <span className="separator">|</span>
            <a href={`mailto:${companyEmail}`}>{companyEmail}</a>
          </div>

          <span className="copyright">
            {tWithParams('footer-copyright', { year })}
          </span>
        </div>
      </div>
      <div className="hexagon-rows-container" />
    </section>
  )
}
