<!--suppress HtmlUnknownAnchorTarget -->
<template>
  <nav
    class="navbar"
    :class="{ 'navbar-dev': isDevPage, 'navbar-docs': isDocsPage }"
  >
    <div class="container">
      <a
        class="application-header"
        :href="`/${lang}/${isDevPage ? 'dev' : 'home'}`"
        aria-label="Home"
      >
        <ad-logo nui-type="main" />

        <ad-heading
          v-if="isDevPage"
          :tag="1"
          text="Nucleify"
          class="application-header-text"
        />
      </a>

      <div v-if="isDocsPage" class="navbar-docs-nav">
        <nuc-documentation-navbar-nav :categories="DOC_CATEGORIES" />
      </div>

      <div v-if="isDevPage" class="navbar-center">
        <nuc-navbar-links variant="text" />
      </div>

      <div v-if="isDevPage" class="navbar-end">
        <nuc-navbar-links variant="actions" />
        <nuc-lang-switcher />
        <ad-button
          class="navbar-drawer-toggler"
          :icon="navbarExpanded ? 'hidden' : 'prime:align-justify'"
          aria-label="Menu"
          @click="toggleNavbar()"
        />
      </div>

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

import {
  DOC_CATEGORIES,
  NucDocumentationNavbarNav,
  NucNavbarDrawer,
  NucNavbarLinks,
  useNavbar,
} from 'nucleify'

const route = useRoute()
const lang = computed(() => (route.params.lang as string) || 'en')
const isDevPage = computed(
  () => route.path.includes('/dev') || route.path.includes('/docs')
)
const isDocsPage = computed(() => route.path.includes('/docs'))
const { navbarExpanded, toggleNavbar } = useNavbar()
</script>

<style lang="scss">
@import 'index';
</style>
