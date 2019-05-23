<template>
  <v-card align-end justify-end column>
    <v-toolbar>
      <v-toolbar-title>Current Reservation List</v-toolbar-title>
    </v-toolbar>

    <v-list two-line>
      <v-list-tile v-if="reservations.length > 5">
        <v-list-tile-content>
          <v-list-tile-title
            id="waitingListNotice"
            ><strong>All new reservations will go to the waiting
              list!</strong></v-list-tile-title
          >
        </v-list-tile-content>
      </v-list-tile>
      <template v-for="(reservation, index) in reservations">
        <v-list-tile :key="reservation.id" avatar ripple @click="toggle(index)">
          <v-list-tile-content>
            <v-list-tile-title>{{
              reservation.reservationDateTime | moment('dddd, MMMM Do YYYY')
            }}</v-list-tile-title>
            <v-list-tile-sub-title class="text--primary">{{
              reservation.reservationDateTime | moment('hh:mm a')
            }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'ReservationsTable',
  props: {
    reservations: Array
  }
};
</script>

<style scoped>
#waitingListNotice {
  color: rgba(255,0,0,1);
};
</style>
