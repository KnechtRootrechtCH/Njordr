<template>
  <v-list-item class="pl-0">
    <v-list-item-avatar tile size="56">
      <v-img v-if="masterdata" :src="masterdata.image" />
      <v-icon v-if="!masterdata">mdi-cloud-download</v-icon>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title>
        <span v-if="item && item.manufacturer_code"
          >{{ item.manufacturer_code }}&nbsp;</span
        >
        <span>{{ item.name }}</span>
      </v-list-item-title>
      <v-list-item-subtitle v-if="item.ship_name != item.name">{{ item.ship_name }}</v-list-item-subtitle>
      <v-list-item-subtitle v-if="item.ship_name == item.name">n/a</v-list-item-subtitle>
      <v-list-item-subtitle>$&nbsp;{{ masterdata.cost }}</v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "PledgeItem",
  data: () => ({
    show: true,
  }),
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
<style scoped></style>
