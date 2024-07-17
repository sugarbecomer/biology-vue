<script setup lang="ts">
defineExpose({
  name: "Login",
});
import { useI18n } from "vue-i18n";
import { useLocaleStore } from "@/store/localeStore.ts";
import { LocaleInfoMap } from "@/plugins/vueI18n/index.ts";
import { ref } from "vue";
import { FormRules, FormInstance, ElMessage } from "element-plus";
import { ApiLogin, ApiLoginDto } from "@/api/login.ts";
import { getPassword, getSign, getTimestamp } from "@/util/enc.ts";
import { useRouter } from "vue-router";

const i18n = useI18n();
const router = useRouter();
const { t, locale } = i18n;
const localeStore = useLocaleStore();
const changeLacale = (val: LocaleType) => {
  console.log(val);
  localeStore.setLocale(val);
  locale.value = val;
};
const loginForm = ref({
  username: "",
  password: "",
});
const loginFormRef = ref<FormInstance>();
const loginLoading = ref<boolean>(false);
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
const onLogin = () => {
  loginFormRef.value?.validate().then((valid) => {
    if (!valid) {
      return false;
    }
    loginLoading.value = true;
    const data: ApiLoginDto = {
      username: loginForm.value.username,
      password: loginForm.value.password,
      time: getTimestamp(),
      sign: "",
    };
    data.password = getPassword(data.password);
    data.sign = getSign(data.username, String(data.time), data.password);
    ApiLogin(data)
      .then((res) => {
        ElMessage.success(
          t(`message.${res.data.message}`) || t("message.success")
        );
        router.push({ name: "strain" });
      })
      .finally(() => {
        loginLoading.value = false;
      });
  });
};
const toReg = () => {
  router.push({
    name: "Register",
  });
};
</script>

<template>
  <div class="login-container flex-center">
    <div
      class="login-box relative w-[80%] h-[85%] bg-[#ffffff4d] rounded-lg select-none flex-around p-10 gap-10"
    >
      <el-select
        class="language-select"
        v-model="localeStore.locale"
        @change="changeLacale"
        size="small"
      >
        <el-option
          v-for="item in LocaleInfoMap"
          :key="item.value"
          :label="item.name"
          :value="item.value"
        />
      </el-select>
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
                :placeholder="t('login.username')"
              >
                <template #prefix>
                  <i class="i-ri:user-3-fill" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="loginForm.password"
                type="password"
                size="large"
                :placeholder="t('login.password')"
                show-password
              >
                <template #prefix>
                  <i class="i-ri:lock-password-fill" />
                </template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                v-loading="loginLoading"
                @click="onLogin"
                icon="user"
                type="primary"
                size="large"
                class="w-full"
                >{{ t("login.button") }}
              </el-button>
            </el-form-item>
            <el-form-item>
              <div class="absolute right-0 mt-5 flex-center">
                <span class="h-[32px] text-[#999] text-xs leading-8">{{
                  t("login.registerTip")
                }}</span>
                <el-button type="primary" link @click="toReg">{{
                  t("login.registerButton")
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
