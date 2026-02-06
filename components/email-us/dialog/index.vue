<template>
  <ad-button
    :class="props.buttonClass"
    :label="props.buttonLabel"
    :icon="props.buttonIcon"
    @click="showDialog = true"
  >
    <strong v-if="props.buttonStrong">{{ props.buttonStrong }}</strong>
  </ad-button>

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
      <nuc-section-email-us @success="showDialog = false" />
    </Dialog>
  </client-only>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { NucEmailUsDialogPropsInterface } from './types'

const props = withDefaults(defineProps<NucEmailUsDialogPropsInterface>(), {
  buttonLabel: 'Get in Touch',
  buttonClass: '',
  buttonIcon: 'mdi:message-text-outline',
  buttonStrong: '',
})

const showDialog = ref(false)
</script>

