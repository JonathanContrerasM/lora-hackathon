<template>
  <div class="wrapper">
    <nav>
      <a href="#">Home</a>
      <a href="#what">What</a>
      <a href="#where">Where</a>
      <a href="#when">When</a>
      <a href="#suggestion">Suggestion</a>
    </nav>
    <home @device="log"></home>
    <suggestion></suggestion>
    <where :dev="selectedDevice"></where>
    <when></when>
    <what></what>
  </div>
</template>

<script>
import Home from './Home.vue'
import Suggestion from './Suggestion.vue'
import Where from './Where.vue'
import When from './When.vue'
import What from './What.vue'


export default {
  name: 'App',
  data: function() {
    return {
      selectedDevice: ''
    }
  },
  components: {
    home: Home,
    what: What,
    where: Where,
    suggestion: Suggestion,
    when: When
  },
  methods: {
    log: function (device) {
      this.selectedDevice = device
      console.log('home: device changed', this.selectedDevice)
    }
  }
}
</script>

<style scoped>
nav {
  position: fixed;
  top: 0;
  width: 100vw;
}
</style>
