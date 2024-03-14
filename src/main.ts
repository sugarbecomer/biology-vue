import { createApp } from 'vue'
import App from "./App.vue";
import DevUI from 'vue-devui';
import './style.scss'
import 'vue-devui/style.css';
import 'devui-theme/styles-var/devui-var.scss'
import '@devui-design/icons/icomoon/devui-icon.css';
import { ThemeServiceInit, infinityTheme } from 'devui-theme';
import router from '@/router/index'
import {setupPinia} from "@/store/pinia.ts";
ThemeServiceInit({ infinityTheme }, 'infinityTheme');

const app = createApp(App)
setupPinia(app)
app.use(router)
app.use(DevUI)
app.mount('#app')
