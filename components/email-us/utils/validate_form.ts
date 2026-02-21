import type {
  ContactFormDataInterface,
  ContactFormErrorsInterface,
  TranslateFunctionType,
} from '../types'

export function validateContactForm(
  form: ContactFormDataInterface,
  t: TranslateFunctionType
): ContactFormErrorsInterface {
  const errors: ContactFormErrorsInterface = {}

  // Name validation
  if (!form.name) {
    errors.name = t('form-validation-name-required')
  } else if (form.name.length < 2) {
    errors.name = t('form-validation-name-min', { count: 2 })
  } else if (form.name.length > 100) {
    errors.name = t('form-validation-name-max', { count: 100 })
  }

  // Email validation
  if (!form.email) {
    errors.email = t('form-validation-email-required')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = t('form-validation-email-invalid')
  } else if (form.email.length > 255) {
    errors.email = t('form-validation-email-max', { count: 255 })
  }

  // Phone validation (optional, but if provided must be valid)
  if (form.phone) {
    const phoneDigits = form.phone.replace(/\D/g, '')
    if (phoneDigits.length < 9) {
      errors.phone = t('form-validation-phone-min', { count: 9 })
    } else if (phoneDigits.length > 20) {
      errors.phone = t('form-validation-phone-max', { count: 20 })
    }
  }

  // Message validation
  if (!form.message) {
    errors.message = t('form-validation-message-required')
  } else if (form.message.length < 10) {
    errors.message = t('form-validation-message-min', { count: 10 })
  } else if (form.message.length > 2000) {
    errors.message = t('form-validation-message-max', { count: 2000 })
  }

  // Consent validation
  if (!form.consent) {
    errors.consent = t('form-validation-consent-required')
  }

  return errors
}
