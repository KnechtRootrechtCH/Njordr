<template>
  <div class="root">
    <v-list-item two-line v-if="authenticated">
      <v-list-item-avatar color="accent">
        <img v-if="photoUrl" :src="photoUrl" />
        <span v-if="!photoUrl && initials">{{initials}}</span>
        <v-icon  v-if="!photoUrl && !initials">mdi-account</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>{{ displayName }}</v-list-item-title>
        <v-list-item-subtitle>{{$t("Logged In") }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider v-if="authenticated" />
    <v-list nav dense>
      <v-list-item link to="./profile" v-if="authenticated">
        <v-list-item-icon>
          <v-icon>mdi-account</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ $t("Profile") }}</v-list-item-title>
      </v-list-item>
      <v-list-item link to="./hangar" v-if="authenticated">
        <v-list-item-icon>
          <v-icon>mdi-warehouse</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ $t("Hangar") }}</v-list-item-title>
      </v-list-item>
      <v-list-item link to="./orgainsations" v-if="authenticated">
        <v-list-item-icon>
          <v-icon>mdi-account-group</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ $t("Organisations") }}</v-list-item-title>
      </v-list-item>
      <v-list-item link to="./authenticate" v-if="!authenticated">
        <v-list-item-icon>
          <v-icon>mdi-login</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ $t("Sign in") }}</v-list-item-title>
      </v-list-item>
      <v-list-item link to="/about" exact>
        <v-list-item-icon>
          <v-icon>mdi-information-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ $t("About") }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "NavigationDrawer",
  computed: {
    authenticated: (context) => context.$store.getters.isAuthenticated,
    user: (context) => context.$store.state.user,
    displayName: (context) => context.user.displayName || context.user.email,
    photoUrl: (context) => context.user.photoURL || null,
    initials() {
      if (this.user.displayName) {
        return this.displayName.split(' ').map((n)=>n[0]).join("").toUpperCase();
      } else {
        return null;
      }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.root {
  margin: 56px 0 0;
}
</style>
