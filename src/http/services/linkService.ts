import api from '@/http/services/api'
import type { Link, Track } from '@/types'



export async function getLinks() {
  const response = await api.get('/links')
  return response.data as Link[]
}

export async function updateLink(id: number, data: { url?: string; messages: { message: string | null, gifUrl: string | null, gif?: File | null }[] | null | null; backgroundColor?: string; textColor?: string; }) {
  const response = await api.put(`/links/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } })
  return response.data as Link
}

export async function getStats(id: number) {
  const response = await api.get(`/links/${id}/stats`)
  return response.data as { all: { visits: number, clicks: number }, day: { visits: number, clicks: number }, week: { visits: number, clicks: number }, month: { visits: number, clicks: number } };
}

export async function getTracks(id: number) {
  const response = await api.get(`/links/tracks/${id}`);
  return response.data as Track[];

}

export async function getTracksPerPeriod(id: number, period?: 'all' | 'day' | 'week' | 'month') {
  const response = await api.get(`/links/tracks/${id}/${period}`);
  return response.data as Track[];

}
