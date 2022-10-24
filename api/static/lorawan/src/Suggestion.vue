<template>
  <div class="wrapper" id="suggestion">
    <div class="lr">
    <div class="left">
    <h2>→  What?</h2>
    <h3>
      <span v-if="findings">
      Device {{dev}} may be <span v-if="findings.sensor">a <span v-if="findings.live">live</span> sensor device</span>
      <span v-if="findings.actuator">an actuator device</span>
      <span v-if="findings.passive">a passive device</span>
      <span v-if="findings.proprietary"> using a proprietary protocol</span>.</span>
    </h3>
    </div>

    <div>
    <h2>→  Where, When?</h2>
    <h3>
      {{sugg.n_devices}} devices were involved. <h3 v-if="sugg.mobile > 0"> {{ sugg.mobile }} devices were mobile devices.</h3> <h3 v-if="sugg.perc_weekday > 0">{{sugg.perc_weekday}} devices operated mainly between Monday and Friday.</h3>
      The following people may be related to the device:
    </h3>
       <h4 v-for="(d, i) in sugg.people" :key="d">({{i+1}}) {{d}}</h4>
    </div>
    </div>
    <div class="right">
    <h3>Shodan Info related to sender's area:</h3>
    <pre>{{JSON.stringify(sugg['Shodan info'], undefined, 2)}}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MapView',
  data: function() {
    return { sugg: {} }
  },
  components: {
  },
  props: ['findings', 'dev'],
  watch: {
    findings: function (f) {
      console.log('sugg', f)
    },
    dev: async function () {
      var res = await fetch('http://localhost:5002/get_suggestions')
      var json = await res.json() 
      console.log(json)
      this.sugg = json
    }
  }
}
</script>

<style scoped>
.wrapper {
  height: 100vh;
  padding-top: 2em;
  box-sizing: border-box;
}

#suggestion {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 2em;
  display: flex;
  flex-direction: row;
}
pre { max-height: 60vh; margin-left: 2em; }
</style>
