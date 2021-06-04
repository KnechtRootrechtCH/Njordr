<template>
  <div class="root">
    <v-list-item link to="/profile" two-line v-if="authenticated">
      <v-list-item-avatar color="primary">
        <img v-if="photoUrl" :src="photoUrl" />
        <span v-if="!photoUrl && initials">{{ initials }}</span>
        <v-icon v-if="!photoUrl && !initials">mdi-account</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{ displayName }}</v-list-item-title>
        <v-list-item-subtitle v-if="!isAdmin">{{
          $t("Logged In")
        }}</v-list-item-subtitle>
        <v-list-item-subtitle v-if="isAdmin">{{
          $t("Administrator")
        }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider v-if="authenticated" />
    <v-list nav dense v-if="authenticated">
      <v-list-item link to="/hangar" v-if="authenticated" color="primary">
        <v-list-item-icon>
          <v-icon>mdi-warehouse</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ $t("Hangar") }}</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/pledges" v-if="authenticated" color="primary">
        <v-list-item-icon>
          <v-icon>mdi-clipboard-text</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ $t("Pledges") }}</v-list-item-title>
      </v-list-item>
      <v-list-group
        :value="organisationsExpanded"
        prepend-icon="mdi-handshake"
        v-if="authenticated"
        active-class=""
        color="primary"
      >
        <template v-slot:activator>
          <v-list-item-title>{{ $t("Organisations") }}</v-list-item-title>
        </template>
        <v-list-item
          v-for="organisation in organisations"
          link
          :to="`/organisation/${organisation.id}`"
          :key="organisation.id"
          color="primary"
        >
          <v-list-item-icon>
            <v-icon></v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ organisation.name }}</v-list-item-title>
          <v-list-item-icon>
            <v-icon></v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item link to="/organisations/create" color="primary">
          <v-list-item-icon>
            <v-icon></v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ $t("Create") }}</v-list-item-title>
          <v-list-item-icon>
            <v-icon>mdi-plus-circle-outline</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-group>
      <v-list-group
        :value="adminExpanded"
        prepend-icon="mdi-cogs"
        v-if="isAdmin"
        active-class=""
        color="primary"
      >
        <template v-slot:activator>
          <v-list-item-title>{{ $t("Admin") }}</v-list-item-title>
        </template>
        <v-list-item link to="/admin/masterdata/ship" color="primary">
          <v-list-item-icon>
            <v-icon></v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ $t("Masterdata: Ships") }}</v-list-item-title>
          <v-list-item-icon>
            <v-icon></v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-list-item link to="/admin/masterdata/vehicle" color="primary">
          <v-list-item-icon>
            <v-icon></v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ $t("Masterdata: Vehicles") }}</v-list-item-title>
          <v-list-item-icon>
            <v-icon></v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list-group>
    </v-list>
    <v-divider v-if="authenticated" />
    <v-list nav dense>
      <v-list-item @click="signOut" v-if="authenticated" color="primary">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ $t("Sign out") }}</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/authenticate" v-if="!authenticated">
        <v-list-item-icon>
          <v-icon>mdi-login</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ $t("Sign in") }}</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/about" color="primary">
        <v-list-item-icon>
          <v-icon>mdi-information-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ $t("About") }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { auth } from "../plugins/firebase";

export default {
  name: "NavigationDrawer",
  data: () => ({
    organisationsExpanded: true,
    adminExpanded: false,
  }),
  methods: {
    signOut() {
      auth.signOut();
      this.$router.replace("/authenticate");
    },
  },
  computed: {
    authenticated: (context) => context.$store.getters.isAuthenticated,
    user: (context) => context.$store.state.user,
    displayName: (context) => context.user.displayName || context.user.email,
    photoUrl: (context) => context.user.photoURL || null,
    isAdmin: (context) => context.$store.getters.isAdmin,
    initials() {
      if (this.user.displayName) {
        return this.displayName
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase();
      } else {
        return null;
      }
    },
    organisations: (context) =>
      Object.values(context.$store.state.organisations.list),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
