import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import idea from "./modules/idea";
import followUp from "./modules/follow-up";
import category from "./modules/category";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    idea,
    category,
    followUp,
  },
});
