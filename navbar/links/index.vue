<template>
  <div :class="containerClass">
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

import { getNavLinks } from 'nucleify'

type NavbarLinksVariant = 'all' | 'text' | 'actions'

const props = withDefaults(
  defineProps<{
    variant?: NavbarLinksVariant
  }>(),
  { variant: 'all' }
)

const emit = defineEmits(['closeDrawer'])

const route = useRoute()
const { t } = useI18n()

const navLinks = computed(() => {
  const lang = (route.params.lang as string) || 'en'
  const links = getNavLinks(lang, t)
  if (props.variant === 'text') return links.filter((link) => !link.isButton)
  if (props.variant === 'actions') return links.filter((link) => link.isButton)
  return links
})

const containerClass = computed(() =>
  [
    'nav-links-container',
    props.variant === 'actions' ? 'nav-links-container-actions' : '',
  ]
    .filter(Boolean)
    .join(' ')
)
</script>

<style lang="scss">
@import 'index';
</style>
