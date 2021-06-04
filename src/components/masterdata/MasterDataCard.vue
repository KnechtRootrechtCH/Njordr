<template>
  <v-dialog max-width="1200" overlay-opacity="0.8" v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-card hover v-bind="attrs" v-on="on">
        <v-img v-if="item.image" height="250" :src="item.image"></v-img>
        <v-img
          v-else
          height="250"
          src="https://starcitizen.tools/images/thumb/c/c1/Port_Olisar_main_hub.png/2560px-Port_Olisar_main_hub.png"
        ></v-img>
        <v-card-title>
          <span>{{ item.name }}</span>
          <v-spacer />
          <v-img
            :src="`../img/manufacturer/${item.manufacturer_code}.png`"
            contain
            position="right"
            max-height="36"
            max-width="80"
          />
        </v-card-title>
        <v-card-subtitle>
          <span>{{ item.manufacturer_code }}&nbsp;{{ item.name }}</span>
        </v-card-subtitle>
      </v-card>
    </template>
    <MasterdataEditCard :item="item" @close="dialog = false" />
  </v-dialog>
</template>

<script>
import MasterdataEditCard from "@/components/masterdata/MasterdataEditCard.vue";

export default {
  name: "MasterdataCard",
  components: { MasterdataEditCard },
  data: () => ({
    dialog: false,
  }),
  methods: {},
  props: ["item", "type"],
  computed: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
