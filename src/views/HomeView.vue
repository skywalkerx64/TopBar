<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import HeroSection from '@/components/Landing/HeroSection.vue'
import FaqSection from '@/components/Landing/FaqSection.vue'
import PricingSection from '@/components/Landing/PricingSection.vue'
</script>

<template>
  <MainLayout>
    <HeroSection />
    <PricingSection />
    <FaqSection />
  </MainLayout>
</template>
