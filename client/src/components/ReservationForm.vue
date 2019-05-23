<template>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    align-start
    justify-start
    column
  >
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-datetime-picker
      v-model="datetime"
      :rules="dateRules"
      :value="computedDateFormattedMomentjs"
      label="Select Date & Time"
      required
    ></v-datetime-picker>

    <v-btn :disabled="!valid" color="success" @click="validate">
      Make Reservation
    </v-btn>

    <v-btn color="error" @click="reset">
      Reset Form
    </v-btn>
  </v-form>
</template>

<script>
import moment from 'moment';
import axios from 'axios';

export default {
  name: 'ReservationForm',
  props: {
    userId: Number
  },
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    datetime: new Date().toISOString().substr(0, 10),
    dateRules: [v => !!v || 'Date & Time are required'],
    userId: this.userId
  }),
  computed: {
    computedDateFormattedMomentjs() {
      return this.datetime
        ? moment(this.datetime).format('dddd, MMMM Do YYYY')
        : '';
    }
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        const payload = {
          userId: this.userId,
          reservationDateTime: moment(this.datetime).format(),
          waitingList: false
        };
        axios
          .post('http://localhost:5000/api/reservations', payload)
          .then(res => {
            if (!res.data.message[0]) {
              throw new Error('No data');
            }
          });
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>
