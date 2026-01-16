<template>
  <div class="nav-links-container">
    <template v-for="link in navLinks" :key="link.label">
      <a
        v-if="link.href === '/home'"
        :href="link.href"
        class="nav-link"
        @click="emit('closeDrawer')"
      >
        {{ link.label }}
      </a>
      <nuc-hexagons-button
        v-else-if="link.isButton"
        :class="link.class"
        :label="link.label"
        text
        @click="navigateToUrl(link.href)"
      />
      <a
        v-else-if="link.href === '/docs' && isOnDocsPage"
        class="nav-link"
        @click="handleDocsClick"
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
import { bounceFadeIn, isMobile, navigateToUrl } from 'atomic'

import { navLinks } from '.'

const route = useRoute()
const router = useRouter()
const emit = defineEmits(['closeDrawer'])

const isOnDocsPage = computed(() => {
  return route.path.startsWith('/docs')
})

function handleDocsClick(event: Event): void {
  event.preventDefault()
  emit('closeDrawer')

  if (!isOnDocsPage.value) {
    router.push('/docs/getting-started/introduction')
    window.scrollTo({ top: 0, behavior: 'instant' })
  } else {
    router.push('/docs/getting-started/introduction')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }
}

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
