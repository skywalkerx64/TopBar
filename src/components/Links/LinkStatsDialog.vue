<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { Track, Link } from '@/types'
import { ChartLine } from 'lucide-vue-next'
import { getStats, getTracks } from '@/http/services/linkService'

const open = ref(false)

const props = defineProps<{
  link: Link
}>()

const stats = ref({
  views: 0,
  clicks: 0,
})

const tracks = ref<Track[]>([])

const fetchStats = async () => {
  await getStats(props.link.id).then((response) => {
    stats.value = response
  })
}

const fetchTracks = async () => {
  await getTracks(props.link.id).then((response) => {
    tracks.value = response
  })
}
fetchStats()
fetchTracks()
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button variant="outline"> <ChartLine /> Tracks</Button>
    </DialogTrigger>

    <DialogContent class="max-w-3xl">
      <DialogHeader>
        <DialogTitle>Link Stats</DialogTitle>
        <DialogDescription> View and analyze the performance of your link. </DialogDescription>

        <h1 class="text-2xl font-medium">{{ stats.views }} Views | Clicks: {{ stats.clicks }}</h1>

        <div class="mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="hidden w-[100px] sm:table-cell">
                  <span class="sr-only">id</span>
                </TableHead>
                <TableHead>Page URL</TableHead>
                <TableHead>IP address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="track in tracks" :key="track.id">
                <TableCell class="hidden sm:table-cell">
                  <span class="text-xl"> #{{ track.id }}</span>
                </TableCell>
                <TableCell class="font-medium">
                  <a :href="track.url" target="_blank" class="text-blue-500 hover:underline">
                    {{ track.url }}
                  </a>
                </TableCell>
                <TableCell class="font-medium">
                  {{ track.ip }}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</template>
