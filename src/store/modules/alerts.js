import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let alerts = {
  state: {
    list: new Map()
  },
  mutations: {
    clearAlerts: (state) => {
      state.alerts = new Map();
    },
    removeAlert: (state, payload) => {
      if (state.list.has(payload)) {
        state.list.delete(payload);
      }
    },
    success: (state, payload) => {
      payload.type = "success";
      payload.key = `${payload.type}:${Date.now()}`;
      state.list.set(payload.key, payload);
    },
    info: (state, payload) => {
      payload.type = "info";
      payload.key = `${payload.type}:${Date.now()}`;
      state.list.set(payload.key, payload);
    },
    warn: (state, payload) => {
      payload.type = "warn";
      payload.key = `${payload.type}:${Date.now()}`;
      state.list.set(payload.key, payload);
    },
    error: (state, payload) => {
      payload.type = "error";
      payload.key = `${payload.type}:${Date.now()}`;
      state.list.set(payload.key, payload);
    },
  },
  actions: {
  },
  getters: {
  },
  modules: {},
};

export { alerts };
