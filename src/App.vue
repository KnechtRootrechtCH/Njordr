<template>
  <div id="app">
    <v-app>
      <span class="bg"></span>
      <v-app-bar app clipped-left color="dark">
        <!--<template v-slot:img="{ props }">
          <v-img
            v-bind="props"
            gradient="to top right, rgba(255,193,7,.5), rgba(25,25,25,.7)"
          ></v-img>
        </template>-->
        <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
        <v-toolbar-title>{{ $t("Hangar Manager") }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar>

      <v-navigation-drawer
        app
        absolute
        left
        fixed
        v-model="drawer"
        class="content"
        color="rgba(50, 50, 50, 0.6)"
      >
        <Drawer v-bind:expand="drawer" />
      </v-navigation-drawer>

      <v-main>
        <Alerts />
        <v-container fluid>
          <router-view />
        </v-container>
      </v-main>

      <!--<v-footer app> </v-footer>-->
    </v-app>
  </div>
</template>

<script>
import Alerts from "@/components/Alerts.vue";
import Drawer from "@/components/Drawer.vue";
export default {
  name: "App",
  components: {
    Alerts,
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
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: url("./assets/header_background.png") no-repeat center center;
  background-color: rgba(100, 100, 100, 0.6);
  background-blend-mode: saturation;
  background-size: cover;
}
</style>
