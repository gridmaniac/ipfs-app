import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import HomePage from "../views/HomePage.vue";
import Inventors from "../views/Inventors.vue";
import Investors from "../views/Investors.vue";
import SignUp from "../views/SignUp.vue";
import SignIn from "../views/SignIn.vue";
import CreateIdea from "../views/CreateIdea.vue";
import PaymentDetails from "../views/PaymentDetails.vue";
import Categories from "../views/Categories.vue";
import Messages from "../views/Messages.vue";
import Profile from "../views/Profile.vue";
import Idea from "../views/Idea.vue";
import FollowUp from "../views/FollowUp.vue";
import goTo from "vuetify/es5/services/goto";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
    meta: {
      title: "IPFS App",
      requiresNoAuth: true,
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
    path: "/investors/signup",
    name: "Sign up as investor",
    component: SignUp,
    props: { role: "investor" },
    meta: {
      title: "Sign up - IPFS App",
    },
  },
  {
    path: "/inventors/signup",
    name: "Sign up as inventor",
    component: SignUp,
    props: { role: "inventor" },
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
  {
    path: "/create",
    name: "Create idea",
    component: CreateIdea,
    meta: {
      title: "Create idea - IPFS App",
      requiresAuth: true,
    },
  },
  {
    path: "/payment",
    name: "Payment details",
    component: PaymentDetails,
    meta: {
      title: "Payment details - IPFS App",
    },
  },
  {
    path: "/categories",
    name: "Categories",
    component: Categories,
    meta: {
      title: "Categories - IPFS App",
      requiresAuth: true,
    },
  },
  {
    path: "/messages",
    name: "Messages",
    component: Messages,
    meta: {
      title: "Messages - IPFS App",
      requiresAuth: true,
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      title: "Profile - IPFS App",
      requiresAuth: true,
    },
  },
  {
    path: "/ideas/:id",
    name: "Idea",
    component: Idea,
    meta: {
      title: "Idea - IPFS App",
      requiresAuth: true,
    },
  },
  {
    path: "/follow-up/:id",
    name: "FollowUp",
    component: FollowUp,
    meta: {
      title: "Follow-up - IPFS App",
      requiresAuth: true,
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

const DEFAULT_TITLE = "IPFS App";
router.afterEach((to) => {
  Vue.nextTick(() => {
    document.title = to.meta.title || DEFAULT_TITLE;
  });
});

router.beforeEach((to, _, next) => {
  let redirect = null;
  if (to.matched.some((x) => x.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) redirect = "/";
  }

  if (to.matched.some((x) => x.meta.requiresNoAuth)) {
    if (store.getters.isLoggedIn) redirect = "/categories";
  }

  if (redirect) return next(redirect);
  next();
});

export default router;
