<template>
  <v-row v-if="itemCount > 0">
    <v-col v-for="item in list" :key="item.key" col="12">
      <ShipCard :item="item" />
    </v-col>
  </v-row>
</template>

<script>
import ShipCard from "@/components/ShipCard.vue";

export default {
  name: "PledgeList",
  data: () => ({
    displayToggle: 1,
  }),
  components: { ShipCard },
  methods: {},
  computed: {
    list: (context) => context.$store.state.hangar.list,
    itemCount: (context) =>
      Object.keys(context.$store.state.hangar.list).length,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
