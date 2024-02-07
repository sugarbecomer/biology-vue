import { RouteRecordRaw } from "vue-router";
import Layout from "@/components/layout/index.vue";
export const routes: RouteRecordRaw[] = [
    {
        name: 'Layout',
        path: '/',
        component: Layout,
        redirect: '/strain',
        children: [
            {
                name: "strain",
                path: "/strain",
                component: () => import("@/views/strain/index.vue"),
            },
            {
                name: "allele",
                path: "/allele",
                component: () => import("@/views/allele/index.vue"),
            },
            {
                name: "annotate",
                path: "/annotate",
                component: () => import("@/views/annotate/index.vue"),
            },
        ]
    }
];
