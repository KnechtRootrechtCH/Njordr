<template>
  <v-row>
    <v-col cols="12">
      <v-divider />
    </v-col>
    <v-col sm="12" md="12" lg="12" xl="12">
      <v-rating
        hover
        half-increments
        length="5"
        size="24"
        :value="notes.rating"
        @input="updateRating"
      ></v-rating>
    </v-col>
    <v-col sm="12" md="12" lg="12" xl="12">
      <v-textarea
        outlined
        :label="$t('Notes')"
        :value="notes.comments"
        @change="updateComments"
      ></v-textarea>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "ShipNotes",
  props: ["notes"],
  data: () => ({}),
  methods: {
    updateRating(payload) {
      this.notes.rating = payload;
      this.$store.dispatch("saveNotes", this.notes);
    },
    updateComments(payload) {
      this.notes.comments = payload;
      this.$store.dispatch("saveNotes", this.notes);
    },
  },
  computed: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
