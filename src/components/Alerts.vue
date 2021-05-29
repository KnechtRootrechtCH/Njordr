<template>
  <div class="alert">
    <v-alert
      v-for="alert in alerts"
      v-bind:key="alert.key"
      border="left"
      close-text="Close Alert"
      color="deep-purple accent-4"
      dark
      dismissible
    >
      <p>{{ alert.message }}</p>
      <p v-if="alert.info">{{ alert.info }}</p>
    </v-alert>
  </div>
</template>

<script>
export default {
  name: "Alerts",
  props: {
  },
  computed: {
    alerts: (context) => context.$store.state.alerts.list
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
