<template>
  <div class="root">
    <v-list-item two-line>
      <v-list-item-avatar>
        <img src="https://randomuser.me/api/portraits/women/81.jpg">
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title>Jane Smith</v-list-item-title>
        <v-list-item-subtitle>Logged In</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider/>
    <v-list nav dense>
      <v-list-item link to="./fleet">
        <v-list-item-icon>
          <v-icon>mdi-clipboard-list-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{$t('Fleet')}}</v-list-item-title>
      </v-list-item>
      <v-list-item link to="./orgainsations">
        <v-list-item-icon>
          <v-icon>mdi-account-group</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{$t('Organisations')}}</v-list-item-title>
      </v-list-item>
      <v-list-item link to="./about">
        <v-list-item-icon>
          <v-icon>mdi-information-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{$t('About')}}</v-list-item-title>
      </v-list-item>
      <!--
              <v-list-item link to="./transactions">
        <v-list-item-icon>
          <v-icon>mdi-cash-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{$t('Transactions')}}</v-list-item-title>
      </v-list-item>
      <v-list-item link to="./prospects">
        <v-list-item-icon>
          <v-icon>mdi-binoculars</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{$t('Prospects')}}</v-list-item-title>
      </v-list-item>
      <v-list-item link to="./upgrades">
        <v-list-item-icon>
          <v-icon>mdi-transfer-up</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{$t('Upgrades')}}</v-list-item-title>
      </v-list-item>
      <v-list-item link to="./buyback">
        <v-list-item-icon>
          <v-icon>mdi-credit-card-refund</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{$t('Buyback')}}</v-list-item-title>
      </v-list-item>
       -->
    </v-list>
  </div>
</template>

<script>
export default {
  name: "NavigationDrawer",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.root {
  margin: 56px 0 0;
}
</style>