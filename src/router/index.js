import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from "@/plugins/firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Hangar",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Hangar.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/authenticate",
    name: "Authenticate",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Authenticate.vue"),
    meta: {},
  },
  {
    path: "/hangar",
    name: "Hangar",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Hangar.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/fleet",
    name: "Fleet",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Fleet.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/organisations",
    name: "Organisations",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Organisations.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta: {
      requiresAuth: false,
    },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  let currentUser = auth.currentUser;
  let requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next("/authenticate");
  } else {
    window.scrollTo(0, 0);
    next();
  }
});

export default router;
