<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// const locale = useLocaleStore();

</script>

<template>
  <ElConfigProvider
      :locale="zhCn"
      :message="{ max: 1 }"
  >
    <RouterView/>
  </ElConfigProvider>
</template>

<style scoped>
</style>
