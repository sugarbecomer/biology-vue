import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
    state() {
        return {
            token: '',
            username: '',
            email: '',
            permission: '',
        }
    },
    actions: {
        async clear() {
            this.token = ''
            this.username = ''
            this.email = ''
            this.permission = ''
        },
        async logout() {
            await this.clear()
        }
    },
    persist: {
        key: 'userInfo',
        storage: window.localStorage
    }
})
