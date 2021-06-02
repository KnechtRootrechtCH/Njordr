<template>
  <v-dialog max-width="1200" overlay-opacity="0.8">
    <template v-slot:activator="{ on, attrs }">
      <v-card hover v-bind="attrs" v-on="on">
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
            v-if="!showOwner"
            contain
            position="right"
            max-height="36"
            max-width="80"
          />
          <v-tooltip left v-if="showOwner">
            <template v-slot:activator="{ on, attrs }">
              <v-avatar
                v-if="showOwner"
                size="36"
                color="primary"
                v-bind="attrs"
                v-on="on"
              >
                <img v-if="ownerPhotoUrl" :src="ownerPhotoUrl" />
                <span v-if="!ownerPhotoUrl && ownerInitials">{{
                  ownerInitials
                }}</span>
                <v-icon v-if="!ownerPhotoUrl && !ownerInitials"
                  >mdi-account</v-icon
                >
              </v-avatar>
            </template>
            <span>{{ ownerName }}</span>
          </v-tooltip>
        </v-card-title>

        <v-card-subtitle>
          <span>{{ item.manufacturer_code }}&nbsp;{{ item.name }}</span>
          <span v-if="item.ship_serial" class="float-right font-italic"
            >S/N:&nbsp;{{ item.ship_serial }}</span
          >
        </v-card-subtitle>
      </v-card>
    </template>
    <ShipDetailCard :item="item" />
  </v-dialog>
</template>

<script>
import ShipDetailCard from "@/components/ShipDetailCard.vue";

export default {
  name: "ShipCard",
  components: { ShipDetailCard },
  methods: {},
  props: ["item", "showOwner"],
  computed: {
    masterdata: (context) =>
      context.$store.state.ships.list[context.item.ship_code],
    manufacturerImage() {
      return `../img/manufacturer/${this.item.manufacturer_code}.png`; // the module request
    },
    ownerProfile: (context) =>
      context.$store.state.organisations.profiles[context.item.ownerId],
    ownerPhotoUrl: (context) =>
      context.ownerProfile ? context.ownerProfile.photoUrl : null,
    ownerInitials: (context) =>
      context.ownerProfile ? context.ownerProfile.initials : null,
    ownerName: (context) =>
      context.ownerProfile ? context.ownerProfile.displayName : null,
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
