<!--suppress HtmlUnknownAnchorTarget -->
<template>
  <nav class="navbar" :class="{ 'navbar--dev': isDevPage }">
    <div class="container">
      <a class="application-header" :href="`/${lang}/${isDevPage ? 'dev' : 'home'}`" aria-label="Home">
        <ad-logo ad-type="main" />

        <ad-heading
          v-if="isDevPage"
          :tag="1"
          text="Nucleify"
          class="application-header-text"
        />
      </a>

      <template v-if="isDevPage">
        <nuc-navbar-links />
        <nuc-lang-switcher />
        <ad-button
          class="navbar-drawer-toggler"
          :icon="navbarExpanded ? 'hidden' : 'prime:align-justify'"
          aria-label="Menu"
          @click="toggleNavbar()"
        />
      </template>

      <div v-else class="navbar-actions">
        <nuc-dark-mode-toggler />
        <nuc-section-email-us-dialog />
      </div>
    </div>
    <nuc-navbar-drawer v-if="isDevPage" v-model:visible="navbarExpanded">
      <nuc-navbar-links @close-drawer="navbarExpanded = false" />
    </nuc-navbar-drawer>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'
import { computed } from 'vue'

import { useNavbar } from 'nucleify'
import { NucNavbarDrawer, NucNavbarLinks } from './components'

const route = useRoute()
const lang = computed(() => (route.params.lang as string) || 'en')
const isDevPage = computed(
  () => route.path.includes('/dev') || route.path.includes('/docs')
)
const { navbarExpanded, toggleNavbar } = useNavbar()
</script>
