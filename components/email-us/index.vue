<template>
  <ad-card id="email-us">
    <template #content>
      <form class="email-us-form" @submit.prevent="submitForm">
        <div class="form-group">
          <ad-label label="Name" for="name" />
          <ad-input-text
            ad-type="main"
            id="name"
            v-model="form.name"
            placeholder="Enter your name"
            :invalid="!!errors.name"
            autocomplete="name"
          />
          <small v-if="errors.name" class="error-message">{{ errors.name }}</small>
        </div>

        <div class="form-group">
          <ad-label label="Email" for="email" />
          <ad-input-text
            ad-type="main"
            id="email"
            v-model="form.email"
            type="email"
            placeholder="Enter your email address"
            :invalid="!!errors.email"
            autocomplete="email"
          />
          <small v-if="errors.email" class="error-message">{{ errors.email }}</small>
        </div>

        <div class="form-group">
          <ad-label for="phone" label="Phone (optional)" />
          <ad-input-text
            ad-type="main"
            id="phone"
            v-model="form.phone"
            type="tel"
            placeholder="Enter your phone number"
            :invalid="!!errors.phone"
            autocomplete="tel"
          />
          <small v-if="errors.phone" class="error-message">{{ errors.phone }}</small>
        </div>

        <div class="form-group">
          <ad-label label="What's on your mind?" for="message" />
          <ad-textarea
            ad-type="main"
            id="message"
            v-model="form.message"
            rows="4"
            placeholder="Tell us what you need..."
            :invalid="!!errors.message"
          />
          <small v-if="errors.message" class="error-message">{{ errors.message }}</small>
        </div>

        <div class="form-group checkbox-group">
          <ad-checkbox
            ad-type="main"
            inputId="consent"
            v-model="form.consent"
            :binary="true"
            :invalid="!!errors.consent"
          />
          <ad-label label="I accept the data processing" for="consent" />
          <small v-if="errors.consent" class="error-message">{{ errors.consent }}</small>
        </div>

        <ad-button
          type="submit"
          class="submit-button"
          :label="isSubmitting ? 'Sending...' : 'START YOUR PROJECT'"
          :disabled="isSubmitting"
        />
      </form>

      <div class="email-us-footer">
        <span class="response-text">We respond personally</span>
        <span class="response-badge">WITHIN 8 HOURS</span>
      </div>
    </template>
  </ad-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import type { UseToastInterface } from 'atomic'
import { apiHandle, useAtomicToast } from 'atomic'

const emit = defineEmits<{
  (e: 'success'): void
}>()

interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
  consent: boolean
}

interface ContactFormErrors {
  name?: string
  email?: string
  phone?: string
  message?: string
  consent?: string
}

const form = ref<ContactFormData>({
  name: '',
  email: '',
  phone: '',
  message: '',
  consent: false,
})

const errors = ref<ContactFormErrors>({})
const isSubmitting = ref(false)

const { flashToast }: UseToastInterface = useAtomicToast()

// Clear errors when user changes values
watch(
  () => form.value.name,
  () => {
    if (errors.value.name) errors.value.name = undefined
  }
)
watch(
  () => form.value.email,
  () => {
    if (errors.value.email) errors.value.email = undefined
  }
)
watch(
  () => form.value.phone,
  () => {
    if (errors.value.phone) errors.value.phone = undefined
  }
)
watch(
  () => form.value.message,
  () => {
    if (errors.value.message) errors.value.message = undefined
  }
)
watch(
  () => form.value.consent,
  () => {
    if (errors.value.consent) errors.value.consent = undefined
  }
)

function validateForm(): boolean {
  errors.value = {}

  // Name validation
  if (!form.value.name) {
    errors.value.name = 'Name is required'
  } else if (form.value.name.length < 2) {
    errors.value.name = 'Name must be at least 2 characters'
  } else if (form.value.name.length > 100) {
    errors.value.name = 'Name must be less than 100 characters'
  }

  // Email validation
  if (!form.value.email) {
    errors.value.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Please enter a valid email address'
  } else if (form.value.email.length > 255) {
    errors.value.email = 'Email must be less than 255 characters'
  }

  // Phone validation (optional, but if provided must be valid)
  if (form.value.phone) {
    const phoneDigits = form.value.phone.replace(/\D/g, '')
    if (phoneDigits.length < 9) {
      errors.value.phone = 'Phone number must be at least 9 digits'
    } else if (phoneDigits.length > 20) {
      errors.value.phone = 'Phone number must be less than 20 digits'
    }
  }

  // Message validation
  if (!form.value.message) {
    errors.value.message = 'Message is required'
  } else if (form.value.message.length < 10) {
    errors.value.message = 'Message must be at least 10 characters'
  } else if (form.value.message.length > 2000) {
    errors.value.message = 'Message must be less than 2000 characters'
  }

  // Consent validation
  if (!form.value.consent) {
    errors.value.consent = 'You must accept the data processing'
  }

  return Object.keys(errors.value).length === 0
}

async function submitForm(): Promise<void> {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true

  await apiHandle<{ success: boolean; message: string }>({
    url: apiUrl() + '/contact-form',
    method: 'POST',
    data: {
      name: form.value.name,
      email: form.value.email,
      phone: form.value.phone,
      message: form.value.message,
    },
    onSuccess: (response) => {
      flashToast(response.message || 'Message sent successfully!', 'success')
      form.value = {
        name: '',
        email: '',
        phone: '',
        message: '',
        consent: false,
      }
      emit('success')
    },
  })

  isSubmitting.value = false
}
</script>
