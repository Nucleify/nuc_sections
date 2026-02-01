import type { App } from 'vue'

import {
  NucSectionContact,
  NucSectionEmailUs,
  NucSectionFaq,
  NucSectionFooter,
  NucSectionNavbar,
} from './components'

export function registerNucSections(app: App<Element>): void {
  app
    .component('nuc-section-contact', NucSectionContact)
    .component('nuc-section-email-us', NucSectionEmailUs)
    .component('nuc-section-faq', NucSectionFaq)
    .component('nuc-section-footer', NucSectionFooter)
    .component('nuc-section-navbar', NucSectionNavbar)
}
