import Vue from "vue";
import VueRouter from "vue-router";
import { auth } from "@/plugins/firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
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
    path: "/pledges",
    name: "Pledges",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Pledges.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Profile.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/organisation/:id",
    name: "Organisation",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Organisation.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/organisations/create",
    name: "OrganisationCreate",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/OrganisationCreate.vue"),
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
  {
    path: "/admin/masterdata/:type",
    name: "Masterdata",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Masterdata.vue"),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  let currentUser = auth.currentUser;
  let requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  //let requiresAdmin = to.matched.some((record) => record.meta.requiresAdmin);

  if (requiresAuth && !currentUser) {
    next("/authenticate");
  } else {
    window.scrollTo(0, 0);
    next();
  }
});

export default router;
