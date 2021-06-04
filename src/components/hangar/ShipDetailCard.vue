<template>
  <v-card>
    <v-img
      v-if="masterdata && masterdata.image"
      height="250"
      class="white--text align-end"
      :src="masterdata.image"
    ></v-img>
    <v-img
      v-else
      height="250"
      class="white--text align-end"
      src="https://starcitizen.tools/images/thumb/c/c1/Port_Olisar_main_hub.png/2560px-Port_Olisar_main_hub.png"
    ></v-img>
    <v-card-title>
      <span v-if="item.name && masterdata"
        >{{ masterdata.manufacturer_code }}&nbsp;{{ masterdata.name }}</span
      >
      <span v-else>{{ item.manufacturer_code }}&nbsp;{{ item.ship_name }}</span>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" lg="4">
          <v-text-field
            :value="`${masterdata.manufacturer_name} (${masterdata.manufacturer_code})`"
            :label="$t('Manufacturer')"
            disabled
          ></v-text-field>
        </v-col>
        <v-col cols="12" lg="4">
          <v-text-field
            :value="masterdata.name"
            :label="$t('Model')"
            disabled
          ></v-text-field>
        </v-col>
        <v-col cols="12" lg="4">
          <v-text-field
            :value="item.name != item.ship_name ? item.ship_name : '-'"
            :label="$t('Name')"
            disabled
          ></v-text-field>
        </v-col>
        </v-row>
          <v-row>
        <v-col cols="12" lg="4">
          <v-text-field
            :value="masterdata.cost"
            :label="$t('Cost')"
            prefix="$"
            disabled
          ></v-text-field>
        </v-col>
        <v-col cols="12" lg="4">
          <v-text-field
            v-if="isReleased && masterdata.costIngame"
            :value="masterdata.costIngame"
            :label="$t('Cost Ingame')"
            prefix="aUEC"
            disabled
          ></v-text-field>
          <v-text-field
            v-else
            value="-"
            :label="$t('Cost Ingame')"
            disabled
          ></v-text-field>
        </v-col>
        </v-row>
          <v-row>
        <v-col cols="12" lg="4">
          <v-text-field
            :value="masterdata.shipLength"
            :label="$t('Length')"
            disabled
          ></v-text-field>
        </v-col>
        <v-col cols="12" lg="4">
          <v-text-field
            :value="masterdata.scu"
            :label="$t('Cargo (SCU)')"
            disabled
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn
        plain
        class="mr-4 d-none d-sm-inline"
        color="primary"
        @click="openExternalUrl(masterdata.pledgeStore)"
        >{{ $t("Pledge Store") }}</v-btn
      >
      <v-btn
        plain
        class="mr-4"
        color="primary"
        @click="openExternalUrl(masterdata.sctools)"
        >{{ $t("Star Citizen Tools") }}</v-btn
      >
      <v-btn
        plain
        class="mr-4 d-none d-sm-inline"
        color="primary"
        @click="openExternalUrl(masterdata.fleetyards)"
        >{{ $t("Fleetyards") }}</v-btn
      >
      <v-btn
        plain
        class="mr-4 d-none d-md-inline"
        color="primary"
        v-if="isReleased"
        @click="openExternalUrl(dpsCalculatorUrl)"
        >{{ $t("DPS Calculator") }}</v-btn
      >
      <v-btn
        plain
        class="mr-4 d-none d-md-inline"
        color="primary"
        v-if="isReleased"
        @click="openExternalUrl(hardpointUrl)"
        >{{ $t("Hardpoint.io") }}</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ShipDetailCard",
  props: ["item", "masterdata"],
  methods: {
    openExternalUrl(url) {
      window.open(url, "_blank");
    },
  },
  computed: {
    dpsCalculatorUrl: (context) =>
      `https://www.erkul.games/ship/${context.item.ship_code}`,
    hardpointUrl: (context) =>
      `https://hardpoint.io/#/ships/${context.item.ship_code}`,
    isReleased: (context) =>
      context.masterdata &&
      (context.masterdata.status == "released" ||
        context.masterdata.status == "finalized"),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
