import { createStore } from "vuex";

export const store = createStore ({
  state() {
    return {
      spotifyAuthenticator: undefined,
      spotifyAPIHandler: undefined,
    }
  },
  mutations: {
    setState(state, data) {
      state[data.key] = data.value;
    }
  }
});