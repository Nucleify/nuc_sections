export function getColumns(lang: string) {
  return [
    // Services
    [
      { name: 'Services', header: true, url: '#' },
      { name: 'Business Websites', url: '#' },
      { name: 'E-commerce Stores', url: '#' },
      { name: 'Custom CMS', url: '#' },
      { name: 'Landing Pages', url: '#' },
      { name: 'Website Redesign', url: '#' },
    ],
    // Company
    [
      { name: 'Company', header: true, url: '#' },
      { name: 'About Us', url: '#' },
      { name: 'Our Process', url: '#' },
      { name: 'Contact', url: '#contact' },
    ],
    // Resources
    [
      { name: 'Resources', header: true, url: '#' },
      { name: 'Pricing', url: '#' },
      { name: 'Free Consultation', url: '#start' },
      { name: 'Terms & Privacy', url: '#' },
      { name: 'FAQ', url: '#faq' },
    ],
    // Documentation
    [
      { name: 'Documentation', header: true, url: '#' },
      {
        name: 'Getting Started',
        url: `/${lang}/docs/getting-started/introduction`,
      },
      {
        name: 'Atomic Design',
        url: `/${lang}/docs/core-concepts/atomic-design`,
      },
      { name: 'Modules', url: `/${lang}/docs/core-concepts/modules` },
      { name: 'Philosophy', url: `/${lang}/docs/about/philosophy` },
      { name: 'Code Standards', url: `/${lang}/docs/about/code-standards` },
    ],
  ]
}
