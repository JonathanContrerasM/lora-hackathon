<template>
  <div class="wrapper">
    <nav>
      <a href="#">Home</a>
      <a href="#map">Map</a>
      <a href="#where">Where</a>
      <a href="#when">When</a>
      <a href="#what">What</a>
    </nav>
    <home></home>
    <devmap></devmap>
    <where></where>
    <when></when>
    <what></what>
  </div>
</template>

<script>
import Home from './Home.vue'
import Map from './Map.vue'
import Where from './Where.vue'
import When from './When.vue'
import What from './What.vue'


export default {
  name: 'App',
  data: function() {
    return {}
  },
  components: {
    home: Home,
    what: What,
    devmap: Map,
    where: Where,
    when: When
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
