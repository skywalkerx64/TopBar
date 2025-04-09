<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Eye, MoreHorizontal, Pen, Trash } from 'lucide-vue-next'
import type { Link } from '@/types'
import { ref } from 'vue'

const links = ref<Link[]>([
  {
    id: 1,
    message: '🌐 Ouvrez dans votre navigateur pour une meilleure expérience',
    pageUrl: 'http://localhost',
    gifUrl: 'https://data.textstudio.com/output/sample/animated/3/2/6/5/public-1-5623.gif',
    data: {
      backgroundColor: '#1E293B',
      textColor: '#FFFFFF',
    },
  },
])
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
                        {{ link.pageUrl }}
                      </TableCell>
                      <TableCell class="font-medium"> <img class="max-w-32" :src="link.gifUrl" alt="GIF" /> </TableCell>
                      <TableCell class="font-medium">
                        {{ link.message }}
                      </TableCell>
                      <TableCell class="flex">
                        <DropdownMenu>
                          <DropdownMenuTrigger as-child>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoreHorizontal class="h-4 w-4" />
                              <span class="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem> <Eye /> View </DropdownMenuItem>
                            <DropdownMenuItem> <Pen /> Edit </DropdownMenuItem>
                            <DropdownMenuItem> <Trash /> Delete </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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
