<template>
  <div class="root">
    <v-container>
      <v-row>
        <v-col col="12">
          <v-toolbar flat color="transparent">
            <v-toolbar-title>{{ $t("Hangar") }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn-toggle dense v-model="displayToggle">
              <v-btn><v-icon>mdi-view-list</v-icon></v-btn>
              <v-btn><v-icon>mdi-view-grid</v-icon></v-btn>
            </v-btn-toggle>
          </v-toolbar>
        </v-col>
      </v-row>
      <v-row> </v-row>
      <v-row v-if="itemCount == 0">
        <v-col col="12"> </v-col>
      </v-row>
      <v-row v-if="itemCount > 0">
        <v-col col="12">
          <span>some stuff here</span>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Hangar",
  data: () => ({
    displayToggle: 1,
  }),
  components: {},
  methods: {},
  computed: {
    list: (context) => context.$store.state.hangar.list,
    isAdmin: (context) => context.$store.state.isAdmin,
    itemCount: (context) => (context.list ? context.list.length : 0),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
