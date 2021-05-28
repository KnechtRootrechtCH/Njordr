<template>
  <v-menu left bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item>
        <v-list-item-title @click="signOut">
          {{ $t("Sign out") }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
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
