<template>
  <div class="hello">
    <h1 class="display-4 hello-message">{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Hello',
  props: {
    msg: String
  }
}
</script>

<style>
.hello {
  background-color: rgba(2,0,0,0.4);
}
.hello-message {
  padding: 5%;
}
</style>
