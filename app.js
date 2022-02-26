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
    // note: reg plate length is always 7
    var guess = req.body.guess;
    var todaysReg = Array.from("CU57ABC") // TODO make answer vary
    var hint = [0,0,0,0,0,0,0] // blank hint to write to
    // green pass
    for (var i = 0; i < 7; i++) {
        indexof = todaysReg.indexOf(guess[i]);
        if (indexof == i) {
            hint[i] = 2
            // remove letter from answer to prevent double counting
            todaysReg[indexof] = '#'
        }
    }
    // yellow pass
    for (var i = 0; i < 7; i++) {
        indexof = todaysReg.indexOf(guess[i]);
        if (indexof != -1) {
            hint[i] = 1
            // remove letter from answer to prevent double counting
            todaysReg[indexof] = '#'
        }
    }
    // remaining is yellow
    res.send(hint.join());
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
