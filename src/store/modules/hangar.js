import Vue from "vue";
import Vuex from "vuex";
import { db } from "@/plugins/firebase";

Vue.use(Vuex);

let hangar = {
  state: {
    list: {},
  },
  mutations: {
    clearHangar: (state) => {
      state.list = {};
    },
    updateHangarItem: (state, payload) =>
      Vue.set(state.list, payload.key, payload),
    removeHangarItem: (state, payload) => Vue.delete(state.list, payload.key),
  },
  actions: {
    load: (context) => {
      db.collection("users")
        .doc(context.rootState.user.uid)
        .collection("hangar")
        .onSnapshot(
          (snapshot) => {
            snapshot.docChanges().forEach((change) => {
              if (change.type === "added") {
                context.commit("updateHangarItem", change.doc.data());
              } else if (change.type === "modified") {
                context.commit("updateHangarItem", change.doc.data());
              } else if (change.type === "removed") {
                context.commit("removeHangarItem", change.doc.data());
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
    import: (context, payload) => {
      const batch = db.batch();

      if (payload.type == "replace") {
        Object.keys(context.state.list).forEach((key) => {
          console.log(key, "delete");
          let ref = db
            .collection("users")
            .doc(context.rootState.user.uid)
            .collection("hangar")
            .doc(key);
          batch.delete(ref);
        });
      }

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
    getShipsByPledgeId: (state) => (pledgeId) =>
      Object.values(state.list).filter((x) => x.pledge_id == pledgeId),
  },
  modules: {},
};

export { hangar };
