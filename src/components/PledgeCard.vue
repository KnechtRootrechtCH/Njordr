<template>
  <v-card>
    <v-card-title>
      <span>{{ pledge.name }}</span>
    </v-card-title>
    <v-card-text>
      <div>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-chip label outlined color="primary" class="mr-2"  v-bind="attrs" v-on="on">
              <v-icon left> mdi-currency-usd </v-icon>
              {{ pledge.cost }}
            </v-chip>
          </template>
          <span>{{ $t("Melt value") }}:&nbsp;${{ pledge.cost }}</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-chip label outlined color="primary" class="mr-2"  v-bind="attrs" v-on="on">
              <v-icon left> mdi-sigma </v-icon>
              {{ pledgeValue }}
            </v-chip>
          </template>
          <span>{{ $t("Ship value") }}:&nbsp;${{ pledgeValue }}</span>
        </v-tooltip>
        <v-tooltip bottom v-if="pledge.lti">
          <template v-slot:activator="{ on, attrs }">
            <v-chip label outlined color="primary" class="mr-2"  v-bind="attrs" v-on="on">
              <v-icon left> mdi-shield-star </v-icon>
              {{ $t("LTI") }}
            </v-chip>
          </template>
          <span>{{ $t("Life time insurance") }}</span>
        </v-tooltip>
        <v-tooltip bottom v-if="pledge.warbond">
          <template v-slot:activator="{ on, attrs }">
            <v-chip label outlined color="primary" class="mr-2"  v-bind="attrs" v-on="on">
              <v-icon left> mdi-ticket-percent </v-icon>
              {{ $t("Warbond") }}
            </v-chip>
          </template>
          <span>{{ $t("Warbond") }}</span>
        </v-tooltip>
      </div>
      <v-divider class="mt-4"/>
      <v-list>
        <PledgeItem v-for="item in items" :key="item.key" :item="item" />
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
import PledgeItem from "@/components/PledgeItem.vue";

export default {
  name: "PledgeCard",
  components: { PledgeItem },
  props: ["pledge"],
  data: () => ({
    show: true,
  }),
  methods: {},
  computed: {
    items: (context) =>
      context.$store.getters.getShipsByPledgeId(context.pledge.key),
    pledgeValue() {
      let result = 0;
      this.items.forEach((x) => {
        let masterdata = this.$store.state.ships.list[x.ship_code];
        if (masterdata) {
          result += masterdata.cost;
        }
      });
      return result;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
