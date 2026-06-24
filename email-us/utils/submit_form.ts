import type { SubmitFormOptionsInterface } from 'nucleify'
import { apiHandle, flashToast, validateContactForm } from 'nucleify'

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

  try {
    await apiHandle<{ success: boolean; message: string }>({
      url: '/api/contact-form',
      method: 'POST',
      data: {
        email: form.value.email,
        website_type: form.value.website_type,
      },
      onSuccess: () => {
        flashToast(t('form-success-message'), 'success')
        form.value = {
          email: '',
          website_type: '',
          consent: false,
        }
        onSuccess()
      },
    })
  } finally {
    isSubmitting.value = false
  }
}
