import type { NucNavLinkInterface } from '.'

export const navLinks: NucNavLinkInterface[] = [
  {
    label: 'Home',
    href: '/home',
  },
  {
    label: 'Offer',
    href: '/offer',
  },
  {
    label: 'Docs',
    href: '/docs/getting-started/introduction',
  },
  {
    label: 'Login',
    href: '/login',
    isButton: true,
    class: 'login-button',
  },
]
