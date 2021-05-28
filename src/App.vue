<template>
  <div id="app">
    <v-app>
      <v-app-bar app clipped-left color="primary">
        <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
        <v-toolbar-title>{{ $t("Hangar Manager") }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <AppBarMenu v-if="authenticated" />
      </v-app-bar>

      <v-navigation-drawer
        app
        absolute
        left
        fixed
        v-model="drawer"
        class="content"
      >
        <Drawer v-bind:expand="drawer" />
      </v-navigation-drawer>

      <v-main>
        <v-container fluid>
          <router-view />
        </v-container>
      </v-main>

      <v-footer app> </v-footer>
    </v-app>
  </div>
</template>

<script>
import AppBarMenu from "@/components/AppBarMenu.vue";
import Drawer from "@/components/Drawer.vue";
export default {
  name: "App",
  components: {
    AppBarMenu,
    Drawer,
  },
  data: () => ({
    drawer: false,
  }),
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
  },
  computed: {
    authenticated: (context) => context.$store.getters.isAuthenticated,
  },
};
</script>

<style>

</style>
