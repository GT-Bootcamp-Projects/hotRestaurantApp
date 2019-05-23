<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card v-if="profile">
        <v-img :aspect-ratio="16/9" :src="profile.picture"></v-img>

        <v-card-primary-title>
          <div>
            <div class="headline mb-0">{{ profile.nickname }}</div>
            <span class="gray--text">{{ profile.email }}</span>
          </div>
        </v-card-primary-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon @click="show = !show">
            <v-icon>{{
              show ? 'keyboard_arrow_down' : 'keyboard_arrow_up'
            }}</v-icon>
          </v-btn>
        </v-card-actions>

        <v-card-y-transition>
          <v-card-text v-show="show">
            <pre>{{ JSON.stringify(profile, null, 2) }}</pre>
          </v-card-text>
        </v-card-y-transition>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      profile: this.$auth.profile,
      show: false
    };
  },
  methods: {
    handleLoginEvent(data) {
      this.profile = data.profile;
    }
  }
};
</script>
