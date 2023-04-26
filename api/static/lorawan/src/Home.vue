<template>
    <div class="homewrapper" id="home">
        <div class="upload-box">
            <h1>OSINT LoRA Platform</h1>
            <div class="datasetbox">
                <div>
                    <input ref="myFiles" type="file" id="dataset" name="dataset" accept="application/JSON" @change="updateSelectedFile">
                </div>
                <div style="display: flex; align-items: center; margin-top: 1em">
                    <label for="mobile" style="margin-right: 1em;">Mobile</label>
                    <input type="checkbox" id="mobile" name="mobile" v-model="mobile">
                </div>
            </div>
            <button class="upload-btn" for="dataset" @click="upload" :disabled="uploadButtonDisabled">Upload dataset</button>
            <div class="dimension devlist">
                <div v-for="dev in deviceList" :key="dev" @click="select(dev)">
                    <div v-if="dev === selectedDevice" style="font-weight: bold">
                        {{ dev.replace(/.{2}/g, '$&-').slice(0, -1)  }}
                    </div>
                    <div v-else>
                        {{ dev.replace(/.{2}/g, '$&-').slice(0, -1)  }}
                    </div>
                </div>
            </div>
            <div class="dimension" style="margin-bottom: 1em">
                <div style="flex: 1"><a href="#where">Where</a></div>
                <div><img src="/map.png" class="logo"></div>
            </div>
            <div class="dimension" style="margin-bottom: 1em">
                <div style="flex: 1"><a href="#what">What</a></div>
                <div><img src="/what.png" class="logo"></div>
            </div>
            <div class="dimension" style="margin-bottom: 1em">
                <div class="whenwheretitle"><a href="#when">When + Where</a></div>
                <div style="display: flex">
                    <div><img src="/where.png" class="logo"></div>
                    <div style="margin-left: 1em"><img src="/cam.png" class="logo"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'HomeView',
    data: function() {
        return {
            deviceList: [],
            selectedDevice: '',
            mobile: '',
            selectedFile: null
        }
    },
    computed: {
        uploadButtonDisabled: function () {
            return !this.selectedFile
        }
    },
    watch: {
        mobile: function () {
            this.$emit('mobile', this.mobile)
        }
    },
  methods: {
    select: function (dev) {
      this.selectedDevice = dev
      this.$emit('device', dev)
    },
    updateSelectedFile: function (event) {
        this.selectedFile = event.target.files[0]
    },
    upload: async function upload () {
      var input = this.$refs.myFiles.files[0]
      console.log('input')

      var data = new FormData()
      data.append('file', input)

      var res = await fetch('http://localhost:5002/raw_parser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: input
      })
      console.log(res)
      var json = await res.json()
      console.log(json)
      this.deviceList = json
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
    align-items: flex-start;
    margin-top: 2em;
}

.upload-btn {
    display: inline-block;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    color: #fff;
    background-color: hsl(195, 85%, 41%);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
}

.upload-btn:hover {
    background-color: #0072C6;
}

.upload-btn:active {
    background-color: #005EA8;
}

.file-input {
    display: none;
}

.file-label {
    display: inline-block;
    margin-right: 1em;
    font-size: 16px;
    font-weight: bold;
    color: #555;
}

.file-name {
    margin-left: 1em;
    font-size: 16px;
    font-weight: bold;
    color: #555;
}

.dimension {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1em 0;
    width: 100%;
}

.whenwheretitle {
    margin-top: auto;
    margin-bottom: auto;
}

.devlist {
    flex-direction: column;
}

.upload-box {
    background-color: #222;
    padding: 2em;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}
</style>
