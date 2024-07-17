// uno.config.ts
import {defineConfig, presetAttributify, presetIcons, presetUno, presetWind} from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'
export default defineConfig({
    // ...UnoCSS options
    transformers: [
        transformerDirectives()
    ],
    shortcuts:[
        ['flex-center', 'flex justify-center items-center'],
        ['flex-around', 'flex justify-around items-center'],
        ['bordered', 'border-1 border-solid border-gray-200']
    ],
    presets:[
        presetAttributify(),
        presetUno(),
        presetIcons({
            scale: 1.2,
            warn: false,
            prefix: 'i-',
        }),
        presetWind({
            important: false
        })
    ]
})