<template>
  <v-row v-if="itemCount > 0">
    <v-col
      v-for="pledge in orderedList"
      :key="pledge.key"
      sm="12"
      md="12"
      lg="12"
      xl="12"
    >
      <PledgeCard :pledge="pledge" />
    </v-col>
  </v-row>
</template>

<script>
import PledgeCard from "@/components/PledgeCard.vue";

export default {
  name: "PledgeList",
  data: () => ({
    displayToggle: 1,
  }),
  components: { PledgeCard },
  methods: {},
  computed: {
    list: (context) => context.$store.state.pledges.list,
    orderedList: (context) => context._.orderBy(context.list, "cost", "desc"),
    itemCount: (context) =>
      Object.keys(context.$store.state.pledges.list).length,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
