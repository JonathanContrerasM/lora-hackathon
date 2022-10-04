var app = new Vue({
  el: '#app',
  data: {
    days: [
      1,2,3
    ],
    selectedDay: '',
    selectedDevice: '',
    selectedFreq: '',
    deviceInfo: {},
    devices: ['a', 'b']
  },
  watch: {
    selectedDay: async function (day) {
      const response = await fetch('/summaries/' + day);
      const summaries = await response.json();
      this.devices = summaries
    },
    selectedDevice: async function (device) {
      const response = await fetch('/devices/' + device + '/' + this.selectedDay + '?freq=' + this.selectedFreq);
      const deviceInfo = await response.json();
      this.deviceInfo = deviceInfo
    }
  },
  mounted: async function () {
    window.app = this
    const response = await fetch('/days');
    const days = await response.json();
    this.days = days
  }
})
