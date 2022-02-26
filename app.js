require("dotenv").config()

const express = require('express')
const path = require('path')
const app = express()
var bodyParser = require('body-parser')
const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.post('/guess', (req, res) => {
    console.log(req.body.guess);
    // process this guess

    res.send("zer0-day exploit acquired")
})

app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, '/style.css'))
  })

app.get('/client.js', (req, res) => {
    res.sendFile(path.join(__dirname, '/client.js'))
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
