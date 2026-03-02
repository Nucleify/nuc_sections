<template>
  <Drawer position="right" :block-scroll="true" class="navbar-drawer">
    <slot />
    <nuc-authors />
    <nuc-language-switcher />
  </Drawer>
</template>
