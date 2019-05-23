<template>
  <v-container fluid grid-list-md>
    <v-layout align-center justify-space-around row wrap>
      <v-flex d-flex>
        <ReservationForm :userId="userId" />
        <v-spacer></v-spacer>
        <ReservationsTable :reservations="reservations" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
// @ is an alias to /src
import ReservationForm from '@/components/ReservationForm.vue';
import ReservationsTable from '@/components/ReservationsTable.vue';
import axios from 'axios';

export default {
  name: 'reservations',
  components: {
    ReservationsTable,
    ReservationForm
  },
  data() {
    return {
      reservations: [],
      userId: ''
    };
  },
  mounted() {
    axios.get('http://localhost:5000/api/reservations').then(res => {
      this.reservations = res.data.message;
    });

    axios
      .get(`http://localhost:5000/api/users/${this.$auth.profile.nickname}`)
      .then(res => {
        /*if (!res.data.message[0].userId) {
          axios.post('http://localhost:5000/api/users', { name: this.profile.nickname, email: this.profile.email }).then(resp => {
            this.userId = parseInt(resp.data.message.userId);
          });
        }*/

        this.userId = parseInt(res.data.message[0].id);
      });
  }
};
</script>
