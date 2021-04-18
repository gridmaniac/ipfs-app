import axios from "axios";

const getDefaultState = () => {
  return {
    uploadResult: null,
    uploadImageResult: null,
    userIdeas: [],
    isLoading: false,
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
    async getUserIdeas({ commit }) {
      commit("setLoading", true);
      const { data } = await axios.get("/api/user/ideas");
      commit("setLoading", false);

      const { err } = data;
      if (err) throw new Error(err);

      commit("setUserIdeas", data);
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
    async updateIdea(_, id, payload) {
      const { data } = await axios.post(`/api/ideas/${id}`, payload);

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
    setUserIdeas(state, value) {
      state.userIdeas = value;
    },
    setLoading(state, value) {
      state.isLoading = value;
    },
  },
  state: getDefaultState(),
  getters: {
    uploadResult: (state) => state.uploadResult,
    uploadImageResult: (state) => state.uploadImageResult,
    userIdeas: (state) => state.userIdeas,
    isLoadingIdeas: (state) => state.isLoading,
  },
};
