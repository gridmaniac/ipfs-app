import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/HomePage.vue";
import Inventors from "../views/Inventors.vue";
import Investors from "../views/Investors.vue";
import SignUp from "../views/SignUp.vue";
import SignIn from "../views/SignIn.vue";
import CreateIdea from "../views/CreateIdea.vue";
import PaymentDetails from "../views/PaymentDetails.vue";
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
