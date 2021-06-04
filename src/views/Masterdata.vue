<template>
  <div class="root">
    <v-container>
      <v-row>
        <v-col col="12">
          <v-toolbar flat color="transparent">
            <v-toolbar-title>{{ $t("Masterdata") }}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
        </v-col>
      </v-row>
      <MasterdataList :type="type" />
    </v-container>
  </div>
</template>

<script>
import MasterdataList from "@/components/masterdata/MasterdataList.vue";

export default {
  name: "Masterdata",
  components: { MasterdataList },
  computed: {
    type: (context) => context.$route.params.type,
  },
};
</script>
