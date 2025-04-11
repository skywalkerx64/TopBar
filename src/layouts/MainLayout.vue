<script setup lang="ts">
// import AppFooter from '@/components/Navigation/AppFooter.vue'
import NavBar from '@/components/Navigation/NavBar.vue'
</script>

<template>
  <body class="min-h-screen bg-white dark:bg-black flex flex-col">
    <NavBar class="sticky top-0 z-50" />
    <slot />
    <!-- <AppFooter /> -->
  </body>
</template>
