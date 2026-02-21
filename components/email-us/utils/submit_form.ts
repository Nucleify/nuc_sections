import type { UseToastInterface } from 'atomic'
import { apiHandle, useAtomicToast } from 'atomic'

import type { SubmitFormOptionsInterface } from '../types'
import { validateContactForm } from './validate_form'

export async function submitContactForm(
  options: SubmitFormOptionsInterface
): Promise<void> {
  const { form, errors, isSubmitting, onSuccess, t } = options

  const validationErrors = validateContactForm(form.value, t)
  errors.value = validationErrors

  if (Object.keys(validationErrors).length > 0) {
    return
  }

  isSubmitting.value = true

  const { flashToast }: UseToastInterface = useAtomicToast()

  await apiHandle<{ success: boolean; message: string }>({
    url: apiUrl() + '/contact-form',
    method: 'POST',
    data: {
      name: form.value.name,
      email: form.value.email,
      phone: form.value.phone,
      message: form.value.message,
    },
    onSuccess: () => {
      flashToast(t('form-success-message'), 'success')
      form.value = {
        name: '',
        email: '',
        phone: '',
        message: '',
        consent: false,
      }
      onSuccess()
    },
  })

  isSubmitting.value = false
}
