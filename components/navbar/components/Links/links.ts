import type { Composer } from 'vue-i18n'

import type { NucNavLinkInterface } from '.'

export function getNavLinks(
  lang: string,
  t: Composer['t']
): NucNavLinkInterface[] {
  return [
    {
      label: t('nav-home'),
      href: `/${lang}/dev`,
    },
    {
      label: t('nav-offer'),
      href: `/${lang}/dev/offer`,
    },
    {
      label: t('nav-docs'),
      href: `/${lang}/docs/getting-started/introduction`,
    },
    {
      label: t('nav-login'),
      href: `/${lang}/login`,
      isButton: true,
      class: 'login-button',
    },
  ]
}
