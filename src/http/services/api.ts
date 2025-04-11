import axios from 'axios'
import { toast } from 'vue-sonner'
import router from '@/router'


const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + '/api',
})


api.interceptors.response.use((response) => response, (errorInstance) => {
  if (errorInstance.response.status === 401) {
    toast.error('Unauthorized Access. Please login again')
    router.push({ name: 'login' })
  }

  if (errorInstance.response.status === 500) {
    toast.error('Something went wrong. Please try again')
  }

  if (errorInstance.response.status === 422 || errorInstance.response.status === 400) {
    const errors = errorInstance.response.data.errors
    errors.forEach((error: { message: string }) => {
      toast.error(error?.message)
    })
  }
  throw errorInstance;
});

export default api
