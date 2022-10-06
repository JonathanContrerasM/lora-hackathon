<template>
  <div class="homewrapper" id="home">
    <div>
      <h1>OSINT LoRA Platform</h1>
      <div class="datasetbox">
        <div>
          <input ref="myFiles" type="file" id="dataset" name="dataset" accept="application/JSON">
        </div>
        <div>
          <label for="mobile" style="margin-right: 1em;">Mobile</label>
          <input type="checkbox" id="mobile" name="mobile">
        </div>
      </div>
      <button for="dataset" @click="upload">Upload dataset</button>
      <div class="dimension">
        <div><a href="#what">→ What</a></div>
        <div><img src="/what.png" class="logo"></div>
      </div>
      <div class="dimension">
        <div><a href="#where">→ Where</a></div>
        <div><img src="/map.png" class="logo"></div>
      </div>
      <div class="dimension">
        <div class="whenwheretitle"><a href="#when">→ When+Where</a></div>
        <div>
          <div><img src="/where.png" class="logo"></div>
          <div><img src="/cam.png" class="logo"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data: function() {
    return {}
  },
  components: {
  },
  methods: {
    upload: function upload () {
      var input = this.$refs.myFiles.files[0]
      console.log('input')

      var data = new FormData()
      data.append('file', input)

      fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: data
      })
    }
  }
}
</script>

<style scoped>
.homewrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo {
  -webkit-filter: invert(1);
  filter: invert(1);
}
.datasetbox {
  display: flex;
  align-items: center;
}
.dimension {
  display: flex;
  align-content: center;
  justify-content: space-between;
  margin: 1em 0;
}
.whenwheretitle {
  margin-top: auto;
  margin-bottom: auto;
}
.datasetbox > div:nth-child(2) {
 display: flex;
 justify-content: center;
 align-content: center;
 align-items: center;
}

</style>
