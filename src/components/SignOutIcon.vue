<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon @click="signOut" v-bind="attrs" v-on="on">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </template>
    <span>{{ $t("Sign out") }}</span>
  </v-tooltip>
</template>

<script>
import { auth } from "../plugins/firebase";

export default {
  name: "AppBar",
  methods: {
    signOut() {
      console.log("signing out", this);
      auth.signOut();
      this.$router.replace("/authenticate");
    },
  },
  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
