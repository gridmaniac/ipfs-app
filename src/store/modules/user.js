import axios from "axios";

const getDefaultState = () => {
  return {
    role: "",
    token: localStorage.getItem("token") || "",
    credentials: null,
    profile: {},
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
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      commit("setToken", token);
    },
    async signUpAsInventor({ commit, state, getters }, payload) {
      const { data } = await axios.post("/api/inventors/register", {
        ...state.credentials,
        idea: {
          ...payload,
          files: [{ ...getters.uploadResult }],
        },
      });

      const { token, err } = data;
      if (err) throw new Error(err);

      localStorage.setItem("token", token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      commit("setToken", token);
    },
    async auth({ commit }, payload) {
      const { data } = await axios.post("/api/auth", {
        ...payload,
      });

      const { token, err } = data;
      if (err) throw new Error(err);

      localStorage.setItem("token", token);
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
      commit("setToken", token);
    },
    async getProfile({ commit, dispatch }) {
      const { data } = await axios.get("/api/profile");

      const { err } = data;
      if (err) throw new Error(err);

      commit("setProfile", data);
      dispatch("getIdeas");
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
    setProfile(state, profile) {
      state.profile = profile;
    },
  },
  state: getDefaultState(),
  getters: {
    isLoggedIn: (state) => !!state.token,
    hasCredentials: (state) => !!state.credentials,
    isInventor: (state) => state.profile?.role === "inventor",
    paymentDetails: (state) => state.profile?.paymentDetails,
  },
};
