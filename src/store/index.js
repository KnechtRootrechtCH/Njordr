import Vue from "vue";
import Vuex from "vuex";
import { auth, db } from "../plugins/firebase";
import { alerts } from "./modules/alerts";
import { hangar } from "./modules/hangar";
import { pledges } from "./modules/pledges";
import { ships } from "./modules/ships";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    configuration: {},
    locale: "en",
    user: null,
    userInfo: null,
    isAdmin: false,
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
    setAdminInfo: (state, payload) => {
      state.isAdmin = payload != null && payload.isAdmin;
    },
  },
  actions: {
    loadUserInfo: (context) => {
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
        context.dispatch("loadAdminInfo");
        context.dispatch("loadConfiguration");
        context.dispatch("load");
      } else {
        context.commit("setUser", null);
        context.commit("setUserInfo", null);
        context.commit("setAdminInfo", null);
      }
    },
    loadAdminInfo: (context) => {
      db.collection("static")
        .doc("configuration")
        .collection("administrators")
        .doc(context.state.user.uid)
        .get()
        .then((doc) => {
          context.commit("setAdminInfo", doc.data());
        })
        .catch((error) => {
          context.error("Unable to load data from firebase", error);
          context.commit("setAdminInfo", null);
        });
    },
    loadConfiguration: (context) => {
      db.collection("static")
        .doc("configuration")
        .get()
        .then((doc) => {
          context.commit("setConfiguration", doc.data());
        })
        .catch((error) => {
          context.error("Unable to load data from firebase", error);
          context.commit("setAdminInfo", null);
        });
    },
  },
  getters: {
    isAuthenticated: (state) => state.user != null,
    isAdmin: (state) => state.user != null && state.isAdmin,
  },
  modules: {
    alerts: alerts,
    hangar: hangar,
    pledges: pledges,
    ships: ships,
  },
});
