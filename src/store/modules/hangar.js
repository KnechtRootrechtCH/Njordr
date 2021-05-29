import Vue from "vue";
import Vuex from "vuex";
import { db } from "@/plugins/firebase";

Vue.use(Vuex);

let hangar = {
  state: {
    list: [],
  },
  mutations: {
    list: (state, payload) => (state.list = payload ?? [0]),
  },
  actions: {
    load: (context) => {
      db.collection("users")
        .doc(context.rootState.user.uid)
        .collection("hangar")
        .onSnapshot(
          (snapshot) => {
            context.commit("list", snapshot.docs, context.rootState.user.uid);
          },
          (error) => {
            console.error("", error);
            context.commit("error", { message: "Error loading hangar data!", info: error});
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
          context.commit("success", { message: `Successfully imported ${payload.data.length} hangar items.`, info: payload.data}, { root: true});
        })
        .catch((error) => {
          context.commit("error", { message: "Error importing hangar items!", info: error});
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
