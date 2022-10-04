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
          <div class="devices-once">
            <h3>One Message per Day</h3>
            <div class="devices">
              <div v-for="device in devices.once" :key="device" @click="selectedDevice = device; selectedFreq = 'once'">{{device}}</div>
            </div>
          </div>
          <div class="devices-multiple">
            <h3>Multiple Message per Day</h3>
            <div class="devices">
              <div v-for="device in devices.multiple" :key="device" @click="selectedDevice = device; selectedFreq = 'multiple'">{{device}}</div>
            </div>
          </div>
        </section>

      </section>

      <section class="r">

        <section>
          <h2>Device {{selectedDevice || '...'}}</h2>
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
          </div>

        </section>

      </section>

    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
html, body {
  padding: 0;
  margin: 0;
}
#app {
  display: flex;
  padding: 1em;
  box-sizing: border-box;
}
.l, .r {
  flex-grow: 1;
  flex-basis: 6;
  flex-basis: 50%;
}
.r {
  flex-basis: 4;
}
.days {
  height: calc(40vh - 2em);
  overflow: auto;
}
.devices {
  height: calc(20vh - 2em);
  overflow: auto;
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
