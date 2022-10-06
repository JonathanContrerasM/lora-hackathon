<template>
  <div class="wrapper" id="what">
    <nav></nav>
    <div id="app">

      <section class="l">

        <section>
          <h2>Days</h2>
          <div class="days">
            <div v-for="day in days.filter(d => { return d.length > 0})" :key="day" @click="selectedDay = day">{{day.replaceAll('_', '.')}}</div>
          </div>
        </section>

        <section>
          <h2>Devices</h2>

          <div class="devices-multiple">
            <h3>Multiple Messages per Day</h3>
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
          <!--h3>Overview</h3-->
          <span v-if="findings">
          This device may be <span v-if="findings.sensor">a <span v-if="findings.live">live</span> sensor device</span>
          <span v-if="findings.actuator">an actuator device</span>
          <span v-if="findings.passive">a passive device</span>
          <span v-if="findings.proprietary"> using a proprietary protocol</span>.</span>
          <h4>Packets per Hour</h4>
          <linechart v-if="selectedDevice"
            :chart-data="chartArrival"
            :height="50"
          />
          <h4>Message Types</h4>
          <bar v-if="selectedDevice"
            :chart-data="chartData"
            :height="50"
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
const host = 'localhost'
import { Bar, Line } from 'vue-chartjs/legacy'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement)

export default {
  name: 'App',

  data: function() {
    return {
       barheight: 200,
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
      const response = await fetch(`http://${host}:3000/summaries/` + day);
      const summaries = await response.json();
      this.devices = summaries
    },
    selectedDevice: async function (device) {
      const response = await fetch(`http://${host}:3000/devices/` + device + '/' + this.selectedDay + '?freq=' + this.selectedFreq);
      const deviceInfo = await response.json();
      this.deviceInfo = deviceInfo
    }
  },
  mounted: async function () {
    window.app = this
    const response = await fetch(`http://${host}:3000/days`);
    const days = await response.json();
    this.days = days
  },
  components: {
    'bar': Bar,
    'linechart': Line
  },
  computed: {
    findings: function () {
      var findings = {
        proprietary: false,
        live: false,
        sensor: false,
        actuator: false,
        passive: false
      }
      if(!this.deviceInfo.directions) {
        return null
      }
      var directions = this.deviceInfo.directions
      var propTraffic = directions['111'] > 0
      findings.proprietary = propTraffic
      
      var upTraffic = directions['010'] > 0 || directions['100'] > 0
      var downTraffic = directions['011'] > 0 || directions['101'] > 0
      
      var sensor = upTraffic && !downTraffic
      findings.sensor = sensor
      var actuator = downTraffic && !upTraffic
      findings.actuator = actuator

      if(sensor) {
        var hours = new Array(24).fill(0)
        this.deviceInfo.packets.forEach(e => hours[new Date(e.time).getHours()]++)
        if (hours.filter(e => e>0).length > 22) {
          console.log(this)
          findings.live = true
        }
      }
      
      var passiveDevice = directions['000'] > 0 || directions['001'] > 0 || directions['110'] > 0

      findings.passive = passiveDevice
      this.$emit('findings', findings)
      return findings
    },
    chartData: function () {
      var directions = this.deviceInfo.directions
      if(directions) {
        var data = {
          labels: [ 'Join Request', 'Join Accept', 'Unconfirmed Up', 'Unconfirmed Down', 'Confirmed Up', 'Confirmed Down', 'Rejoin Request', 'Proprietary' ],
          datasets: [
            {
              label: 'Message Types',
              backgroundColor: '#f87979',
              data: [directions['000'], directions['001'], directions['010'], directions['011'], directions['100'], directions['101'], directions['110'], directions['111']]
            }
          ]
        }
        return data
      }
      return {}
    },
    chartArrival: function () {
      if(!this.deviceInfo || !this.deviceInfo.packets) {
        return {}
      }
      var hours = new Array(24).fill(0)
      this.deviceInfo.packets.forEach(e => hours[new Date(e.time).getHours()]++)
      
      var data = {
        labels: ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM', '7 AM',
          '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM',
          '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM'],
        datasets: [
          {
            label: 'Packets per Hour',
            backgroundColor: '#f87979',
            borderColor: '#e8a7a2',
            borderWidth: '1',
            color: '#e8a7a2',
            data: hours
          }
        ]
      }
      return data
    }
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
  margin-bottom: 0;
}
.l {
  flex-basis: 30%;
}

h2 {
  margin-bottom: 0.5em;
}

h3 {
  margin-bottom: 0.25em;
}

h4 {
  margin-bottom: 0.1em;
}

.l > section {
  margin-bottom: 1em;
}

.r > section {
  margin-bottom: 1em;
}

.r {
  flex-basis: 70%;
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
  height: 20vh;
  overflow: auto;
}
</style>
