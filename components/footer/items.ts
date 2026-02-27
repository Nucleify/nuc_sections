import type { Composer } from 'vue-i18n'

export interface FooterLink {
  name: string
  url: string
  header?: boolean
}

export function getColumns(lang: string, t: Composer['t']): FooterLink[][] {
  return [
    [
      { name: t('footer-services'), header: true, url: '#services' },
      { name: t('footer-business-websites'), url: '#services' },
      { name: t('footer-ecommerce'), url: '#services' },
      { name: t('footer-landing-pages'), url: '#services' },
      { name: t('footer-website-redesign'), url: '#services' },
      { name: t('footer-custom-projects'), url: '#services' },
    ],
    [
      { name: t('footer-company'), header: true, url: `#${lang}/home` },
      { name: t('footer-about'), url: `/${lang}/about-us#start` },
      { name: t('footer-process'), url: `/${lang}/process` },
      { name: t('footer-contact'), url: '#contact' },
      { name: t('footer-faq'), url: '#faq' },
    ],
    [
      { name: t('footer-legal'), header: true, url: '#' },
      { name: t('footer-privacy-policy'), url: `#${lang}/privacy-policy` },
      { name: t('footer-terms'), url: `#${lang}/terms` },
      { name: t('footer-cookies'), url: `#${lang}/cookies` },
      { name: t('footer-gdpr'), url: `#${lang}/gdpr` },
    ],
  ]
}
