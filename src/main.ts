import { createApp } from 'vue'
import 'virtual:uno.css'
import './style.scss'
import App from './App.vue'
import {setupPinia} from "@/store/pinia.ts";
import {setupI18n} from "@/plugins/vueI18n";
import {setupRouter} from "@/plugins/router";
const app = createApp(App)
import '@iconify-json/ri'
import 'element-plus/dist/index.css'
import {setupInfiniteScroll} from "@/plugins/infiniteScroll";
setupPinia(app)
setupI18n(app)
setupRouter(app)
setupInfiniteScroll(app)
app.mount('#app')