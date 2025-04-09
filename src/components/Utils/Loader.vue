<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-900 z-50">
    <!-- Logo centré -->
    <img src="@/assets/logo.png" alt="TopBar" class="w-32 h-32 animate-pulse" />

    <!-- Barre de chargement -->
    <div class="w-40 h-1 bg-gray-300 dark:bg-gray-700 mt-6 rounded overflow-hidden">
      <div class="h-full bg-blue-600 dark:bg-blue-500 animate-loading"></div>
    </div>

    <!-- Texte en bas -->
    <p class="mt-4 text-gray-700 dark:text-gray-300 text-sm">Chargement en cours, prépare-toi à une expérience unique !</p>
  </div>
</template>

<script lang="ts" setup></script>

<style>
@keyframes loading {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}
.animate-loading {
  animation: loading 2.5s ease-in-out infinite;
}
</style>
