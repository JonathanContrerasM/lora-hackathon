<template>
  <div class="wrapper">
    <nav>
      <a href="#">Home</a>
      <a href="#what">What</a>
      <a href="#where">Where</a>
      <a href="#when">When</a>
      <a href="#suggestion">Suggestion</a>
    </nav>
    <home @device="log" @mobile="logmobile"></home>
    <suggestion></suggestion>
    <where :dev="selectedDevice" :mobile="mobile"></where>
    <when :dev="selectedDevice"></when>
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
      selectedDevice: '',
      mobile: ''
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
    },
    logmobile: function (mobile) {
      this.mobile = mobile
      console.log('home: mobile changed', this.mobile)
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
