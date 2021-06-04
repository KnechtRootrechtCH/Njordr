import Vue from "vue";
import Vuex from "vuex";
import { db } from "@/plugins/firebase";

Vue.use(Vuex);

let notes = {
  state: {
    list: {},
  },
  mutations: {
    clearNotes: (state) => {
      state.list = {};
    },
    updateNotes: (state, payload) => Vue.set(state.list, payload.code, payload),
    removeNotes: (state, payload) => Vue.delete(state.list, payload.code),
  },
  actions: {
    load: (context) => {
      db.collection("users")
        .doc(context.rootState.user.uid)
        .collection("notes")
        .onSnapshot(
          (snapshot) => {
            snapshot.docChanges().forEach((change) => {
              if (change.type === "added") {
                context.commit("updateNotes", change.doc.data());
              } else if (change.type === "modified") {
                context.commit("updateNotes", change.doc.data());
              } else if (change.type === "removed") {
                context.commit("removeNotes", change.doc.data());
              }
            });
          },
          (error) => {
            context.dispatch("error", {
              message: "Error loading notes!",
              info: error,
            });
          }
        );
    },
    saveNotes: (context, payload) => {
      if (!payload.code) {
        return;
      }
      db.collection("users")
        .doc(context.rootState.user.uid)
        .collection("notes")
        .doc(payload.code)
        .set(payload, { merge: true })
        .catch((error) => {
          context.error("Unable to save notes to firebase", error);
        });
    },
  },
  getters: {},
  modules: {},
};

export { notes };
