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
      <span>{{ item.ship_name }}</span>
      <v-spacer />
      <v-img
        :src="manufacturerImage"
        contain
        position="right"
        max-height="36"
        max-width="80"
      />
    </v-card-title>

    <v-card-subtitle>
      <span>{{ item.manufacturer_code }}&nbsp;{{ item.name }}</span>
      <span v-if="item.ship_serial" class="float-right font-italic">S/N:&nbsp;{{ item.ship_serial }}</span>
    </v-card-subtitle
    >
  </v-card>
</template>

<script>
export default {
  name: "ShipCard",
  methods: {},
  props: ["item"],
  computed: {
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
.manufacturerImage {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
