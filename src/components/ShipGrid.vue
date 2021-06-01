<template>
  <v-row v-if="itemCount > 0">
    <v-col
      v-for="item in orderedList"
      :key="item.key"
      sm="12"
      md="6"
      lg="6"
      xl="3"
    >
      <ShipCard :item="item" />
    </v-col>
  </v-row>
</template>

<script>
import ShipCard from "@/components/ShipCard.vue";

export default {
  name: "ShipGrid",
  data: () => ({
    displayToggle: 1,
  }),
  components: { ShipCard },
  methods: {},
  computed: {
    list: (context) => context.$store.state.hangar.list,
    orderedList: (context) => context._.orderBy(context.list, "ship_code"),
    itemCount: (context) =>
      Object.keys(context.$store.state.hangar.list).length,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
