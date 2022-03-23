import './domain/directus.js'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import "https://unpkg.com/spark-md5@3.0.2/spark-md5.js"

import './index.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
