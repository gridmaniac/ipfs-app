import axios from "axios";

const getDefaultState = () => {
  return {
    role: "",
    token: localStorage.getItem("token") || "",
    credentials: null,
  };
};

export default {
  actions: {
    async verifyEmail(_, payload) {
      const { data } = await axios.post("/api/verify-email", {
        email: payload,
      });

      const { err } = data;
      if (err) throw new Error(err);
    },
    async signUpAsInvestor({ commit, state }, payload) {
      const { data } = await axios.post("/api/investors/register", {
        ...state.credentials,
        paymentDetails: payload,
      });

      const { token, err } = data;
      if (err) throw new Error(err);

      localStorage.setItem("token", token);
      axios.defaults.headers.common.Authorization = token;
      commit("setToken", token);
    },
  },
  mutations: {
    resetState(state) {
      localStorage.removeItem("token");
      Object.assign(state, getDefaultState());
    },
    setCredentials(state, credentials) {
      state.credentials = credentials;
    },
    setToken(state, token) {
      state.token = token;
    },
    clearToken(state) {
      state.token = null;
    },
  },
  state: getDefaultState(),
  getters: {
    isLoggedIn: (state) => !!state.token,
    hasCredentials: (state) => !!state.credentials,
  },
};
