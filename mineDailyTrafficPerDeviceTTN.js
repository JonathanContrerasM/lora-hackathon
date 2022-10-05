const lorapacket = require('lora-packet')
const fs = require("fs")
const process = require("process")

const file = process.argv[2]

var stdinBuffer = fs.readFileSync(file, 'utf-8')

const analysis = process.argv[3]

const senders = {}
var packets = JSON.parse(stdinBuffer)
packets.length

packets.forEach(function (p) {
  try {
  var senderAddr = p.data.message.payload.mac_payload.f_hdr.dev_addr
  } catch (e) {
    return
  }
  console.log('senderAddr', senderAddr)
  if(!senders[senderAddr]) {
    senders[senderAddr] = {
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
      sfs: {
        '7': 0,
        '8': 0,
        '9': 0,
        '10': 0,
        '12': 0,
        '11': 0
      },
      gateways: {
      }
    }
  }
  console.log(p.data.message.settings)
  try {
    var spreading_factor = p.data.message.settings.data_rate.lora.spreading_factor
    var code_rate = p.data.settings.data_rate.lora.coding_rate
  } catch (e) {
    spreading_factor = 'N/A'
    code_rate = 'N/A'
  }
  senders[senderAddr].packets.push({
    "time": p.time,
    "device_address": senderAddr,
    "spreading_factor": spreading_factor,
    "code_rate": code_rate,
    "rssi": p.data.message.rx_metadata[0].rssi,
    "snr": p.data.message.rx_metadata[0].snr
  })
  senders[senderAddr].nrPackets++
   
  var mtype = p.data.message.payload.m_hdr.m_type
  var mtypecode = ''
  if (mtype == 'CONFIRMED_UP') {
    mtypecode = '100'
  }
  if (mtype == 'CONFIRMED_DOWN') {
    mtypecode = '101'
  }
  if (mtype == 'UNCONFIRMED_UP') {
    mtypecode = '010'
  }
  if (mtype == 'UNCONFIRMED_DOWN') {
    mtypecode = '011'
  }
  if (mtype == 'REJOIN_REQUEST') {
    mtypecode = '110'
  }
  if (mtype == 'PROPRIETARY') {
    mtypecode = '111'
  }
  senders[senderAddr].directions[mtypecode]++
  senders[senderAddr].sfs[p.data.message.settings.data_rate.lora.spreading_factor]++
  //if (senders[senderAddr].gateways[p.gateway]) {
  //  senders[senderAddr].gateways[p.gateway]++
  //} else {
  //  senders[senderAddr].gateways[p.gateway] = 1
  //}
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

var summary = {
  once: Object.keys(oncePerDay),
  multiple: Object.keys(multiplePerDay),
}

fs.writeFileSync(analysis + 'once-per-day.json', JSON.stringify(oncePerDay), () => {})
console.log('once')
console.log(oncePerDay)
fs.writeFileSync(analysis + 'multiple-per-day.json', JSON.stringify(multiplePerDay), () => {})
console.log('multiple')
console.log(multiplePerDay)
fs.writeFileSync(analysis + 'summary.json', JSON.stringify(summary), () => {})
console.log('summary')
console.log(summary)
