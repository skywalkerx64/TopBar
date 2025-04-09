<script setup lang="ts">
import Input from '@/components/ui/input/Input.vue'
import Button from '@/components/ui/button/Button.vue'
</script>
<template>
  <footer class="w-full mt-auto container p-4 grid grid-cols-1 sm:grid-cols-2 sm:gap-8 md:grid-cols-4 gap-4 justify-start items-start">
    <div>
      <img src="@/assets/logo.png" alt="logo" class="w-16" />
    </div>
    <div>
      <ul class="flex flex-col gap-4">
        <li class="font-bold">Quick Links</li>
        <li><a>Terms</a></li>
        <li><a>Privacy Policy</a></li>
        <li><a>Support</a></li>
      </ul>
    </div>
    <div>
      <ul class="flex flex-col gap-4">
        <li class="font-bold">Follow Us</li>
        <li><a href="">Instagram</a></li>
        <li><a href="">Twitter</a></li>
        <li><a href="">Facebook</a></li>
      </ul>
    </div>
    <div>
      <p class="font-bold">Subscribe to our newsletter</p>
      <p>Stay updated with the latest TopBar news</p>
      <div class="mt-4 flex">
        <Input class="h-full" placeholder="Email adress" />
        <Button variant="outline" class="ml-2">Subscribe</Button>
      </div>
    </div>
  </footer>
</template>
