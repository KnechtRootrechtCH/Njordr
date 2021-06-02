import Vue from "vue";
import Vuex from "vuex";
import { db } from "@/plugins/firebase";

Vue.use(Vuex);

let organisations = {
  state: {
    list: {},
    fleet: {},
    profiles: {},
    updateHack: 1,
    subscriptions: [],
  },
  mutations: {
    updatOrgInfo: (state, payload) =>
      Vue.set(state.list, payload.id, payload),
    removeOrgInfo: (state, key) => Vue.delete(state.list, key),
    updateOrgFleetItem: (state, payload) => Vue.set(state.fleet, payload.key, payload),
    removeOrgFleetItem: (state, payload) => Vue.delete(state.fleet, payload.key),
    clearOrgFleet: (state) => state.fleet = {},
    seOrganisationMembertProfile: (state, payload) =>
      Vue.set(state.profiles, payload.uid, payload),
    registerSubscription(state, payload) {
      state.subscriptions.push(payload);
    },
    unsubscribeOrgFleet(state) {
      state.subscriptions.forEach((subscription) => {
        subscription();
      });
      state.subscriptions = [];
    }
  },
  actions: {
    loadOrgList: (context) => {
      if (!context.rootState.profile || !context.rootState.profile.organisations) {
        return;
      }

      context.rootState.profile.organisations.forEach((orgKey) => {
        db.collection("organisations")
        .doc(orgKey)
        .onSnapshot((doc) => {
          let data = doc.data();
          if (data.members && data.members.includes(context.rootState.user.uid)) {
            context.commit("updatOrgInfo", data);
            context.dispatch("loadOrganisationMemberProfiles", data.id);
          }
          else {
            context.commit("removeOrgInfo",doc.id);
          }
        },
        (error) => {
          context.dispatch("error", {
            message: "Error loading org data!",
            info: error,
          });
        });
      });
    },
    loadOrganisationMemberProfiles: (context, orgKey) => {
      let info = context.state.list[orgKey]
      if (!info || !info.members){
        return;
      }

      info.members.forEach((memberId) => {
        db.collection("users")
        .doc(memberId)
        .onSnapshot((doc) => {
          let data = doc.data();
          if (data.displayName) {
              data.initials = data.displayName.split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase();
          }
          context.commit("seOrganisationMembertProfile", data);
        },
        (error) => {
          context.dispatch("error", {
            message: "Error loading profile data!",
            info: error,
          });
        });
       });
    },
    loadOrgFleet: (context, orgKey) => {
      let info = context.state.list[orgKey]
      if (!info || !info.members){
        return;
      }
      context.commit("clearOrgFleet");
      context.commit("unsubscribeOrgFleet");

      console.log("loading org fleet", info);
      info.members.forEach((memberId) => {
        let subscription = db.collection("users")
          .doc(memberId)
          .collection("hangar")
          .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
              let data = change.doc.data();
              data.ownerId = memberId;
              if (change.type === "added") {
                context.commit("updateOrgFleetItem", data);
              } else if (change.type === "modified") {
                context.commit("updateOrgFleetItem", data);
              } else if (change.type === "removed") {
                context.commit("removeOrgFleetItem", data.key);
              }
            });
          context.commit("registerSubscription", subscription);
        });
      });
    },
    clearOrgFleet: (context) => {
      context.commit("clearOrgFleet");
    }
  },
  getters: {
    organisationInfo: (state) => (key) => {
      return state.list[key];
    },
  },
  modules: {

  },
};

export { organisations };
