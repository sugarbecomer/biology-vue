import { createRouter, createWebHistory, Router } from "vue-router";
import { routes } from "./routes.ts";

const router: Router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
