<template>
  <div class="wrapper">
    <nav></nav>
    <div id="app">

      <section class="l">

        <section>
          <h2>Days</h2>
          <div class="days">
            <div v-for="day in days" :key="day" @click="selectedDay = day">{{day.replaceAll('_', '.')}}</div>
          </div>
        </section>

        <section>
          <h2>Devices</h2>

          <div class="devices-multiple">
            <h3>Multiple Message per Day</h3>
            <div class="devices">
              <div v-for="device in devices.multiple" :key="device"
                @click="selectedDevice = device; selectedFreq = 'multiple'">{{ device.replace(/.{2}/g, '$&-').slice(0, -1) }}</div>
            </div>
          </div>

          <div class="devices-once">
            <h3>One Message per Day</h3>
            <div class="devices">
              <div v-for="device in devices.once" :key="device" @click="selectedDevice = device; selectedFreq = 'once'">
                {{ device.replace(/.{2}/g, '$&-').slice(0, -1) }}</div>
            </div>
          </div>
        </section>
      </section>

      <section class="r">
        <section>
          <h2>Device {{selectedDevice.replace(/.{2}/g, '$&-').slice(0, -1) || '...'}}</h2>
          <h3>Overview</h3>
          <bar
            :chart-options="chartOptions"
            :chart-data="chartData"
            :chart-id="chartId"
            :dataset-id-key="datasetIdKey"
            :plugins="plugins"
            :css-classes="cssClasses"
            :styles="styles"
            :width="width"
            :height="height"
          />
          <h3>Packets</h3>
          <div class="devinfo">
            <div v-for="p in deviceInfo.packets" :key="p.time">
              <div class="tuple">
                <div>Arrival</div>
                <div>{{new Date(p.time).toLocaleTimeString()}}</div>
              </div>

              <div class="tuple">
                <div>Bandwidth</div>
                <div>{{p.bandwidth}}</div>
              </div>

              <div class="tuple">
                <div>Spreading Factor</div>
                <div>{{p.spreading_factor}}</div>
              </div>

              <div class="tuple">
                <div>Code Rate</div>
                <div>{{p.code_rate}}</div>
              </div>

              <div class="tuple">
                <div>RSSI</div>
                <div>{{p.rssi}}</div>
              </div>

              <div class="tuple">
                <div>SNR</div>
                <div>{{p.snr}}</div>
              </div>
              <hr>
            </div>
            <div v-for="att in deviceInfo" :key="att">
            </div>
          </div>
        </section>
      </section>
    </div>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'

export default {
  name: 'App',

  data: function() {
    return {
       days: [
         1,2,3
       ],
       selectedDay: '',
       selectedDevice: '',
       selectedFreq: '',
       deviceInfo: {},
       devices: ['a', 'b']
    }
  },
  watch: {
    selectedDay: async function (day) {
      const response = await fetch('http://localhost:3000/summaries/' + day);
      const summaries = await response.json();
      this.devices = summaries
    },
    selectedDevice: async function (device) {
      const response = await fetch('http://localhost:3000/devices/' + device + '/' + this.selectedDay + '?freq=' + this.selectedFreq);
      const deviceInfo = await response.json();
      this.deviceInfo = deviceInfo
    }
  },
  mounted: async function () {
    window.app = this
    const response = await fetch('http://localhost:3000/days');
    const days = await response.json();
    this.days = days
  },
  components: {
    'bar': Bar
  }
}
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
}

#app {
  display: flex;
  padding: 1em;
  box-sizing: border-box;
}

.l,
.r {
  flex-grow: 1;
  flex-basis: 6;
  margin-bottom: 0;
}
.l {
  flex-basis: 40%;
}

h2 {
  margin-bottom: 0.5em;
}
h3 {
  margin-bottom: 0.25em;
}

.l > section {
  margin-bottom: 1em;
}

.r > section {
  margin-bottom: 1em;
}

.r {
  flex-basis: 60%;
}

.days {
  height: calc(30vh - 2em);
  overflow: auto;
}

.devices {
  height: calc(20vh - 2em);
  overflow: auto;
}

.days, .devices {
  margin-right: 1em;
}

.tuple {
  display: flex;
  justify-content: space-between;
}

.devinfo {
  height: 80vh;
  overflow: auto;
}
</style>
