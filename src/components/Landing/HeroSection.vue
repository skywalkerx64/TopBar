<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
function toastIt() {
  toast('This feature is currently in development', {
    description: 'Comming Soon ...',
    action: {
      label: 'Register meanwhile',
      onClick: () => console.log('Register meanwhile'),
    },
    closeButton: true,
  })
}
</script>

<template>
  <section class="container">
    <div class="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto pt-16 md:pt-28">
      <div class="text-center space-y-8">
        <div class="max-w-screen-md mx-auto text-center text-5xl md:text-6xl font-bold">
          <h1>
            Stop losing
            <span class="text-transparent bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">Sales </span>
            in-app browsers.
          </h1>
        </div>

        <p class="max-w-screen-sm mx-auto text-xl text-muted-foreground">Recover sales, retain tracking, and maximize commissions.! 🚀</p>

        <div class="space-y-4 md:space-y-0 md:space-x-4">
          <Button class="w-5/6 md:w-1/4 font-bold group/arrow" @click="toastIt">
            Get Started
            <ArrowRight class="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
          </Button>

          <Button as-child variant="secondary" class="w-5/6 md:w-1/4 font-bold">
            <a href="#pricing">Explore Plans</a>
          </Button>
        </div>
      </div>

      <div class="relative group mt-14"></div>
    </div>
  </section>
</template>
