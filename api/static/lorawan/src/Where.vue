<template>
  <div class="wrapper" id="where">
<div style="height:100%;width: 100%"><iframe scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Malet%20St,%20London%20WC1E%207HU,%20United%20Kingdom+(Your%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed" width="100%" height="600" frameborder="0"><a href="https://www.gps.ie/sport-gps/">fitness tracker</a></iframe></div>
  </div>
</template>

<script>
export default {
  name: 'WhereView',
  data: function() {
    return {}
  },
  components: {
  }
}
</script>

<style scoped>
.wrapper {
  height: 100vh;
}
iframe { height: calc(100% - 2em); }

</style>
