import { RouteRecordRaw } from "vue-router";
import Layout from "@/components/layout/layout.vue";
export const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        component: ()=> import("@/views/login/login.vue"),
        name: 'Login'
    },
    {
        path: '/register',
        component: ()=> import("@/views/login/reg.vue"),
        name: 'Register'
    },
    {
        name: 'Layout',
        path: '/',
        component: Layout,
        redirect: '/strain',
        children: [
            {
                name: "strain",
                path: "/strain",
                component: () => import("@/views/strain/list.vue"),
            },
            {
                name: "allele",
                path: "/allele",
                component: () => import("@/views/allele/list.vue"),
            },
            // {
            //     name: "annotate",
            //     path: "/annotate",
            //     component: () => import("@/views/annotate/index.vue"),
            // },
        ]
    }
];
