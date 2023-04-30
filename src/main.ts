import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { plugin, defaultConfig } from '@formkit/vue'
import App from './App.vue'
import router from './router'
import '@formkit/themes/genesis'

import './style.css'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

pinia.use(({ store }) => {
  store.router = markRaw(router)
});

app.use(pinia)
app.use(router)
app.use(plugin, defaultConfig)

app.mount('#app')
