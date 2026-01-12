import type { NucNavLinkInterface } from '.'

export const navLinks: NucNavLinkInterface[] = [
  {
    label: 'Home',
    href: '/home',
  },
  {
    label: 'Docs',
    href: '/docs',
  },
  {
    label: 'Login',
    href: '/login',
    isButton: true,
    class: 'login-button',
  },
]
