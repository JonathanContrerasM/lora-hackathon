const express = require('express')
const fs = require('fs')
const app = express()
const port = 3000
const { exec } = require('child_process')

app.get('/days', (req, res) => {
  exec('ls *jsonsummary.json', (err, stdout, stderr) => {
    if (err) {
      console.error(err)
    } else {
      var entries = stdout.split('\n')
      entries = entries.map(e => e.split('.')[0])
      console.log(`stdout: ${entries}`)
      console.log(`stderr: ${stderr}`)
    }
  res.json(entries)
  })
})

app.get('/summaries/:day', (req, res) => {
  fs.readFile(`${req.params.day}.csv.jsonsummary.json`, 'utf-8', (error, file) => {
    console.log(file, error)
    res.json(JSON.parse(file))
  })
})

app.get('/devices/:device/:day', (req, res) => {
  console.log(req.params)
  console.log(req.query)
  var deviceAddr = req.params.device
  var day = req.params.day
  var freq = req.query.freq

  fs.readFile(`${day}.csv.json${freq}-per-day.json`, 'utf-8', (error, file) => {
    var devices = JSON.parse(file)
    var dev = devices[deviceAddr]
    res.json(dev)
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
