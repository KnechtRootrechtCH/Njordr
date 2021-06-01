import Vue from "vue";
import Vuex from "vuex";
import { db } from "@/plugins/firebase";

Vue.use(Vuex);

let pledges = {
  state: {
    list: {},
  },
  mutations: {
    clearPledgeList: (state) => {
      state.list = {};
    },
    updatePledge: (state, payload) => Vue.set(state.list, payload.key, payload),
    removePledge: (state, payload) => Vue.delete(state.list, payload.key),
    updatePledgeContent(state, payload) {
      let pledge = state.list[payload.pledge_id];
      if (!pledge["ships"]) {
        pledge["ships"] = [payload];
      } else {
        pledge["ships"].push(payload);
      }
      Vue.set(state.list, payload.pledge_id, pledge);
    },
  },
  actions: {
    load: (context) => {
      db.collection("users")
        .doc(context.rootState.user.uid)
        .collection("pledges")
        .orderBy("cost", "desc")
        .onSnapshot(
          (snapshot) => {
            snapshot.docChanges().forEach((change) => {
              if (change.type === "added") {
                context.commit("updatePledge", change.doc.data());
              } else if (change.type === "modified") {
                context.commit("updatePledge", change.doc.data());
              } else if (change.type === "removed") {
                context.commit("removePledge", change.doc.data());
              }
            });
          },
          (error) => {
            context.dispatch("error", {
              message: "Error loading pledge data!",
              info: error,
            });
          }
        );
    },
    loadPledgeContent: (context, pledgeId) => {
      db.collection("users")
        .doc(context.rootState.user.uid)
        .collection("hangar")
        .where("pledge_id", "==", pledgeId)
        .onSnapshot(
          (snapshot) => {
            snapshot.forEach((doc) => {
              if (doc.data().key) {
                context.commit("updatePledgeContent", doc.data());
              }
            });
          },
          (error) => {
            context.dispatch("error", {
              message: "Error loading pledge contents!",
              info: error,
            });
          }
        );
    },
    import: (context, payload) => {
      const batch = db.batch();

      let pledges = new Map();
      payload.data.forEach((x) => {
        let cost = Number(x.pledge_cost.replace(/[^0-9.-]+/g, ""));
        let pledge = {
          key: x.pledge_id,
          name: x.pledge_name,
          date: x.pledge_date,
          cost: cost,
          lti: x.lti,
          warbond: x.warbond,
        };
        pledges.set(pledge.key, pledge);
      });

      if (payload.type == "replace") {
        Object.keys(context.state.list).forEach((key) => {
          let ref = db
            .collection("users")
            .doc(context.rootState.user.uid)
            .collection("pledges")
            .doc(key);
          batch.delete(ref);
        });
      }

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
  getters: {},
  modules: {},
};

export { pledges };
