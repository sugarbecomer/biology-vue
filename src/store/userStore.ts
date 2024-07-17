import { defineStore } from 'pinia'
import {ApiHeartBeat} from "@/api/login.ts";

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
        },
        async refreshToken(){
            ApiHeartBeat().then(res=>{
                if (res.data.code === -401){
                    this.clear()
                }
            })
        }
    },
    persist: {
        key: 'userInfo',
        storage: window.localStorage
    }
})
