import axios from 'axios'
import {useUserStore} from "@/store/userStore.ts";

export const request = axios.create({
    baseURL: '/api',
    timeout: 60 * 1000
})

// 请求前置拦截器
request.interceptors.request.use(
    config => {
        let userStore = useUserStore()
        if (userStore.token !== '') {
            config.headers!['authorization'] = `Bearer ${userStore.token}`
        }
        if (config.method?.toLowerCase() == 'get') {
            if (!config.params) {
                config.params = {}
            }
            config.params['t'] = new Date().getTime()
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)