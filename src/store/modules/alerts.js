import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let alerts = {
  state: {
    list: {},
  },
  mutations: {
    clearAlerts: (state) => {
      state.alerts = {};
    },
    removeAlert: (state, key) => {
      Vue.delete(state.list, key);
    },
    success: (state, payload) => {
      Vue.set(state.list, payload.key, payload);
    },
    info: (state, payload) => {
      Vue.set(state.list, payload.key, payload);
    },
    warn: (state, payload) => {
      Vue.set(state.list, payload.key, payload);
      console.warn(payload);
    },
    error: (state, payload) => {
      payload.type = "error";
      payload.timestamp = Date.now();
      payload.key = `${payload.type}:${payload.timestamp}`;
      Vue.set(state.list, payload.key, payload);
      console.error(payload);
    },
  },
  actions: {
    success: (context, payload) => {
      payload.type = "success";
      payload.timestamp = Date.now();
      payload.key = `${payload.type}:${payload.timestamp}`;
      context.commit("success", payload);
      setTimeout(() => {
        context.commit("removeAlert", payload.key);
      }, 10 * 1000);
    },
    info: (context, payload) => {
      payload.type = "info";
      payload.timestamp = Date.now();
      payload.key = `${payload.type}:${payload.timestamp}`;
      context.commit("info", payload);
      setTimeout(() => {
        context.commit("removeAlert", payload.key);
      }, 10 * 1000);
    },
    warning: (context, payload) => {
      payload.type = "warning";
      payload.timestamp = Date.now();
      payload.key = `${payload.type}:${payload.timestamp}`;
      context.commit("warn", payload);
      console.warn(payload);
      setTimeout(() => {
        context.commit("removeAlert", payload.key);
      }, 10 * 1000);
    },
    error: (context, payload) => {
      payload.type = "error";
      payload.timestamp = Date.now();
      payload.key = `${payload.type}:${payload.timestamp}`;
      context.commit("error", payload);
      console.error(payload);
      setTimeout(() => {
        context.commit("removeAlert", payload.key);
      }, 10 * 1000);
    },
  },
  getters: {
    alerts: (state) => {
      let array = [];
      for (let key in state.list) {
        let item = state.list[key];
        array.push(item);
      }
      return array;
    },
  },
  modules: {},
};

export { alerts };
