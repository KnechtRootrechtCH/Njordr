<template>
  <div class="root">
    <v-container>
      <v-row>
        <v-col col="12">
          <v-toolbar flat color="transparent">
            <v-toolbar-title>{{ $t("Pledges") }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-item-group class="v-btn-toggle v-btn-toggle--dense">
              <ImportDialog />
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn v-bind="attrs" v-on="on">
                    <span class="hidden-sm-and-down">{{ $t("Add") }}</span>
                    <v-icon right>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <span>{{ $t("Manualy add a ship") }}</span>
              </v-tooltip>
            </v-item-group>
          </v-toolbar>
        </v-col>
      </v-row>
      <v-row v-if="itemCount == 0">
        <v-col col="12"> </v-col>
      </v-row>
      <PledgeList />
    </v-container>
  </div>
</template>

<script>
import PledgeList from "@/components/pledges/PledgeList.vue";
import ImportDialog from "@/components/hangar/ImportDialog.vue";

export default {
  name: "Pledges",
  components: {
    ImportDialog,
    PledgeList,
  },
  data: () => ({
    displayToggle: 1,
  }),
  methods: {},
  computed: {
    list: (context) => context.$store.state.pledges.list,
    itemCount: (context) => (context.list ? context.list.length : 0),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
