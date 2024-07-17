import { createRouter, createWebHistory, Router } from "vue-router";
import { routes } from "./routes.ts";
import {useUserStore} from "@/store/userStore.ts";

const router: Router = createRouter({
    history: createWebHistory(),
    routes,
});

// 通过jwt token的过期时间来判定是否过期
router.beforeEach((__, _, next) => {
    const userStore = useUserStore()
    const token = userStore.token;
    const tokenInfoBase64 = token?.split(".")[1] || null;
    if(!tokenInfoBase64){
        return next();
    }
    const tokenInfo = JSON.parse(atob(tokenInfoBase64));
    const exp = tokenInfo.exp;
    const now = new Date().getTime() / 1000;
    if(now > exp){
        userStore.logout();
    }
    next()
})
export default router;
