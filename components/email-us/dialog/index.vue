<template>
  <nuc-submit-button
    :class="props.buttonClass"
    :label="props.buttonLabel || $t('form-get-in-touch')"
    :icon="props.buttonIcon"
    @click="showDialog = true"
  />

  <client-only>
    <Dialog
      v-model:visible="showDialog"
      :modal="true"
      :dismissable-mask="true"
      :draggable="false"
      :pt="{
        pcCloseButton: {
          root: {
          'ad-type': 'main',
          }
        }
      }"
    >
      <nuc-section-email-us @success="handleEmailSuccess" />
    </Dialog>
  </client-only>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { NucEmailUsDialogPropsInterface } from './types'

const props = withDefaults(defineProps<NucEmailUsDialogPropsInterface>(), {
  buttonLabel: '',
  buttonClass: '',
  buttonIcon: 'mdi:message-text-outline',
  buttonStrong: '',
})

const showDialog = ref(false)

function handleEmailSuccess(): void {
  showDialog.value = false
}
</script>
