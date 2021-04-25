import axios from "axios";

const getDefaultState = () => {
  return {
    uploadResult: null,
    uploadImageResult: null,
    ideas: [],
    userIdeas: [],
    categoryIdeas: [],
    isLoading: false,
    isCategoryLoading: true,
    isIdeaLoading: false,
    idea: {},
  };
};

export default {
  actions: {
    async uploadFile({ commit }, payload) {
      const formData = new FormData();
      formData.append("file", payload);

      const { data } = await axios.post("/api/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { name, cid, err } = data;
      if (err) throw new Error(err);

      commit("setUploadResult", {
        name,
        cid,
      });
    },
    async uploadImage({ commit }, payload) {
      const formData = new FormData();
      formData.append("file", payload);

      const { data } = await axios.post("/api/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { name, cid, err } = data;
      if (err) throw new Error(err);

      commit("setUploadImageResult", {
        name,
        cid,
      });
    },
    async getIdeas({ commit }) {
      commit("setLoading", true);
      const { data } = await axios.get("/api/ideas");
      commit("setLoading", false);

      const { err } = data;
      if (err) throw new Error(err);

      commit("setIdeas", data);
    },
    async getIdeasByCategory({ commit }, payload) {
      const { id, search } = payload;
      commit("setCategoryLoading", true);
      const { data } = await axios.post(`/api/category/${id}/ideas`, {
        search,
      });
      commit("setCategoryLoading", false);

      const { err } = data;
      if (err) throw new Error(err);

      commit("setCategoryIdeas", data);
    },
    async getUserIdeas({ commit }) {
      commit("setLoading", true);
      const { data } = await axios.get("/api/user/ideas");
      commit("setLoading", false);

      const { err } = data;
      if (err) throw new Error(err);

      commit("setUserIdeas", data);
    },
    async getIdeaById({ commit }, id) {
      commit("setIdeaLoading", true);
      commit("setIdea", {});
      const { data } = await axios.get(`/api/ideas/${id}`);
      commit("setIdeaLoading", false);

      const { err } = data;
      if (err) throw new Error(err);

      commit("setIdea", data);
    },
    async createIdea({ state }, payload) {
      const { data } = await axios.post("/api/ideas", {
        ...payload,
        image: state.uploadImageResult?.cid,
        files: [{ ...state.uploadResult }],
      });

      const { err } = data;
      if (err) throw new Error(err);
    },
    async updateIdea({ commit }, { id, payload }) {
      commit("setIdeaLoading", true);
      const { data } = await axios.post(`/api/ideas/${id}`, payload);
      commit("setIdeaLoading", false);

      const { err } = data;
      if (err) throw new Error(err);
    },
    async getIdeaInteractables(_, id) {
      const { data } = await axios.get(`/api/ideas/${id}/interactables`);

      const { err } = data;
      if (err) throw new Error(err);

      return data;
    },
    async followUp(_, id) {
      const { data } = await axios.post(`/api/follow-ups`, {
        id,
      });

      const { err } = data;
      if (err) throw new Error(err);
    },
  },
  mutations: {
    setUploadResult(state, result) {
      state.uploadResult = result;
    },
    setUploadImageResult(state, result) {
      state.uploadImageResult = result;
    },
    setIdeas(state, value) {
      state.ideas = value;
    },
    setUserIdeas(state, value) {
      state.userIdeas = value;
    },
    setCategoryIdeas(state, value) {
      state.categoryIdeas = value;
    },
    setIdea(state, value) {
      state.idea = value;
    },
    setLoading(state, value) {
      state.isLoading = value;
    },
    setIdeaLoading(state, value) {
      state.isIdeaLoading = value;
    },
    setCategoryLoading(state, value) {
      state.isCategoryLoading = value;
    },
  },
  state: getDefaultState(),
  getters: {
    uploadResult: (state) => state.uploadResult,
    uploadImageResult: (state) => state.uploadImageResult,
    ideas: (state) => state.ideas,
    userIdeas: (state) => state.userIdeas,
    categoryIdeas: (state) => state.categoryIdeas,
    idea: (state) => state.idea,
    isLoadingIdeas: (state) => state.isLoading,
    isIdeaLoading: (state) => state.isIdeaLoading,
    isCategoryLoading: (state) => state.isCategoryLoading,
  },
};
