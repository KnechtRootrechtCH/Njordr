import Vue from "vue";
import Vuex from "vuex";
import { db } from "@/plugins/firebase";

Vue.use(Vuex);

let masterdata = {
  state: {
    list: {},
  },
  mutations: {
    updateMasterdataItem: (state, payload) =>
      Vue.set(state.list, payload.code, payload),
    removeMasterdataItem: (state, key) => Vue.delete(state.list, key),
  },
  actions: {
    load: (context) => {
      db.collection("masterdata_ships").onSnapshot(
        (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === "added") {
              context.commit("updateMasterdataItem", change.doc.data());
            } else if (change.type === "modified") {
              context.commit("updateMasterdataItem", change.doc.data());
            } else if (change.type === "removed") {
              context.commit("removeMasterdataItem", change.doc.data());
            }
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
      const batch = db.batch();
      payload.data.forEach((x) => {
        let current = context.state.list[x.ship_code];
        if (!current) {
          let ref = db.collection("masterdata_ships").doc(x.ship_code);
          batch.set(
            ref,
            {
              code: x.ship_code,
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
    saveMasterdataItem: (context, payload) => {
      if (!payload.code) {
        return;
      }

      db.collection("masterdata_ships")
        .doc(payload.code)
        .set(payload, { merge: true })
        .catch((error) => {
          context.error("Unable to save masterdata item to firebase", error);
        });
    },
  },
  getters: {},
  modules: {},
};

export { masterdata };
