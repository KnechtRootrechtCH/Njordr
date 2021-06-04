<template>
  <ShipGrid :list="orderedList" :showOwners="true" />
</template>

<script>
import ShipGrid from "@/components/hangar/ShipGrid.vue";

export default {
  name: "OrganisationFleet",
  props: ["id"],
  data: () => ({}),
  components: { ShipGrid },
  methods: {},
  computed: {
    orderedList: (context) => context._.orderBy(context.list, "ship_code"),
    list: (context) => context.$store.state.organisations.fleet,
  },
  mounted: function () {
    this.$store.dispatch("loadOrgFleet", this.id);
  },
  destroyed: function () {
    this.$store.commit("clearOrgFleet");
    this.$store.commit("unsubscribeOrgFleet");
  },
  watch: {
    id: function () {
      this.$store.dispatch("loadOrgFleet", this.id);
    },
  },
};
</script>

<style scoped>
.toolbar {
  padding: 0;
}
</style>
