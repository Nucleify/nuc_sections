import type { Ref } from 'vue'

import type { ComponentType } from 'atomic'

export interface ContactFormDataInterface {
  email: string
  website_type: string
  consent: boolean
}

export interface ContactFormErrorsInterface {
  email?: string
  website_type?: string
  consent?: string
}

export type TranslateFunctionType = (
  key: string,
  params?: Record<string, number | string>
) => string

export interface SubmitFormOptionsInterface {
  form: Ref<ContactFormDataInterface>
  errors: Ref<ContactFormErrorsInterface>
  isSubmitting: Ref<boolean>
  onSuccess: () => void
  t: TranslateFunctionType
}

export interface FormFieldInterface {
  id: keyof Omit<ContactFormDataInterface, 'consent'>
  label: string
  component: ComponentType
  type?: string
  placeholder?: string
  autocomplete?: string
  options?: { label: string; value: string }[]
}
