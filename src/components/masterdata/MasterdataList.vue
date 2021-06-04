<template>
  <v-container>
    <v-row>
      <v-col
        v-for="item in filteredList"
        :key="item.key"
        sm="12"
        md="6"
        lg="6"
        xl="3"
      >
        <MasterdataCard :item="item" :type="type" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MasterdataCard from "@/components/masterdata/MasterdataCard.vue";

export default {
  name: "MasterdataList",
  components: { MasterdataCard },
  data: () => ({}),
  methods: {},
  props: ["type"],
  computed: {
    list: (context) => context.$store.state.masterdata.list,
    filteredList: (context) =>
      Object.values(context.list).filter((x) => x.type == context.type),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
