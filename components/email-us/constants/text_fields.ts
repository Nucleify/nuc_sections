import type { FormFieldInterface } from '../types'

export const emailUsTextFields: FormFieldInterface[] = [
  {
    id: 'name',
    label: 'Name',
    component: 'input-text',
    placeholder: 'Enter your name',
    autocomplete: 'name',
  },
  {
    id: 'email',
    label: 'Email',
    component: 'input-text',
    type: 'email',
    placeholder: 'Enter your email address',
    autocomplete: 'email',
  },
  {
    id: 'phone',
    label: 'Phone (optional)',
    component: 'input-text',
    type: 'tel',
    placeholder: 'Enter your phone number',
    autocomplete: 'tel',
  },
  {
    id: 'message',
    label: "What's on your mind?",
    component: 'textarea',
    placeholder: 'Tell us what you need...',
    rows: 4,
  },
]
