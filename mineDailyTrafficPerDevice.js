const lorapacket = require('lora-packet')
const fs = require("fs")

var stdinBuffer = fs.readFileSync(0, 'utf-8')

const senders = {}
var packets = JSON.parse(stdinBuffer)
packets.length
packets.forEach(function (p) {
  if(!senders[p.device_address]) {
    senders[p.device_address] = {
      packets: [ ],
      nrPackets: 0,
      directions: {
        '000': 0,
        '001': 0,
        '010': 0,
        '011': 0,
        '100': 0,
        '101': 0,
        '110': 0,
        '111': 0
      },
      gateways: {
      }
    }
  }
  senders[p.device_address].packets.push(p)
  senders[p.device_address].nrPackets++
  senders[p.device_address].directions[p.mtype]++
  if (senders[p.device_address].gateways[p.gateway]) {
    senders[p.device_address].gateways[p.gateway]++
  } else {
    senders[p.device_address].gateways[p.gateway] = 0
  }
})

var oncePerDay = {}
Object.keys(senders).forEach(function (s) {
  if(senders[s].nrPackets == 1) {
    oncePerDay[s] = senders[s]
  }
})

var multiplePerDay = {}
Object.keys(senders).forEach(function (s) {
  if(senders[s].nrPackets > 1) {
    multiplePerDay[s] = senders[s]
  }
})

fs.writeFileSync('once-per-day.json', JSON.stringify(oncePerDay), () => {})
fs.writeFileSync('multiple-per-day.json', JSON.stringify(multiplePerDay), () => {})
fs.writeFileSync('all-per-day', JSON.stringify(senders), () => {})
