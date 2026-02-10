<!--suppress HtmlUnknownAnchorTarget -->
<template>
  <nav class="navbar">
    <div class="container">
      <a class="application-header" :href="`/${lang}/home`">
        <ad-logo ad-type="main" />

        <ad-heading
          :tag="1"
          text="Nucleify"
          class="application-header-text"
        />
      </a>

      <nuc-navbar-links />
      <nuc-lang-switcher />
      <ad-button
        class="navbar-drawer-toggler"
        :icon="navbarExpanded ? 'hidden' : 'prime:align-justify'"
        aria-label="Menu"
        @click="toggleNavbar()"
      />
    </div>
    <nuc-navbar-drawer v-model:visible="navbarExpanded">
      <nuc-navbar-links @close-drawer="navbarExpanded = false" />
      <nuc-lang-switcher />
    </nuc-navbar-drawer>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'
import { computed } from 'vue'

import { useNavbar } from 'atomic'

import { NucNavbarDrawer, NucNavbarLinks } from './components'

const route = useRoute()
const lang = computed(() => (route.params.lang as string) || 'en')
const { navbarExpanded, toggleNavbar } = useNavbar()
</script>
