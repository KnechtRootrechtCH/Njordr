<template>
  <div class="root">
    <v-container>
      <v-row>
        <v-col col="12">
          <v-toolbar flat color="transparent">
            <v-toolbar-title v-if="id">
              <span>[{{ id }}]&nbsp;</span>
              <span v-if="organisation">{{ organisation.name }}</span>
            </v-toolbar-title>
            <v-toolbar-title v-if="!id">{{
              $("Organisation Fleet")
            }}</v-toolbar-title>
          </v-toolbar>
        </v-col>
      </v-row>
      <OrganisationFleet v-if="organisation" :id="id" />
    </v-container>
  </div>
</template>

<script>
import OrganisationFleet from "@/components/organisations/OrganisationFleet.vue";

export default {
  name: "Organisation",
  data: () => ({}),
  components: { OrganisationFleet },
  methods: {},
  computed: {
    organisation: (context) =>
      context.$store.getters.organisationInfo(context.id),
    id: (context) => context.$route.params.id,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.toolbar {
  padding: 0;
}
</style>
