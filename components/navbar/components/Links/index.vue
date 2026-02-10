<template>
  <div class="nav-links-container">
    <template v-for="link in navLinks" :key="link.label">
      <nuxt-link
        :to="link.href"
        :class="[link.isButton ? 'p-button ' + link.class : 'nav-link']"
        @click="emit('closeDrawer')"
      >
        {{ link.label }}
      </nuxt-link>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { getNavLinks } from '.'

const emit = defineEmits(['closeDrawer'])

const route = useRoute()
const { t } = useI18n()

const navLinks = computed(() => {
  const lang = (route.params.lang as string) || 'en'
  return getNavLinks(lang, t)
})
</script>
