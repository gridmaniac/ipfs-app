import axios from "axios";

const getDefaultState = () => {
  return {
    role: "",
    token: localStorage.getItem("token") || "",
    credentials: null,
    profile: {},
    investor: {},
    isLoading: true,
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
    async signUpAsInventor({ commit, state }) {
      const { data } = await axios.post("/api/inventors/register", {
        ...state.credentials,
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
    async getProfile({ commit }) {
      commit("setIsLoading", true);
      const { data } = await axios.get("/api/profile");
      commit("setIsLoading", false);

      const { err } = data;
      if (err) throw new Error(err);

      commit("setProfile", data);
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
    setProfile(state, value) {
      state.profile = value;
    },
    setIsLoading(state, value) {
      state.isLoading = value;
    },
  },
  state: getDefaultState(),
  getters: {
    isLoggedIn: (state) => !!state.token,
    hasCredentials: (state) => !!state.credentials,
    isInventor: (state) => state.profile?.role === "inventor",
    paymentDetails: (state) => state.profile?.paymentDetails,
    firstName: (state) => state.profile?.firstName,
    lastName: (state) => state.profile?.lastName,
    isLoadingProfile: (state) => state.isLoading,
    investor: (state) => state.investor,
  },
};
