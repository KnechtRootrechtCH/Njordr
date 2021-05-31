<template>
  <div class="root">
    <v-container>
      <v-row>
        <v-col col="12">
          <v-toolbar flat color="transparent" class="toolbar">
            <v-toolbar-title>{{ $t("Hangar") }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn-toggle dense v-model="displayToggle">
              <v-btn><v-icon>mdi-view-list</v-icon></v-btn>
              <v-btn><v-icon>mdi-view-grid</v-icon></v-btn>
            </v-btn-toggle>
          </v-toolbar>
        </v-col>
      </v-row>
      <v-row v-if="itemCount == 0">
        <v-col col="12"> </v-col>
      </v-row>
      <ShipGrid v-if="displayToggle == 1" />
      <PledgeList v-if="displayToggle == 0" />
    </v-container>
  </div>
</template>

<script>
import ShipGrid from "@/components/ShipGrid.vue";
import PledgeList from "@/components/PledgeList.vue";

export default {
  name: "Hangar",
  data: () => ({
    displayToggle: 1,
  }),
  components: { ShipGrid, PledgeList },
  methods: {},
  computed: {
    list: (context) => context.$store.state.hangar.list,
    itemCount: (context) =>
      Object.keys(context.$store.state.hangar.list).length,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.toolbar {
  padding: 0;
}
</style>
