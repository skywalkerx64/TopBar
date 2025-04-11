<script lang="ts" setup>
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import router from '@/router'
import { ref } from 'vue'

import { Menu } from 'lucide-vue-next'
import ToggleTheme from '@/components/Utils/ToggleTheme.vue'

interface RouteProps {
  href: string
  label: string
}

const routeList: RouteProps[] = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/links',
    label: 'Links',
  },
  //  {
  //    href: '/about',
  //    label: 'About',
  //  },
  //  {
  //    href: '/contact',
  //    label: 'Contact',
  //  },
]
const isOpen = ref<boolean>(false)
</script>

<template>
  <header class="w-full bg-white dark:bg-black">
    <nav
      :class="{
        'container mx-auto z-40 flex justify-between items-center py-2': true,
      }"
    >
      <a href="/" class="font-bold text-lg flex items-center gap-2"><img src="@/assets/logo.png" alt="logo" class="w-16" /></a>

      <!-- Mobile -->
      <div class="flex items-center gap-6 justify-center lg:hidden">
        <Sheet v-model:open="isOpen">
          <SheetTrigger as-child>
            <Menu @click="isOpen = true" class="cursor-pointer" />
          </SheetTrigger>

          <SheetContent side="left" class="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card">
            <div>
              <SheetHeader class="mb-4 ml-4">
                <SheetTitle class="flex items-center">
                  <a href="/" class="flex items-center gap-2">
                    <img src="@/assets/logo.png" alt="logo" class="w-16" />
                  </a>
                </SheetTitle>
              </SheetHeader>

              <div class="flex flex-col gap-2">
                <Button v-for="{ href, label } in routeList" :key="label" as-child variant="ghost" class="justify-start text-base">
                  <a @click="isOpen = false" :href="href" :class="router.currentRoute.value.path === href ? 'text-primary' : ''">
                    {{ label }}
                  </a>
                </Button>
              </div>
            </div>

            <SheetFooter class="flex-col sm:flex-col justify-start items-start">
              <Separator class="mb-2" />

              <ToggleTheme />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <!-- Desktop -->
      <NavigationMenu class="hidden lg:block">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Button v-for="{ href, label } in routeList" :key="label" as-child variant="ghost" class="justify-start text-base">
                <a :href="href" :class="router.currentRoute.value.path === href ? 'text-primary' : ''">
                  {{ label }}
                </a>
              </Button>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div class="hidden lg:flex justify-center items-center gap-2 text-base">
        <ToggleTheme />
      </div>
    </nav>
  </header>
</template>
