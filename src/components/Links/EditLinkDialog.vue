<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { updateLink } from '@/http/services/linkService'
import type { Link } from '@/types'
import { Pen } from 'lucide-vue-next'

const open = ref(false)

const props = defineProps<{
  link: Link
}>()

const form = ref({
  message: props.link.message,
  backgroundColor: props.link.backgroundColor,
  textColor: props.link.textColor,
  gifUrl: props.link.gifUrl,
})

async function submitChanges() {
  await updateLink(props.link.id, form.value).then(() => {
    open.value = false
  })
}
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button variant="outline"> <Pen /> Edit</Button>
    </DialogTrigger>

    <DialogContent class="max-w-xl">
      <DialogHeader>
        <DialogTitle>Edit your Top Bar</DialogTitle>
        <DialogDescription> Customize the appearance and behavior of your smart top bar. </DialogDescription>
      </DialogHeader>

      <form class="grid gap-4 mt-4" @submit.prevent="submitChanges">
        <div class="grid gap-2">
          <label class="text-sm font-medium">Message</label>
          <Input v-model="form.message" class="border border-input rounded px-3 py-2 text-sm" type="text" placeholder="Enter your call-to-action" required />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium">Background Color</label>
            <Input v-model="form.backgroundColor" class="w-full border border-input rounded px-3 py-2 text-sm" type="color" />
          </div>
          <div>
            <label class="text-sm font-medium">Text Color</label>
            <Input v-model="form.textColor" class="w-full border border-input rounded px-3 py-2 text-sm" type="color" />
          </div>
        </div>

        <div class="grid gap-2">
          <label class="text-sm font-medium">GIF URL</label>
          <Input v-model="form.gifUrl" class="border border-input rounded px-3 py-2 text-sm" type="url" placeholder="https://example.com/image.gif" required />
        </div>
        <div class="mt-6">
          <p class="text-sm font-semibold mb-2">Live preview:</p>
          <div
            class="flex items-center gap-4 rounded p-3"
            :style="{
              backgroundColor: form.backgroundColor,
              color: form.textColor,
            }"
          >
            <img :src="form.gifUrl" alt="Preview GIF" class="h-10 max-w-[60px] object-contain" />
            <span class="text-sm flex-1">{{ form.message }}</span>
          </div>
        </div>
        <div class="flex justify-end gap-2 mt-4">
          <Button variant="secondary" @click="open = false">Cancel</Button>
          <Button type="submit" @click.prevent="submitChanges">Save</Button>
        </div>
      </form>
    </DialogContent>
  </Dialog>
</template>
