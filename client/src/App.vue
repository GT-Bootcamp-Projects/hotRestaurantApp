<template>
  <div id="app">
    <v-app dark>
      <v-toolbar>
        <v-toolbar-side-icon
          @click.stop="drawer = !drawer"
        ></v-toolbar-side-icon>
        <v-toolbar-title v-if="this.$route.path === '/'"></v-toolbar-title>
        <v-toolbar-title v-else>Hot Restaurant</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn to="/" flat>Home</v-btn>
          <v-btn v-if="!isAuthenticated" to="#" @click.prevent="login" flat
            >Login</v-btn
          >
          <v-btn v-if="isAuthenticated" to="#" @click.prevent="logout" flat
            >Log out</v-btn
          >
        </v-toolbar-items>
      </v-toolbar>

      <router-view id="body" />
      <NavigationDrawer v-model="drawer" />
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
            <v-list-tile-content>
              <v-list-tile-title>Reservations</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/profile">
            <v-list-tile-content>
              <v-list-tile-title>User Profile</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile to="/about">
            <v-list-tile-content>
              <v-list-tile-title>About Us</v-list-tile-title>
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
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      isAuthenticated: false,
      drawer: null,
      profile: {}
    };
  },
  async created() {
    try {
      await this.$auth.renewTokens();
    } catch (e) {
      throw e;
    }
  },
  methods: {
    login() {
      this.$auth.login();
    },
    logout() {
      this.$auth.logOut();
    },
    handleLoginEvent(data) {
      this.isAuthenticated = data.loggedIn;
      this.profile = data.profile;
    }
  }
};
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
#body {
  height: 100%;
}
</style>
