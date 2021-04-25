import axios from "axios";

const getDefaultState = () => {
  return {
    followUp: null,
    hasMessages: true,
    followUps: [],
    messages: [],
  };
};

export default {
  actions: {
    async getFollowUpById({ commit }, id) {
      const { data } = await axios.get(`/api/follow-ups/${id}`);

      const { hasMessages, followUp, err } = data;
      if (err) throw new Error(err);

      commit("setFollowUp", followUp);
      commit("setHasMessages", hasMessages);
    },
    async sendFirstMessage(_, payload) {
      const { data } = await axios.post("/api/messages", {
        ...payload,
      });

      const { err } = data;
      if (err) throw new Error(err);
    },
    async getFollowUps({ commit }) {
      const { data } = await axios.get("/api/follow-ups");

      const { err } = data;
      if (err) throw new Error(err);

      commit("setFollowUps", data);
    },
    async getMessages({ commit }, id) {
      const { data } = await axios.get(`/api/follow-ups/${id}/messages`);

      const { err } = data;
      if (err) throw new Error(err);

      commit("setMessages", data);
    },
    async sendMessage({ commit }, payload) {
      const { data } = await axios.post("/api/messages", {
        ...payload,
      });

      const { err } = data;
      if (err) throw new Error(err);

      commit("setMessages", data);
    },
  },
  mutations: {
    setFollowUp(state, value) {
      state.followUp = value;
    },
    setHasMessages(state, value) {
      state.hasMessages = value;
    },
    setFollowUps(state, value) {
      state.followUps = value;
    },
    setMessages(state, value) {
      state.messages = value;
    },
    addMessage(state, value) {
      state.messages = [...state.messages, value];
    },
  },
  state: getDefaultState(),
  getters: {
    followUp: (state) => state.followUp,
    hasMessages: (state) => state.hasMessages,
    followUps: (state) => state.followUps,
    messages: (state) => state.messages,
  },
};
