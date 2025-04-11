<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Link } from '@/types'
import { ref } from 'vue'
import ScriptDialog from '@/components/Links/ScriptDialog.vue'
import { getLinks } from '@/http/services/linkService'
import EditLinkDialog from '@/components/Links/EditLinkDialog.vue'

const links = ref<Link[]>([])

const fetchLinks = async () => {
  await getLinks()
    .then((response) => {
      links.value = response
    })
    .catch((error) => {
      console.error('Error fetching links:', error)
    })
}
const scriptTag = `<style src="https://cdn.jsdelivr.net/gh/skywalkerx64/CDN@latest/topbar.js" defer></style>`

fetchLinks()
</script>
<template>
  <MainLayout>
    <div class="container mx-auto">
      <div class="mt-14">
        <h1 class="text-4xl font-bold mb-4">Links</h1>
      </div>
      <div>
        <Tabs default-value="all">
          <div class="flex items-center">
            <TabsList>
              <TabsTrigger value="all"> All </TabsTrigger>
              <TabsTrigger value="favorites"> Favorites </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>Links</CardTitle>
                <CardDescription> Manage your links. </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead class="hidden w-[100px] sm:table-cell">
                        <span class="sr-only">id</span>
                      </TableHead>
                      <TableHead>Page URL</TableHead>
                      <TableHead>GIF URL</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>
                        <span>Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow v-for="link in links" :key="link.id">
                      <TableCell class="hidden sm:table-cell">
                        <span class="text-xl"> #{{ link.id }}</span>
                      </TableCell>
                      <TableCell class="font-medium">
                        <a :href="link.url" target="_blank" class="text-blue-500 hover:underline">
                          {{ link.url }}
                        </a>
                      </TableCell>
                      <TableCell class="font-medium"> <img class="max-w-32" :src="link.gifUrl" alt="GIF" /> </TableCell>
                      <TableCell class="font-medium">
                        {{ link.message }}
                      </TableCell>
                      <TableCell class="flex h-full items-center justify-center space-x-2">
                        <ScriptDialog :script="scriptTag" />
                        <EditLinkDialog :link="link" />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  </MainLayout>
</template>
