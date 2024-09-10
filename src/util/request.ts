import axios from 'axios';
import { useUserStore } from '@/store/userStore.ts';
import { ElMessage } from 'element-plus';
import router from '@/router';
import { i18n } from '@/plugins/vueI18n';

export const request = axios.create({
  baseURL: '/api',
  timeout: 60 * 1000,
});
// 请求前置拦截器
request.interceptors.request.use(
  (config) => {
    let userStore = useUserStore();
    if (userStore.token !== '') {
      config.headers!['x-token'] = `${userStore.token}`;
    }
    if (config.method?.toLowerCase() == 'get') {
      if (!config.params) {
        config.params = {};
      }
      config.params['t'] = new Date().getTime();
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

// 响应拦截器
request.interceptors.response.use(
  (config) => {
    const { t } = i18n.global as any;
    console.log(t);
    if (config.data.code == 401) {
      // 401未登录
      useUserStore().clear();
      ElMessage.error(t('common.needLogin'));
      router.push({ name: 'login' });
    } else if (config.data.code >= 400) {
      ElMessage.error(t(`common.${config.data.key}`));
      return Promise.reject(config.data);
    }
    // 登录成功获取 token
    if (config.request.responseURL.endsWith('/login') && config.data.code == 200) {
      const token = config.data.data.token;
      const userStore = useUserStore();
      userStore.token = token;
      userStore.username = config.data.data.user_name;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);
