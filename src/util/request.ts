import axios from 'axios'
import {useUserStore} from "@/store/userStore.ts";
import {Message} from "vue-devui";
import router from '@/router'

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

// 响应拦截器
request.interceptors.response.use(
    config => {
        if (config.data.code == 401) {
            // 401未登录
            useUserStore().clear()
            Message.error('请先登录')
            router.push({ name: 'login' })
        } else if (config.data.code >= 400) {
            Message.error(config.data.message || '未知错误');
            return Promise.reject(config.data)
        }
        // 登录成功获取 token
        if (config.request.responseURL.endsWith("/login") && config.data.code == 200){
            const token = config.data.data.token
            const userStore = useUserStore()
            userStore.token = token;
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)
