import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/HomePage.vue";
import Inventors from "../views/Inventors.vue";
import Investors from "../views/Investors.vue";
import SignUp from "../views/SignUp.vue";
import SignIn from "../views/SignIn.vue";
import goTo from "vuetify/es5/services/goto";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
    meta: {
      title: "IPFS App",
    },
  },
  {
    path: "/inventors",
    name: "Inventors",
    component: Inventors,
    meta: {
      title: "Inventors - IPFS App",
    },
  },
  {
    path: "/investors",
    name: "Investors",
    component: Investors,
    meta: {
      title: "Investors - IPFS App",
    },
  },
  {
    path: "/signup",
    name: "Sign up",
    component: SignUp,
    meta: {
      title: "Sign up - IPFS App",
    },
  },
  {
    path: "/signin",
    name: "Sign in",
    component: SignIn,
    meta: {
      title: "Sign in - IPFS App",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    let scrollTo = 0;

    if (to.hash) {
      scrollTo = to.hash;
    } else if (savedPosition) {
      scrollTo = savedPosition.y;
    }

    return goTo(scrollTo);
  },
  routes,
});

export default router;
