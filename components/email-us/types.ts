import type { Ref } from 'vue'

export interface ContactFormDataInterface {
  name: string
  email: string
  phone: string
  message: string
  consent: boolean
}

export interface ContactFormErrorsInterface {
  name?: string
  email?: string
  phone?: string
  message?: string
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

import type { ComponentType } from 'atomic'

export interface FormFieldInterface {
  id: keyof Omit<ContactFormDataInterface, 'consent'>
  label: string
  component: ComponentType
  type?: string
  placeholder: string
  autocomplete?: string
  rows?: number
}
