<script setup lang="ts">
import cn from 'element-plus/es/locale/lang/zh-cn';

</script>

<template>
  <ElConfigProvider
      :locale="cn"
      :message="{ max: 1 }"
  >
    <RouterView/>
  </ElConfigProvider>
</template>

<style scoped>
</style>
