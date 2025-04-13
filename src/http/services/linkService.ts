import api from '@/http/services/api'
import type { Link, Track } from '@/types'



export async function getLinks() {
  const response = await api.get('/links')
  return response.data as Link[]
}

export async function updateLink(id: number, data: { url?: string; message?: string; gifUrl?: string; backgroundColor?: string; textColor?: string; }) {
  const response = await api.put(`/links/${id}`, data)
  return response.data as Link
}

export async function getStats(id: number) {
  const response = await api.get(`/links/${id}/stats`)
  return response.data as { all: number, day: number, week: number, month: number };
}

export async function getTracks(id: number) {
  const response = await api.get(`/links/tracks/${id}`);
  return response.data as Track[];

}
