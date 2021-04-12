import axios from "axios";

const getDefaultState = () => {
  return {
    uploadResult: null,
    ideas: [],
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
    async getIdeas({ commit }) {
      const { data } = await axios.get("/api/ideas");

      const { err } = data;
      if (err) throw new Error(err);

      commit("setIdeas", data);
    },
  },
  mutations: {
    setUploadResult(state, result) {
      state.uploadResult = result;
    },
    setIdeas(state, ideas) {
      state.ideas = ideas;
    },
  },
  state: getDefaultState(),
  getters: {
    uploadResult: (state) => state.uploadResult,
    ideas: (state) => state.ideas,
  },
};
