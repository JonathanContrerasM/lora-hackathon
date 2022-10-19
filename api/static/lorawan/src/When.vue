<template>
  <div class="wrapper whenwrap" id="when">
    <div class="wheninfo">
      <h2>Device {{dev}}</h2>
      <h3><a :href="twurl" target="_blank">→ Twitter</a></h3>
      <h3>YouTube</h3>
      <div v-for="(el, i) of ytjson" :key="i">

      <iframe :src="el.code"
       width="280" height="150" frameborder="0" allowfullscreen></iframe>
        <hr>
      </div>
      <h3>Weather</h3>
      <div>
        <div class="weatherelement">
          <h4>Temperature</h4><span>{{weather.tempmin}} - {{weather.tempmax}}°</span>
        </div>
        <div class="weatherelement">
          <h4>Humidity</h4><span>{{weather.humidity}}%</span>
        </div>
        <div class="weatherelement">
          <h4>Precipation</h4><span>{{weather.precip}} ({{weather.precipprob}}%)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WhenView',
  data: function() {
    return {
      ytjson: '',
      twurl: '',
      weather: {}
    }
  },
  watch: {
    'dev': async function () {
      try {
        console.log('when dev changed', this.dev)
        var yt = await fetch(`http://192.168.18.177:5002/youtube_feed?device=${this.dev}`)
        var ytjson = await yt.json()
        console.log(ytjson)
        ytjson = ytjson.map (e => {
          var code = e.link.split('watch?v=')[1] 
          e.code = 'http://www.youtube.com/embed/' + code
          return e
        })
        this.ytjson = ytjson
      } catch (e) {
        console.log(e)
      }

      try {
        var twitter = await fetch(`http://192.168.18.177:5002/twitter_feed?device=${this.dev}`)
        var twjson = await twitter.json()
        console.log(twjson)
        this.twurl = twjson
      } catch (e) {
        console.log(e)
      }

      try {
        var weather = await fetch(`http://192.168.18.177:5002/get_weather?device=${this.dev}`)
        var weatherjson = await weather.json()
        console.log(weatherjson)
        this.weather = weatherjson
      } catch (e) {
        console.log(e)
      }

    }
  },
  components: {
  },
  props: ['dev']
}
</script>

<style scoped>
.wrapper {
  height: calc(100vh - 2em);
  margin-top: 4em;
}
.whenwrap {
  display: flex;
  align-content: center;
  justify-content: center;

}

.wheninfo {
  margin: auto;
}
</style>
