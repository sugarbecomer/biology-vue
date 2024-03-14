import { createPinia } from 'pinia'
import { App } from 'vue'
import PiniaPluginPersistendState from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(PiniaPluginPersistendState)
export function setupPinia(app: App) {
    app.use(pinia)
}

export default pinia
