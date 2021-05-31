import Vue from "vue";
import Vuex from "vuex";
import { db } from "@/plugins/firebase";

Vue.use(Vuex);

let ships = {
  state: {
    list: {},
  },
  mutations: {
    updateShip: (state, payload) =>
      Vue.set(state.list, payload.id, payload.data),
  },
  actions: {
    load: (context) => {
      db.collection("masterdata_ships").onSnapshot(
        (snapshot) => {
          snapshot.forEach((doc) => {
            context.commit("updateShip", { data: doc.data(), id: doc.id });
          });
        },
        (error) => {
          context.dispatch("error", {
            message: "Error loading ships master data!",
            info: error,
          });
        }
      );
    },
    import: (context, payload) => {
      if (!context.getters.isAdmin) {
        return;
      }
      const batch = db.batch();
      payload.data.forEach((x) => {
        let current = context.state.list[x.ship_code];
        if (!current) {
          let ref = db.collection("masterdata_ships").doc(x.ship_code);
          batch.set(
            ref,
            {
              ship_code: x.ship_code,
              manufacturer_code: x.manufacturer_code,
              manufacturer_name: x.manufacturer_name,
              name: x.name,
              cost: 0,
              image: "",
            },
            {
              merge: true,
            }
          );
        }
      });
      batch
        .commit()
        .then(() => {
          console.log(`Successfully updated ships master data.`);
        })
        .catch((error) => {
          context.dispatch("error", {
            message: "Error updating ships master data!",
            info: error,
          });
        });
    },
  },
  getters: {},
  modules: {},
};

export { ships };
