import type {
  ContactFormDataInterface,
  ContactFormErrorsInterface,
  TranslateFunctionType,
} from '../types'

const VALID_WEBSITE_TYPES = ['landing', 'business', 'blog', 'help']

export function validateContactForm(
  form: ContactFormDataInterface,
  t: TranslateFunctionType
): ContactFormErrorsInterface {
  const errors: ContactFormErrorsInterface = {}

  if (!form.email) {
    errors.email = t('form-validation-email-required')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = t('form-validation-email-invalid')
  } else if (form.email.length > 255) {
    errors.email = t('form-validation-email-max', { count: 255 })
  }

  if (!form.website_type) {
    errors.website_type = t('form-validation-website-type-required')
  } else if (!VALID_WEBSITE_TYPES.includes(form.website_type)) {
    errors.website_type = t('form-validation-website-type-invalid')
  }

  if (!form.consent) {
    errors.consent = t('form-validation-consent-required')
  }

  return errors
}
