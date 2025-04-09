import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(createPinia().use(piniaPluginPersistedState))

app.mount('#app')
