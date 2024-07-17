import { defineStore } from 'pinia'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
// element-plus国际化的map
const elLocaleMap = {
    'zh-CN': zhCn,
    en: en
}

export const useLocaleStore = defineStore('localeStore', {
    state: ():{locale: LocaleType, elLocale: any} => ({
        locale: 'zh-CN',
        elLocale: elLocaleMap['zh-CN']
    }),
    actions: {
        setLocale(locale: LocaleType) {
            this.locale = locale
            this.elLocale = elLocaleMap[locale]
        },
    },
    persist: {
        key: 'locale',
        storage: window.localStorage
    }
})