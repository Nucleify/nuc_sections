<!--suppress HtmlUnknownAnchorTarget -->
<template>
  <nav class="navbar">
    <div class="container">
      <a class="application-header" href="/home">
        <ad-logo ad-type="main" />

        <ad-heading
          :tag="1"
          text="Nucleify"
          class="application-header-text"
        />
      </a>

      <nuc-navbar-links />
      <ad-button
        class="navbar-drawer-toggler"
        :icon="navbarExpanded ? 'hidden' : 'prime:align-justify'"
        aria-label="Menu"
        @click="toggleNavbar()"
      />
    </div>
    <nuc-navbar-drawer v-model:visible="navbarExpanded">
      <nuc-navbar-links @close-drawer="navbarExpanded = false" />
    </nuc-navbar-drawer>
  </nav>
</template>

<script setup lang="ts">
import { useNavbar } from 'atomic'

import { NucNavbarDrawer, NucNavbarLinks } from './components'

const { navbarExpanded, toggleNavbar } = useNavbar()
</script>
