<template>
  <div class="home">
    <v-parallax
      dark
      id="restaurant-parallax"
      height="full"
      src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1280&w=853"
    >
      <v-layout align-center column justify-center>
        <Hello msg="Welcome to Hot Restaurant!" />
      </v-layout>
    </v-parallax>
  </div>
</template>

<script>
// @ is an alias to /src
import Hello from '@/components/Hello.vue';

export default {
  name: 'home',
  components: {
    Hello
  }
};
</script>

<style>
#restaurant-parallax {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

::-webkit-scrollbar {
  width: 0;
  display: none;
}
</style>
