import { createApp } from 'vue'
import App from "./App.vue";
import DevUI from 'vue-devui';
import './style.scss'
import 'vue-devui/style.css';
import '@devui-design/icons/icomoon/devui-icon.css';
import { ThemeServiceInit, infinityTheme } from 'devui-theme';
import router from '@/router/index'
ThemeServiceInit({ infinityTheme }, 'infinityTheme');

const app = createApp(App)
app.use(router)
app.use(DevUI)
app.mount('#app')
