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
const quote = '<'
const quoteClose = '>'
const script = `${quote}script src="https://cdn.jsdelivr.net/gh/skywalkerx64/CDN@latest/topbar-slider.js?id=${props.link.id}" defer${quoteClose}${quote}/script${quoteClose}`

async function copyScript() {
  try {
    await navigator.clipboard.writeText(script)
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
        <pre><code ref="codeRef" class="language-html rounded-md bg-gray-200 dark:bg-gray-900">{{ script }}</code></pre>
        <Button @click="copyScript" class="absolute top-2 right-2 text-xs" :variant="'outline'" size="sm">
          <span v-if="copied"><CopyCheck /></span>
          <span v-else> <Copy /> </span>
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</template>
