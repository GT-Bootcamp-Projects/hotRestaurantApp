<template>
  <v-navigation-drawer v-model="drawer" absolute dark temporary>
    <v-list v-if="isAuthenticated" class="pa-1">
      <v-list-tile avatar tag="div">
        <v-list-tile-avatar>
          <img :src="profile.picture" />
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ profile.nickname }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile to="/reservations">
        <v-list-tile-action>
          <v-icon>calendar</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Reservations</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <v-list v-if="!isAuthenticated" class="pa-1">
      <v-list-tile tag="div">
        <v-list-tile-content>
          <v-list-tile-title>Please sign in!</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavigationDrawer',
  data: function () {
    return {
      isAuthenticated: this.$auth.loggedIn
    }
  }
};
</script>
