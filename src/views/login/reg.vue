<template>
  <!-- 整体背景 -->
  <div class="login-wrap">
    <!--输入框-->
    <div class="form-wrapper">
      <div class="header">
        生信管理系统
      </div>
      <div class="input-wrapper">
        <div class="border-wrapper">
          <input v-model="form.username" type="text" name="username" placeholder="请输入账号" class="border-item" autocomplete="off" />
        </div>
        <div class="border-wrapper">
          <input v-model="form.password" type="password" name="password" placeholder="请输入密码" class="border-item" autocomplete="off" />
        </div>
      </div>
      <div class="action">
        <div class="btn" @click="onReg">注 册</div>
      </div>
      <div class="tip">
        <span @click="toLogin">已有账号？立即登录</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref} from "vue";
import {ApiLoginDto, ApiRegister} from "@/api/login.ts";
import {Message} from 'vue-devui'
import {getSign, getTimestamp} from "@/util/enc.ts";
import {useRouter} from "vue-router";
const router = useRouter()
const form = ref({
  username: '',
  password: '',
})
const onReg = ()=>{
  if(!form.value.username || !form.value.password){
    Message.warning('账号或密码不能为空')
    return
  }
  const data:ApiLoginDto = {
    username: form.value.username,
    password: form.value.password,
    timestamp: getTimestamp(),
    sign: ''
  }
  data.sign = getSign(data.username, data.password, data.timestamp)
  ApiRegister(data).then(res=>{
    console.log(res)
  })
}

const toLogin = ()=>{
  router.push({
    name: 'Login'
  })
}
</script>
<style scoped>
.login-wrap {
  height: 100%;
  width: 100%;
  font-family: JetBrains Mono Medium;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: #0e92b3; */
  background: url('@/assets/images/login-bg.png');
  background-size: 100% 100%;
}

.form-wrapper {
  width: 400px;
  background-color: rgba(41, 45, 62, 0.8);
  color: #fff;
  border-radius: 2px;
  padding: 50px;
}

.form-wrapper .header {
  text-align: center;
  font-size: 35px;
  text-transform: uppercase;
  line-height: 100px;
}

.form-wrapper .input-wrapper input {
  background-color: rgb(41, 45, 62);
  border: 0;
  width: 100%;
  text-align: center;
  font-size: 15px;
  color: #fff;
  outline: none;
}

.form-wrapper .input-wrapper input::placeholder {
  text-transform: uppercase;
}

.form-wrapper .input-wrapper .border-wrapper {
  background-image: linear-gradient(to right, #e8198b, #0eb4dd);
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-wrapper .input-wrapper .border-wrapper .border-item {
  height: calc(100% - 4px);
  width: calc(100% - 4px);
  border-radius: 30px;
}

.form-wrapper .action {
  display: flex;
  justify-content: center;
}

.form-wrapper .action .btn {
  width: 60%;
  text-transform: uppercase;
  border: 2px solid #0e92b3;
  text-align: center;
  line-height: 50px;
  border-radius: 30px;
  cursor: pointer;
}

.form-wrapper .action .btn:hover {
  background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
}

.form-wrapper .icon-wrapper {
  text-align: center;
  width: 60%;
  margin: 0 auto;
  margin-top: 20px;
  border-top: 1px dashed rgb(146, 146, 146);
  padding: 20px;
}

.form-wrapper .icon-wrapper i {
  font-size: 20px;
  color: rgb(187, 187, 187);
  cursor: pointer;
  border: 1px solid #fff;
  padding: 5px;
  border-radius: 20px;
}

.form-wrapper .icon-wrapper i:hover {
  background-color: #0e92b3;
}
.tip{
  width: 100%;
  text-align: center;
  margin-top: 1rem;
  span{
    color: rgba(150,150,150,.5) !important;
    user-select: none;
    &:hover{
      cursor: pointer;
    }
  }
}
</style>