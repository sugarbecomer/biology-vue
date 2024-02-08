import { createApp } from 'vue'
import App from "./App.vue";
import DevUI from 'vue-devui';
import './style.scss'
import 'vue-devui/style.css';
import '@devui-design/icons/icomoon/devui-icon.css';
import { ThemeServiceInit, infinityTheme, provenceTheme } from 'devui-theme';
import router from '@/router/index'
const themeService = ThemeServiceInit({ infinityTheme }, 'infinityTheme');
themeService?.applyTheme(provenceTheme)

const app = createApp(App)
app.use(router)
app.use(DevUI)
app.mount('#app')
