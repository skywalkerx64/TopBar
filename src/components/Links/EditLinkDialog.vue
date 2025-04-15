<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogScrollContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { updateLink } from '@/http/services/linkService'
import type { Link } from '@/types'
import { Pen, Trash } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

const open = ref(false)

const props = defineProps<{
  link: Link
}>()

const form = ref({
  backgroundColor: props.link.backgroundColor,
  textColor: props.link.textColor,
  url: props.link.url,
  messages:
    props.link?.messages?.data.map((message) => ({
      message: message.message,
      gifUrl: message.gifUrl,
      gif: null,
    })) || [],
})

function addMessage() {
  form.value?.messages?.push({ message: '', gifUrl: '', gif: null })
}

function removeMessage(index: number) {
  form.value?.messages?.splice(index, 1)
}
async function submitChanges() {
  await updateLink(props.link.id, form.value)
    .then(() => {
      open.value = false
    })
    .then(() => {
      toast.success('Link updated successfully')
    })
}

function handleFileUpload(event: Event, index: number) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    form.value.messages[index].gif = file
  }
}

const currentSlide = ref(0)
const carouselRef = ref<HTMLElement>()

onMounted(() => {
  setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % (form.value?.messages?.data?.length ?? 1)
  }, 4000)
})
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button variant="outline"> <Pen /> Edit</Button>
    </DialogTrigger>

    <DialogScrollContent class="max-w-xl">
      <DialogHeader>
        <DialogTitle>Edit your Top Bar</DialogTitle>
        <DialogDescription> Customize the appearance and behavior of your smart top bar. </DialogDescription>
      </DialogHeader>

      <form class="grid gap-4 mt-4" @submit.prevent="submitChanges">
        <div class="grid gap-2">
          <label class="text-sm font-medium">URL</label>
          <Input v-model="form.url" class="border border-input rounded px-3 py-2 text-sm" type="text" placeholder="Enter your link URL" required />
        </div>

        <div class="flex justify-end w-full mb-4">
          <Button type="button" class="w-fit" @click.prevent="addMessage">Ajouter un message</Button>
        </div>

        <div v-for="(message, index) in form?.messages" :key="index" class="border p-4 rounded-xl space-y-2 mt-4 relative">
          <div>
            <label class="text-sm font-medium">Message</label>
            <Input v-model="message.message" placeholder="Texte du message" />
          </div>
          <div>
            <label class="text-sm font-medium">Gif URL</label>
            <Input v-model="message.gifUrl" placeholder="URL du GIF (optionnel)" />

            <label class="text-sm font-medium">Upload your GIF</label>
            <Input type="file" placeholder="Upload your GIF" accept="image/gif" @change="(event) => handleFileUpload(event, index)" />
          </div>

          <Button type="button" size="sm" variant="destructive" class="absolute -top-6 -right-6" @click.prevent="removeMessage(index)"> <Trash /> </Button>
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
        <div class="mt-6">
          <p class="text-sm font-semibold mb-2">Live preview:</p>
          <div
            class="relative overflow-hidden rounded-xl border p-4"
            :style="{
              backgroundColor: form.backgroundColor,
              color: form.textColor,
            }"
          >
            <div class="flex transition-transform duration-500 ease-in-out" :style="{ transform: `translateX(-${currentSlide * 100}%)` }" ref="carouselRef">
              <div v-for="(message, index) in form?.messages" :key="'preview-' + index" class="min-w-full flex items-center justify-center gap-2 px-4">
                <span class="text-sm">{{ message.message }}</span>
                <img v-if="message.gifUrl" :src="message.gifUrl" alt="" class="h-6 w-6 object-contain" />
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-end gap-2 mt-4">
          <Button type="button" variant="secondary" @click.prevent="open = false">Cancel</Button>
          <Button type="submit" @click.prevent="submitChanges">Save</Button>
        </div>
      </form>
    </DialogScrollContent>
  </Dialog>
</template>
