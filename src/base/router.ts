import { createRouter, createWebHistory, Router } from "vue-router";

const routes = [
  {
    name: "Home",
    path: "/",
    component: () => import("../pages/home/Home.vue"),
  },
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
