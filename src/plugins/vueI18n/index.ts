import type {App} from 'vue'
import type {I18nOptions} from 'vue-i18n'
import {createI18n} from 'vue-i18n'
import {useLocaleStore} from '@/store/localeStore.ts'
import {setHtmlPageLang} from './helper'
import {ref} from "vue";

export let i18n: ReturnType<typeof createI18n>
interface LocaleInfo {
    name: string,
    value: string
}
export var LocaleInfoMap = ref<LocaleInfo[]>([])
const createI18nOptions = async (): Promise<I18nOptions> => {
    const localeStore = useLocaleStore()
    const locale = localeStore.locale
    const allLocales = import.meta.glob("@/locales/*.ts", { eager: true })
    const allLocaleMap = {}
    for (let localKey of Object.keys(allLocales)) {
        const localeData = (allLocales[localKey] as any).default
        localKey = localKey.replace(/.*\/(.*?)\.ts$/g, "$1")
        allLocaleMap[localKey] = localeData
        LocaleInfoMap.value.push({name:localeData.common.name,value:localKey})
    }
    setHtmlPageLang(locale)
    return {
        legacy: false,
        locale: locale,
        fallbackLocale: 'zh-CN',
        sync: true,
        messages: allLocaleMap,
        silentTranslationWarn: true,
        missingWarn: false,
        silentFallbackWarn: true
    }
}

export const setupI18n = async (app: App<Element>) => {
    const options = await createI18nOptions()
    i18n = createI18n(options)
    app.use(i18n)
}