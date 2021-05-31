<template>
  <div class="alerts">
    <v-snackbar
      v-for="alert in alerts"
      v-bind:key="alert != null ? alert.key : 0"
      :color="alert.type"
      :value="alert != null"
      absolute
      top
      center
    >
      <p>{{ alert.message }}</p>
      <p v-if="alert.info">{{ alert.info }}</p>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "Alerts",
  props: {},
  methods: {},
  computed: {
    alerts() {
      return this.$store.state.alerts.list;
    },
    count() {
      return this.$store.state.alerts.count;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
