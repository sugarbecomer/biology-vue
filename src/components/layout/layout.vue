<script lang="ts" setup>
import {useI18n} from "vue-i18n";
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {useUserStore} from "@/store/userStore.ts";

defineOptions({
  name: 'Layout'
})
const {t} = useI18n()
const menuList = ref([
  {
    name: '品系管理',
    path: '/strain',
  },
  {
    name: '基因管理',
    path: '/allele',
  }
])
const activeMenu = ref()
const route = useRoute();
const router = useRouter();
onMounted(()=>{
  activeMenu.value = route.path
  console.log(route.path)
})
const handleSelect = (val:string)=>{
  router.push({
    path: val
  })
}
const userStore = useUserStore();
const toLogin = ()=>{
  router.replace({
    name: 'Login'
  })
}
onMounted(()=>{
  // 每5秒刷新一次token
  setInterval(()=>{
    userStore.refreshToken()
  }, 5000)
})
</script>
<template>
  <div class="common-layout w-full h-full">
    <el-container class="w-full h-full">
      <el-header class="shadow leading-[60px] select-none items-center flex justify-between">
        <div class="header-login flex-center h-[60px]">
          <img src="@/assets/vue.svg">
          <h4>{{t('common.systemName')}}</h4>
        </div>
        <div class="head-nav">
          <el-menu
              :default-active="activeMenu"
              mode="horizontal"
              @select="handleSelect"
              class="w-[300px]"
          >
            <template v-for="item in menuList">
              <el-menu-item :index="item.path">{{item.name}}</el-menu-item>
            </template>
          </el-menu>
        </div>
        <div class="head-user">
          <el-button @click="toLogin" v-if="!userStore.token" type="warning" link>{{t('common.needLogin')}}</el-button>
          <div v-else class="h-[60px] flex-center">
            <el-dropdown>
              <div class="flex-center gap-2 cursor-pointer drop-item">
                <el-text type="primary">{{t('common.welcome')}}{{userStore.username}}</el-text>
                <el-avatar :size="30" src="https://api.lolimi.cn/API/dmt/api.php?type=image" />
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <el-button type="text" @click="userStore.logout">{{t('common.logout')}}</el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-container>
<!--        <el-aside width="200px">Aside</el-aside>-->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.el-main{
  height: calc(100vh - 60px);
}
:deep(.el-dropdown:focus-visible){
  outline: none !important;
}
.drop-item:focus-visible{
  outline: none !important;
}
</style>