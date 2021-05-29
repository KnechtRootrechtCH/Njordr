import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import { auth } from "@/plugins/firebase";
import vuetify from "@/plugins/vuetify";
import i18n from "@/plugins/i18n";

Vue.config.productionTip = false;

let app;
auth.onAuthStateChanged(() => {
  store.dispatch("loadUserInfo");
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      i18n,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
