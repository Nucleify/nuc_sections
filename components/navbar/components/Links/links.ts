import type { NucNavLinkInterface } from '.'

export function getNavLinks(lang: string): NucNavLinkInterface[] {
  return [
    {
      label: 'Home',
      href: `/${lang}/home`,
    },
    {
      label: 'Offer',
      href: `/${lang}/offer`,
    },
    {
      label: 'Docs',
      href: `/${lang}/docs/getting-started/introduction`,
    },
    {
      label: 'Login',
      href: `/${lang}/login`,
      isButton: true,
      class: 'login-button',
    },
  ]
}
