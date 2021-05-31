<template>
  <v-card>
    <v-img
      v-if="masterdata && masterdata.image"
      height="250"
      :src="masterdata.image"
    ></v-img>
    <v-img
      v-if="!masterdata || !masterdata.image"
      height="250"
      src="https://starcitizen.tools/images/thumb/c/c1/Port_Olisar_main_hub.png/2560px-Port_Olisar_main_hub.png"
    ></v-img>
    <v-card-title>
      <span class="name">{{ item.ship_name }}</span>
      <v-img
        class="manufacturerImage"
        :src="manufacturerImage"
        contain
        position="top right"
        max-height="32"
      />
    </v-card-title>
    <v-card-subtitle>
      {{ item.manufacturer_code }}&nbsp;{{ item.name }}</v-card-subtitle
    >
  </v-card>
</template>

<script>
export default {
  name: "ShipCard",
  methods: {},
  props: ["item"],
  computed: {
    master: (context) => context.$store.state.ships.list,
    masterdata: (context) =>
      context.$store.state.ships.list[context.item.ship_code],
    manufacturerImage() {
      return `../img/manufacturer/${this.item.manufacturer_code}.png`; // the module request
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.name {
  display: inline;
}
.manufacturerImage {
  display: grid;
}
</style>
