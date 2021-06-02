<template>
  <v-row v-if="itemCount > 0">
    <v-col
      v-for="item in list"
      :key="item.key"
      sm="12"
      md="6"
      lg="6"
      xl="3"
    >
      <ShipCard :item="item" :showOwner="showOwners"/>
    </v-col>
  </v-row>
</template>

<script>
import ShipCard from "@/components/ShipCard.vue";

export default {
  name: "ShipGrid",
  props: ["list", "showOwners"],
  data: () => ({
    displayToggle: 1,
  }),
  components: { ShipCard },
  methods: {},
  computed: {
    itemCount: (context) =>
      Object.keys(context.list).length,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
