<template>
  <div class="root">
    <v-container>
      <v-row>
        <v-col col="12">
          <v-toolbar flat color="transparent">
            <v-toolbar-title>{{ $t("Hangar") }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-item-group class="v-btn-toggle v-btn-toggle--dense">
              <ImportDialog />
            </v-item-group>
          </v-toolbar>
        </v-col>
      </v-row>
      <ShipGrid :list="orderedList"/>
    </v-container>
  </div>
</template>

<script>
import ShipGrid from "@/components/ShipGrid.vue";
import ImportDialog from "@/components/ImportDialog.vue";

export default {
  name: "Hangar",
  data: () => ({
  }),
  components: { ShipGrid, ImportDialog },
  methods: {},
  computed: {
    orderedList: (context) => context._.orderBy(context.list, "ship_code"),
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
