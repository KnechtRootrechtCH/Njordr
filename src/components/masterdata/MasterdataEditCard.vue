<template>
  <v-card>
    <v-card-title>
      <v-app-bar class="pl-0" flat color="rgba(0, 0, 0, 0)">
        {{ item.manufacturer_code }}&nbsp;{{ item.name }}
        <v-spacer></v-spacer>
        <v-btn color="white" icon @click="$emit('close')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-app-bar>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6" lg="6" xl="6">
          <v-text-field
            v-model="item.code"
            :label="$t('Item code')"
            :rules="[rules.required]"
            @change="update"
            outlined
            disabled
          />
        </v-col>
        <v-col cols="12" md="6" lg="6" xl="6">
          <v-select
            v-model="item.type"
            :label="$t('Item type')"
            :items="typeSelection"
            :rules="[rules.required]"
            @change="update"
            outlined
          />
        </v-col>
        <v-col cols="12" md="6" lg="6" xl="6">
          <v-text-field
            v-model="item.manufacturer_code"
            :label="$t('Manufacturer code')"
            :rules="[rules.required]"
            counter="4"
            maxlength="4"
            @change="update"
            outlined
          />
        </v-col>
        <v-col cols="12" md="6" lg="6" xl="6">
          <v-text-field
            v-model="item.manufacturer_name"
            :label="$t('Manufacturer name')"
            :rules="[rules.required]"
            @change="update"
            outlined
          />
        </v-col>
        <v-col cols="12" md="6" lg="6" xl="6">
          <v-text-field
            v-model="item.name"
            :label="$t('Item name')"
            :rules="[rules.required]"
            @change="update"
            outlined
          />
        </v-col>
        <v-col cols="12" md="6" lg="6" xl="6">
          <v-text-field
            v-model="item.focus"
            :label="$t('Focus')"
            @change="update"
            outlined
          />
        </v-col>
        <v-col cols="12" md="6" lg="6" xl="6">
          <v-text-field
            v-model="item.crew"
            :label="$t('Crew size')"
            @change="update"
            outlined
          />
        </v-col>
        <v-col cols="12" md="6" lg="6" xl="6">
          <v-select
            v-model="item.size"
            :label="$t('Size')"
            :items="sizeSelection"
            :rules="[rules.required]"
            @change="update"
            outlined
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" lg="6" xl="6">
          <v-select
            v-model="item.status"
            :label="$t('Status')"
            :items="statusSelection"
            :rules="[rules.required]"
            @change="update"
            outlined
          />
        </v-col>
        <v-col cols="12" md="6" lg="6" xl="6">
          <v-text-field
            v-model="item.targetPatch"
            :label="$t('Target patch')"
            :rules="[]"
            @change="update"
            outlined
          />
        </v-col>
        <v-col cols="12" md="6" lg="6" xl="6">
          <v-text-field
            v-model="item.loaner"
            :label="$t('Loaner')"
            :rules="[]"
            @change="update"
            outlined
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" lg="6" xl="6">
          <v-text-field
            v-model="item.cost"
            :label="$t('Cost')"
            :rules="[rules.required, rules.number]"
            prefix="$"
            @change="update"
            outlined
          />
        </v-col>
        <v-col cols="12" md="6" lg="6" xl="6">
          <v-text-field
            v-model="item.costIngame"
            :label="$t('Cost (ingame)')"
            :rules="[rules.number]"
            prefix="aUEC"
            @change="update"
            outlined
          />
        </v-col>
        <v-col cols="12" md="6" lg="6" xl="6">
          <v-text-field
            v-model="item.scu"
            :label="$t('SCU')"
            prepend-inner-icon="mdi-package"
            :rules="[rules.required, rules.number]"
            @change="update"
            outlined
          />
        </v-col>
        <v-col cols="12" md="6" lg="6" xl="6">
          <v-text-field
            v-model="item.shipLength"
            :label="$t('Length')"
            prepend-inner-icon="mdi-arrow-expand-horizontal"
            :rules="[rules.required, rules.number]"
            @change="update"
            outlined
          />
        </v-col>
        <v-col cols="12" md="12" lg="6" xl="6">
          <v-text-field
            v-model="item.image"
            :label="$t('Image URL')"
            :rules="[rules.required]"
            @change="update"
            outlined
          />
        </v-col>
        <v-col cols="12" md="12" lg="6" xl="6">
          <v-text-field
            v-model="item.pledgeStore"
            :label="$t('Pledge store')"
            @change="update"
            outlined
          />
        </v-col>
        <v-col cols="12" md="12" lg="6" xl="6">
          <v-text-field
            v-model="item.sctools"
            :label="$t('Star Citizen Tools')"
            @change="update"
            outlined
          />
        </v-col>
        <v-col cols="12" md="12" lg="6" xl="6">
          <v-text-field
            v-model="item.fleetyards"
            :label="$t('Fleetyards')"
            @change="update"
            outlined
          />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn
        plain
        class="mr-4 d-none d-sm-inline"
        color="primary"
        v-if="item.pledgeStore"
        @click="openExternalUrl(item.pledgeStore)"
        >{{ $t("Pledge Store") }}</v-btn
      >
      <v-btn
        plain
        class="mr-4"
        color="primary"
        v-if="item.sctools"
        @click="openExternalUrl(item.sctools)"
        >{{ $t("Star Citizen Tools") }}</v-btn
      >
      <v-btn
        plain
        class="mr-4 d-none d-sm-inline"
        color="primary"
        v-if="item.fleetyards"
        @click="openExternalUrl(item.fleetyards)"
        >{{ $t("Fleetyards") }}</v-btn
      >
      <v-btn
        plain
        class="mr-4 d-none d-md-inline"
        color="primary"
        v-if="isReleased && dpsCalculatorUrl"
        @click="openExternalUrl(dpsCalculatorUrl)"
        >{{ $t("DPS Calculator") }}</v-btn
      >
      <v-btn
        plain
        class="mr-4 d-none d-md-inline"
        color="primary"
        v-if="isReleased && hardpointUrl"
        @click="openExternalUrl(hardpointUrl)"
        >{{ $t("Hardpoint.io") }}</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "MasterDataEditCard",
  data: () => ({
    typeSelection: [
      "ship",
      "vehicle",
      "game package",
      "armour",
      "paint",
      "flair",
      "other",
    ],
    sizeSelection: [
      "Vehicle",
      "Snub",
      "Small",
      "Medium",
      "Large",
      "Capital",
      "N/A",
    ],
    statusSelection: ["FlightReady", "GoldStandart", "InProduction", "InConcept"],
    rules: {
      number: (value) =>
        !Number.isNaN(Number(value)) || "Please enter a valid number.",
      required: (value) => !!value || "Required.",
    },
  }),
  methods: {
    update() {
      this.$store.dispatch("saveMasterdataItem", this.item);
    },
    openExternalUrl(url) {
      window.open(url, "_blank");
    },
  },
  props: ["item"],
  computed: {
    list: (context) => context.$store.state.masterdata.list,
    dpsCalculatorUrl: (context) =>
      `https://www.erkul.games/ship/${context.item.ship_code}`,
    hardpointUrl: (context) =>
      `https://hardpoint.io/#/ships/${context.item.ship_code}`,
    isReleased: (context) =>
      context.item &&
      (context.item.status == "FlightReady" || context.item.status == "GoldStandart"),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
