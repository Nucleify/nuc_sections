<template>
  <ad-card id="email-us">
    <template #content>
      <form class="email-us-form" @submit.prevent="submitForm">
        <div v-for="field in fields" :key="field.id" class="form-group">
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
          <ad-label :label="$t('form-consent')" for="consent" />
          <small v-if="errors.consent" class="error-message">{{ errors.consent }}</small>
        </div>

        <nuc-submit-button
          class="submit-button"
          type="submit"
          :label="isSubmitting ? $t('form-sending') : $t('form-submit')"
          :disabled="isSubmitting"
        />
      </form>

      <div class="email-us-footer">
        <span class="response-text">{{ $t('form-response-text') }}</span>
        <span class="response-badge">{{ $t('form-response-badge') }}</span>
      </div>
    </template>
  </ad-card>
</template>

<script setup lang="ts">
import { navigateTo } from 'nuxt/app'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { getComponent } from 'atomic'

import { emailUsFormFieldKeys, getEmailUsTextFields } from './constants'
import type {
  ContactFormDataInterface,
  ContactFormErrorsInterface,
} from './types'
import { submitContactForm } from './utils'

const emit = defineEmits(['success'])
const { t, locale } = useI18n()

const fields = computed(() => getEmailUsTextFields(t))

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
    onSuccess: () => {
      emit('success')
      navigateTo(`/${locale.value}/thank-you`)
    },
  })
}
</script>
