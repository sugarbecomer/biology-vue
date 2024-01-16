<template>
  <d-layout class="my-layout">
    <d-header class="dheader-2">
      <img class="logo-devui" src="./assets/vue.svg" alt="" />
      <span class="text">生信系统</span>
    </d-header>
    <d-layout>
      <d-aside class="daside-2">
        <d-accordion :data="menu" class="menu"></d-accordion>
      </d-aside>
      <d-content class="dcontent-2">
        <d-breadcrumb class="dbreadcrumb">
          <d-breadcrumb-item>
            <span>生信系统</span>
          </d-breadcrumb-item>
          <d-breadcrumb-item>
            <span>面包屑</span>
          </d-breadcrumb-item>
        </d-breadcrumb>
        <div class="inner-content"></div>
      </d-content>
    </d-layout>
    <d-footer class="dfooter-2">版权所有</d-footer>
  </d-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const menu = ref([
      {
        title: '品系',
        open: false,
      },
      {
        title: '基因',
        open: false,
      },
      {
        title: '注解',
      },
    ])
    return {
      menu
    }
  }
})

</script>

<style lang="scss" scoped>
:deep(.devui-layout__header){
  flex: unset;
}
.my-layout {
  height: 100vh;
}
.daside-2 {
  border-left: 1px solid transparent;
  .menu{
    width: 180px;
  }
}

.dheader-2 {
  position: relative;
  height: 60px;
  display: flex;
  align-items: center;
  background-color: #333854;

  .logo-devui {
    width: 26px;
    height: 26px;
    margin: 0 10px;
  }

  .text {
    color: #fff;
    font-size: 16px;
  }
}

.dcontent-2 {
  height: 100%;
  padding: 0px 40px 40px 40px;
  background-color: #f3f6f8;

  .inner-content {
    background-color: #fff;
    padding: 16px;
    height: calc(100% - 20px);
  }

  .dbreadcrumb {
    margin-top: 8px;
    margin-bottom: 10px;
  }
}

.dfooter-2 {
  height: 50px;
  color: #fff;
  background-color: #333854;
  padding: 8px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>