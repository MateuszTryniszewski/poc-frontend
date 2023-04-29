import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import { canSeeUser, authenticated, canSeeUsers } from "@/middleware";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: true },

    },
    {
      path: "/dashboard",
      name: "dashboard",
      meta: { requiresAuth: true },
      component: () =>
        import(/* webpackChunkName: "Dashboard" */ "@/components/Dashboard.vue"),
    },
    {
      path: "/tracker",
      name: "tracker",
      meta: { requiresAuth: true },
      component: () =>
        import(/* webpackChunkName: "tracker" */ "@/views/Tracker.vue"),
    },
    {
      path: "/planer",
      name: "planer",
      meta: { requiresAuth: true },
      component: () =>
        import(/* webpackChunkName: "planer" */ "@/views/Planer.vue"),
    },

    {
      path: "/login",
      name: "login",
      meta: { requiresAuth: false },
      component: () =>
        import(/* webpackChunkName: "Login" */ "@/views/Login.vue"),
    },
    {
      path: "/register",
      name: "register",
      meta: { requiresAuth: false },
      component: () =>
        import(/* webpackChunkName: "Register" */ "@/views/Register.vue"),
    },
    {
      path: "/forgot-password",
      name: "forgotPassword",
      meta: { requiresAuth: false },
      component: () =>
        import(
          /* webpackChunkName: "ForgotPassword" */ "@/views/ForgotPassword.vue"
        ),
    },
    {
      path: "/password-reset/:token",
      name: "passwordReset",
      meta: { requiresAuth: false },
      component: () =>
        import(
          /* webpackChunkName: "PasswordReset" */ "@/views/PasswordReset.vue"
        ),
    },
    {
      path: "/404",
      name: "notFound",
      component: () =>
        import(/* webpackChunkName: "NotFound" */ "@/views/NotFound.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: () => {
        // catch all redirect to 404
        return { name: "notFound" };
      },
    },
  ],
});

// use middleware to check auth
router.beforeEach(authenticated);

export default router
