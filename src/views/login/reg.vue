<script setup lang="ts">
import { useI18n } from "vue-i18n";

defineExpose({
  name: "Register",
});
import { ref } from "vue";
import { FormRules, FormInstance, ElMessage } from "element-plus";
import { ApiLoginDto, ApiRegister } from "@/api/login.ts";
import { getSign, getTimestamp } from "@/util/enc.ts";
import { useRouter } from "vue-router";
const router = useRouter();
const { t } = useI18n();
const loginForm = ref({
  username: "",
  password: "",
});
const loginFormRef = ref<FormInstance>();
const rules = ref<FormRules<typeof loginForm>>({
  username: [
    {
      required: true,
      message: t("login.usernameValid"),
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: t("login.passwordValid"),
      trigger: "blur",
    },
  ],
});
const onRegister = () => {
  loginFormRef.value?.validate().then((valid) => {
    if (!valid) {
      return false;
    }
    const data: ApiLoginDto = {
      username: loginForm.value.username,
      password: loginForm.value.password,
      time: getTimestamp(),
      sign: "",
    };
    data.sign = getSign(data.username, String(data.time), data.password);
    ApiRegister(data).then((res) => {
      ElMessage.success(
        t(`message.${res.data.message}`) || t("message.success")
      );
      toLogin();
    });
  });
};
const toLogin = () => {
  router.push({
    name: "Login",
  });
};
</script>

<template>
  <div class="login-container flex-center">
    <div
      class="login-box relative w-[80%] h-[85%] bg-[#ffffff4d] rounded-lg select-none flex-around p-10 gap-10"
    >
      <div class="login-box-left w-[800px] hidden sm:block">
        <img class="w-full h-full" src="@/assets/login/opr.png" alt="" />
      </div>
      <div
        class="login-box-form w-[450px] p-10 rounded-md bg-white shadow-md opacity-[.85]"
      >
        <div class="login-logo">
          <h2
            class="text-align-center font-700 whitespace-nowrap text-[#34495e] mb-10"
          >
            {{ t("common.systemName") }}
          </h2>
          <el-form ref="loginFormRef" :model="loginForm" :rules="rules">
            <el-form-item prop="username">
              <el-input
                v-model="loginForm.username"
                size="large"
                :placeholder="t('register.username')"
              >
                <template #prefix>
                  <i class="i-ri-user-3-fill" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                type="password"
                size="large"
                :placeholder="t('register.password')"
                show-password
              >
                <template #prefix>
                  <i i-ri:lock-password-fill />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                @click="onRegister"
                icon="user"
                type="primary"
                size="large"
                class="w-full"
                >{{ t("register.button") }}
              </el-button>
            </el-form-item>
            <el-form-item>
              <div class="absolute right-0 mt-5 flex-center">
                <span class="h-[32px] text-[#999] text-xs leading-8">{{
                  t("register.loginTip")
                }}</span>
                <el-button type="primary" link @click="toLogin">{{
                  t("register.loginButton")
                }}</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  // background: url('@/assets/login/bg.png');
  background: url("https://t.alcy.cc/pc/");
  background-size: cover;
  height: 100%;
  min-height: 800px;
}

.language-select {
  @apply absolute top-5 right-5 w-30 !important;
  opacity: 0.8;
}
</style>
