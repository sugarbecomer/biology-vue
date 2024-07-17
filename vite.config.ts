import {ConfigEnv, defineConfig, loadEnv, UserConfigExport} from "vite";
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'
import {createHtmlPlugin} from "vite-plugin-html";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite';
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers';
// 引入unocss
import UnoCSS from 'unocss/vite'
//这个配置 为了在html中使用 环境变量
const getViteEnv = (mode: string, target: string) => {
    return loadEnv(mode, process.cwd())[target];
};
const htmlPlugin = (mode: string) => createHtmlPlugin({
    inject: {
        data: {
            title: getViteEnv(mode, 'VITE_APP_TITLE')
        }
    }
})
export default ({mode}: ConfigEnv): UserConfigExport => defineConfig({
    plugins: [
        vue(),
        htmlPlugin(mode),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
        UnoCSS(),
    ],
    resolve: {
        alias: [
            {
                find: '@',
                replacement: resolve(__dirname, 'src')
            }
        ]
    },
    server: {
        host: '0.0.0.0',
        port: 3000,
        open: true,
        proxy: {
            '/api': {
                target: 'http://localhost:10080',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },
})
