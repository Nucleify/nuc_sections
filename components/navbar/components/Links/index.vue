<template>
  <div class="nav-links-container">
    <template v-for="link in navLinks" :key="link.label">
      <ad-button
        v-if="link.isButton"
        :class="link.class"
        :label="link.label"
        @click="handleButtonClick(link.href)"
      />
      <nuxt-link
        v-else
        :to="link.href"
        :external="link.href === '/home'"
        class="nav-link"
        @click="emit('closeDrawer')"
      >
        {{ link.label }}
      </nuxt-link>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'nuxt/app'

import { navLinks } from '.'

const emit = defineEmits(['closeDrawer'])

const router = useRouter()

async function handleButtonClick(href: string): Promise<void> {
  emit('closeDrawer')
  await router.push(href)
}
</script>
