<template>
  <d-layout class="my-layout">
    <d-header class="dheader-2">
      <img class="logo-devui" src="@/assets/vue.svg" alt="" />
      <span class="text">生信系统</span>
    </d-header>
    <d-layout>
      <d-aside class="daside-2">
        <d-menu mode="vertical" :default-select-keys="[route.name]" class="menu" @select="handleChangeMenu">
          <d-menu-item :key="menu.link" v-for="menu in menuList">
            <template #icon v-if="menu.icon">
              <i :class="menu.icon"></i>
            </template>
            <span>{{menu.title}}</span>
          </d-menu-item>
        </d-menu>
      </d-aside>
      <d-content class="dcontent-2">
        <d-breadcrumb class="dbreadcrumb">
          <d-breadcrumb-item>
            <span>生信系统</span>
          </d-breadcrumb-item>
          <d-breadcrumb-item>
            <span>{{menuName}}</span>
          </d-breadcrumb-item>
        </d-breadcrumb>
        <div class="inner-content">
          <router-view></router-view>
        </div>
      </d-content>
    </d-layout>
    <d-footer class="dfooter-2">版权所有</d-footer>
  </d-layout>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
const route = useRoute()
const menuName = ref('')

const menuList = ref([
  {
    title: '品系',
    link: 'strain',
    icon: undefined
  },
  {
    title: '基因',
    link: 'allele',
  },
  {
    title: '注解',
    link: 'annotate',
  },
])
watch(() => route.name, (val) => {
  const nowMenu  = menuList.value.filter((item) => item.link === val)
  if (nowMenu.length >0 ){
    menuName.value = nowMenu[0].title
  }else{
    menuName.value = '未知路径'
  }
},{
  immediate: true
})
const router = useRouter()
const handleChangeMenu = (val)=>{
  router.push({name:val.key})
}
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
    width: 160px;
  }
}
.devui-layout__aside{
  height: calc(100% - 120px);
}
.dheader-2 {
  position: relative;
  height: 60px;
  display: flex;
  align-items: center;
  background-color: #6784e5;

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
  box-sizing: border-box;
  .inner-content {
    background-color: #fff;
    padding: 16px;
    height: calc(100% - 20px);
    overflow-y: auto;
  }

  .dbreadcrumb {
    margin-top: 8px;
    margin-bottom: 10px;
  }
}

.dfooter-2 {
  height: 50px;
  color: #fff;
  background-color: #6784e5;
  padding: 8px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}
:deep(li.devui-menu-item){
  width: 100%;
  text-align: center;
  display: block;
}
</style>