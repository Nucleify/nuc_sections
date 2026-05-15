<template>
  <Drawer position="right" :block-scroll="true" class="navbar-drawer">
    <slot />
    <nuc-authors />
    <nuc-lang-switcher />
  </Drawer>
</template>
