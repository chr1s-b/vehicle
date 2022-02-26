require("dotenv").config()

const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, '/style.css'))
  })

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
