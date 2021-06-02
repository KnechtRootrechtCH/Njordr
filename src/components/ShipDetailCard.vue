<template>
  <v-card>
    <v-card-title>
      {{ item.name }}
    </v-card-title>
    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :value="4.5"
          dense
          half-increments
          readonly
          empty-icon="mdi-star-outline"
          full-icon="mdi-star"
          half-icon="mdi-star-half-full"
          size="14"
        ></v-rating>
        <div class="grey--text ms-4">4.5 (413)</div>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ShipDetailCard",
  props: ["item"],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
