<script setup lang="ts">
import { ref, watch } from 'vue'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { toast } from 'vue-sonner'
import { Copy, CopyCheck, Eye } from 'lucide-vue-next'
import type { Link } from '@/types'
import hljs from 'highlight.js/lib/core'
import html from 'highlight.js/lib/languages/xml'
import 'highlight.js/styles/github.css'

// Register only the language you need
hljs.registerLanguage('html', html)

const props = defineProps<{
  link: Link
}>()
const open = ref(false)
const copied = ref(false)
const codeRef = ref<HTMLElement | null>(null)
const script = ref(`<style src="https://cdn.jsdelivr.net/gh/skywalkerx64/CDN@latest/topbar.js?id=${props.link.id}" defer></style>`)

async function copyScript() {
  try {
    await navigator.clipboard.writeText(script.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
    toast.success('Script copied to clipboard')
  } catch (error) {
    console.error('Failed to copy script:', error)
    toast.error('Failed to copy script')
  }
}

watch(open, (val) => {
  if (val) {
    setTimeout(() => {
      if (codeRef.value) {
        hljs.highlightElement(codeRef.value)
      }
      const codeBlock = document.getElementById('codeBlock')
      const scriptTag = document.createElement('script')
      scriptTag.src = 'https://cdn.jsdelivr.net/gh/skywalkerx64/CDN@latest/topbar.js?id=' + props.link.id
      scriptTag.defer = true
      codeBlock?.appendChild(scriptTag)
    }, 0)
  }
})
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button variant="outline"> <Eye /> Show Script</Button>
    </DialogTrigger>
    <DialogContent class="max-w-3xl">
      <DialogHeader>
        <DialogTitle>Your generated script</DialogTitle>
        <DialogDescription> Paste this script into your website to enable the Smart Top Bar. </DialogDescription>
      </DialogHeader>
      <div class="relative rounded-xl text-sm overflow-auto dark:bg-gray-900 p-4">
        <div class="p-2 rounded-md bg-white">
          <code class="language-html rounded-md dark:bg-gray-900 hljs" data-highlighted="yes"
            ><span class="hljs-tag"
              >&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string"
                >"https://cdn.jsdelivr.net/gh/skywalkerx64/CDN@latest/topbar.js?id={{ props.link.id }}"</span
              >
              <span class="hljs-attr">defer</span>&gt;</span
            ><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code
          >
        </div>
        <Button @click="copyScript" class="absolute top-2 right-2 text-xs" :variant="'outline'" size="sm">
          <span v-if="copied"><CopyCheck /></span>
          <span v-else> <Copy /> </span>
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
