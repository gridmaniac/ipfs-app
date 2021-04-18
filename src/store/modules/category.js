import axios from "axios";

const getDefaultState = () => {
  return {
    isLoading: false,
    categories: [],
  };
};

export default {
  actions: {
    async getCategories({ commit }) {
      commit("setLoading", true);
      const { data } = await axios.get("/api/categories");
      commit("setLoading", false);

      const { err } = data;
      if (err) throw new Error(err);

      commit("setCategories", data);
    },
  },
  mutations: {
    setLoading(state, value) {
      state.isLoading = value;
    },
    setCategories(state, value) {
      state.categories = value;
    },
  },
  state: getDefaultState(),
  getters: {
    isLoadingCategories: (state) => state.isLoading,
    categories: (state) => state.categories,
  },
};
