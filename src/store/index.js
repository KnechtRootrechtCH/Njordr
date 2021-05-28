import Vue from "vue";
import Vuex from "vuex";
import { auth } from "../plugins/firebase";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    configuration: {},
    locale: "en",
    user: null,
    userInfo: null,
  },
  mutations: {
    setConfiguration: (state, payload) => {
      state.configuration = payload;
    },
    setLocale: (state, payload) => {
      state.locale = payload;
    },
    setUser: (state, payload) => {
      state.user = payload;
    },
    setUserInfo: (state, payload) => {
      state.userInfo = payload;
    },
  },
  actions: {
    getUserInfo: (context) => {
      context.commit("setLocale", navigator.language.trim().substring(0, 2));
      if (auth && auth.currentUser) {
        let userInfo = {};
        userInfo.userAgent = window.navigator.userAgent;
        let userAgent = userInfo.userAgent.toLowerCase();
        userInfo.isAndoid = userAgent.indexOf("android") >= 0;
        userInfo.isChrome = userAgent.indexOf("chrome") >= 0;
        userInfo.isIE =
          userAgent.indexOf("msie ") >= 0 || userAgent.indexOf("trident") >= 0;

        context.commit("setUser", auth.currentUser);
        context.commit("setUserInfo", userInfo);
      } else {
        context.commit("setUser", null);
        context.commit("setUserInfo", null);
      }
    },
    getConfiguration: (context) => {
      context.commit("setConfiguration", navigator);
    },
  },
  getters: {
    isAuthenticated: (state) => state.user != null,
  },
  modules: {},
});
