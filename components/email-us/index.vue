<template>
  <ad-card id="email-us">
    <template #content>
      <form class="email-us-form" @submit.prevent="submitForm">
        <div v-for="field in emailUsTextFields" :key="field.id" class="form-group">
          <ad-label :label="field.label" :for="field.id" />
          <component
            :is="getComponent(field.component)"
            v-model="form[field.id]"
            :id="field.id"
            :type="field.type"
            :placeholder="field.placeholder"
            :invalid="!!errors[field.id]"
            :autocomplete="field.autocomplete"
            :rows="field.rows"
            ad-type="main"
          />
          <small v-if="errors[field.id]" class="error-message">{{ errors[field.id] }}</small>
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

import { getComponent } from 'atomic'

import { emailUsFormFieldKeys, emailUsTextFields } from './constants'
import type {
  ContactFormDataInterface,
  ContactFormErrorsInterface,
} from './types'
import { submitContactForm } from './utils'

const emit = defineEmits(['success'])

const form = ref<ContactFormDataInterface>({
  name: '',
  email: '',
  phone: '',
  message: '',
  consent: false,
})

const errors = ref<ContactFormErrorsInterface>({})
const isSubmitting = ref(false)

emailUsFormFieldKeys.forEach((field) => {
  watch(
    () => form.value[field],
    () => {
      if (errors.value[field]) errors.value[field] = undefined
    }
  )
})

async function submitForm(): Promise<void> {
  await submitContactForm({
    form,
    errors,
    isSubmitting,
    onSuccess: () => emit('success'),
  })
}
</script>
