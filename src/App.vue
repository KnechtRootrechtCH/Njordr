<template>
  <div id="app">
    <v-app>
      <v-app-bar app clipped-left color="primary">
        <v-app-bar-nav-icon @click.stop="toggleDrawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Page title</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu left bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="n in 5" :key="n" @click="() => {}">
              <v-list-item-title>Option {{ n }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
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
import Drawer from "@/components/Drawer.vue";
export default {
  name: "App",
  components: {
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
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
