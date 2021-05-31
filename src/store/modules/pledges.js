import Vue from "vue";
import Vuex from "vuex";
import { db } from "@/plugins/firebase";

Vue.use(Vuex);

let pledges = {
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
        .collection("pledges")
        .onSnapshot(
          (snapshot) => {
            context.commit("list", snapshot.docs, context.rootState.user.uid);
          },
          (error) => {
            context.dispatch("error", {
              message: "Error loading pledge data!",
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
      let pledges = new Map();
      payload.data.forEach((x) => {
        let pledge = {
          key: x.pledge_id,
          name: x.pledge_name,
          date: x.pledge_date,
          cost: x.pledge_cost,
          lti: x.lti,
          warbond: x.warbond,
        };
        pledges.set(pledge.key, pledge);
      });

      const batch = db.batch();
      pledges.forEach((x) => {
        let ref = db
          .collection("users")
          .doc(context.rootState.user.uid)
          .collection("pledges")
          .doc(x.key);
        batch.set(ref, x, {
          merge: true,
        });
      });
      batch
        .commit()
        .then(() => {
          //context.dispatch("success", { message: `Successfully imported ${pledges.size} pledges.`});
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
    pledge: (state) => (key) => {
      return state.list.find((x) => x.key == key);
    },
  },
  modules: {},
};

export { pledges };
