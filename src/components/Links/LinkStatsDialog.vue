<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { Dialog, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogScrollContent } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Track, Link } from '@/types'
import { ChartLine } from 'lucide-vue-next'
import { getStats, getTracksPerPeriod } from '@/http/services/linkService'

const open = ref(false)

const props = defineProps<{
  link: Link
}>()

const stats = ref({
  all: {
    visits: 0,
    clicks: 0,
  },
  day: {
    visits: 0,
    clicks: 0,
  },
  week: {
    visits: 0,
    clicks: 0,
  },
  month: {
    visits: 0,
    clicks: 0,
  },
})

const tracks = ref<Track[]>([])
const todayTracks = ref<Track[]>([])
const weekTracks = ref<Track[]>([])
const monthTracks = ref<Track[]>([])

const fetchStats = async () => {
  await getStats(props.link.id).then((response) => {
    stats.value = response
  })
}

const fetchTracks = async () => {
  await getTracksPerPeriod(props.link.id, 'all').then((response) => {
    tracks.value = response
  })
  await getTracksPerPeriod(props.link.id, 'day').then((response) => {
    todayTracks.value = response
  })
  await getTracksPerPeriod(props.link.id, 'week').then((response) => {
    weekTracks.value = response
  })
  await getTracksPerPeriod(props.link.id, 'month').then((response) => {
    monthTracks.value = response
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

    <DialogScrollContent class="max-w-3xl">
      <DialogHeader>
        <DialogTitle>Link Stats</DialogTitle>
        <DialogDescription> View and analyze the performance of your link. </DialogDescription>

        <Tabs default-value="all">
          <div class="flex items-center">
            <TabsList>
              <TabsTrigger value="day"> Today </TabsTrigger>
              <TabsTrigger value="week"> Week </TabsTrigger>
              <TabsTrigger value="month"> Month </TabsTrigger>
              <TabsTrigger value="all"> All </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all">
            <h1 class="text-2xl font-medium">{{ stats.all.visits }} Visiteurs | {{ stats.all.clicks }} Clicks</h1>
            <h1 class="text-2xl font-medium">Conversions : 0 euros</h1>
            <h1 class="text-2xl font-medium"></h1>
            <div class="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead class="hidden w-[100px] sm:table-cell">
                      <span class="sr-only">id</span>
                    </TableHead>
                    <TableHead>IP address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow v-for="track in tracks" :key="track.id">
                    <TableCell class="hidden sm:table-cell">
                      <span class="text-xl"> #{{ track.id }}</span>
                    </TableCell>
                    <TableCell class="font-medium">
                      {{ track.ip }}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="day">
            <h1 class="text-2xl font-medium">{{ stats.day.visits }} Visiteurs | {{ stats.day.clicks }} Clicks</h1>
            <h1 class="text-2xl font-medium">Conversions : 0 euros</h1>
            <div class="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead class="hidden w-[100px] sm:table-cell">
                      <span class="sr-only">id</span>
                    </TableHead>
                    <TableHead>IP address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow v-for="track in todayTracks" :key="track.id">
                    <TableCell class="hidden sm:table-cell">
                      <span class="text-xl"> #{{ track.id }}</span>
                    </TableCell>
                    <TableCell class="font-medium">
                      {{ track.ip }}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="week">
            <h1 class="text-2xl font-medium">{{ stats.week.visits }} Visiteurs | {{ stats.week.clicks }} Clicks</h1>
            <h1 class="text-2xl font-medium">Conversions : 0 euros</h1>
            <div class="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead class="hidden w-[100px] sm:table-cell">
                      <span class="sr-only">id</span>
                    </TableHead>
                    <TableHead>IP address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow v-for="track in weekTracks" :key="track.id">
                    <TableCell class="hidden sm:table-cell">
                      <span class="text-xl"> #{{ track.id }}</span>
                    </TableCell>
                    <TableCell class="font-medium">
                      {{ track.ip }}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="month">
            <h1 class="text-2xl font-medium">{{ stats.month.visits }} Visiteurs | {{ stats.month.clicks }} Clicks</h1>
            <h1 class="text-2xl font-medium">Conversions : 0 euros</h1>
            <div class="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead class="hidden w-[100px] sm:table-cell">
                      <span class="sr-only">id</span>
                    </TableHead>
                    <TableHead>IP address</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow v-for="track in monthTracks" :key="track.id">
                    <TableCell class="hidden sm:table-cell">
                      <span class="text-xl"> #{{ track.id }}</span>
                    </TableCell>
                    <TableCell class="font-medium">
                      {{ track.ip }}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </DialogHeader>
    </DialogScrollContent>
  </Dialog>
</template>
