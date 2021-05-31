import Vue from "vue";
import Vuex from "vuex";
import { db } from "@/plugins/firebase";

Vue.use(Vuex);

let hangar = {
  state: {
    list: {},
  },
  mutations: {
    updateHangarItem: (state, payload) =>
      Vue.set(state.list, payload.key, payload),
  },
  actions: {
    load: (context) => {
      db.collection("users")
        .doc(context.rootState.user.uid)
        .collection("hangar")
        .onSnapshot(
          (snapshot) => {
            snapshot.forEach((doc) => {
              if (doc.data().key) {
                context.commit("updateHangarItem", doc.data());
              }
            });
          },
          (error) => {
            context.dispatch("error", {
              message: "Error loading hangar data!",
              info: error,
            });
          }
        );
    },
    clear: (context) => {
      const batch = db.batch();
      context.state.list.forEach((x) => {
        batch.delete(x.ref);
      });
      batch.commit();
    },
    import: (context, payload) => {
      const batch = db.batch();
      payload.data.forEach((x) => {
        x.key = `${x.pledge_id}:${x.ship_code}`;
        let ref = db
          .collection("users")
          .doc(context.rootState.user.uid)
          .collection("hangar")
          .doc(x.key);
        batch.set(ref, x, {
          merge: true,
        });
      });
      batch
        .commit()
        .then(() => {
          context.dispatch("success", {
            message: `Successfully imported ${payload.data.length} hangar items.`,
          });
        })
        .catch((error) => {
          context.dispatch("error", {
            message: "Error importing hangar items!",
            info: error,
          });
        });
    },
  },
  getters: {
    hangarItem: (state) => (key) => {
      return state.list.find((x) => x.key == key);
    },
  },
  modules: {},
};

export { hangar };
