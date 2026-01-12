<template>
  <div class="nav-links-container">
    <template v-for="link in navLinks" :key="link.label">
      <a
        v-if="link.href === '/home' || link.href === '/login'"
        :href="link.href"
        :class="link.isButton ? link.class : 'nav-link'"
        @click="emit('closeDrawer')"
      >
        {{ link.label }}
      </a>
      <nuxt-link
        v-else-if="!link.isButton"
        class="nav-link"
        :to="link.href"
        @click="emit('closeDrawer')"
      >
        {{ link.label }}
      </nuxt-link>
      <nuxt-link
        v-else
        :to="link.href"
        :class="link.class"
      >
        {{ link.label }}
      </nuxt-link>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { bounceFadeIn, isMobile } from 'atomic'

import { navLinks } from '.'

const emit = defineEmits(['closeDrawer'])

onMounted(() => {
  if (isMobile()) {
    bounceFadeIn('.nav-links-container .nav-link', {
      delay: 0,
      duration: 0.05,
      stagger: 0.15,
    })
    bounceFadeIn('.nav-links-container .login-button', {
      delay: 1,
      duration: 0.2,
    })
  } else {
    bounceFadeIn('.nav-links-container .nav-link', {
      delay: 2.2,
      duration: 0.05,
      stagger: 0.15,
    })
    bounceFadeIn('.nav-links-container .login-button', {
      delay: 2.9,
      duration: 0.2,
    })
  }
})
</script>
