<template>
  <div class="wrapper">
    <nav>
      <a href="#">Home</a>
      <a href="#what">What</a>
      <a href="#where">Where</a>
      <a href="#when">When</a>
      <a href="#suggestion">Suggestion</a>
    </nav>
    <home></home>
    <suggestion></suggestion>
    <where></where>
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
    return {}
  },
  components: {
    home: Home,
    what: What,
    where: Where,
    suggestion: Suggestion,
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
