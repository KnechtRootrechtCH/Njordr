import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import { auth } from "@/plugins/firebase";
import vuetify from "@/plugins/vuetify";
import i18n from "@/plugins/i18n";
import VueLodash from "vue-lodash";
import lodash from "lodash";
import moment from "vue-moment";

Vue.use(moment);
Vue.use(VueLodash, { name: "custom", lodash: lodash });

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
