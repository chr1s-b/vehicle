require("dotenv").config()

const express = require('express')
const path = require('path')
const app = express()
var bodyParser = require('body-parser')
const port = process.env.PORT || 3000;

const regs = ["SL08CFO","MA66XME","KP65NNT","WU63YZV","AE51VRR","OY20ZKS","YX67VDJ","YT70FON","GJ13BUE","KW69JTU","VE60JYY","YG60MFN","YE18TBV","DU64MYY","GN03UYG","KS09FJF","NL03EHM","GL11ZBP"]

function selectReg() {
    var day = Math.floor(+new Date() / 86400);
    return regs[day % regs.length];
}

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'))
})

app.post('/guess', (req, res) => {
    console.log(req.body.guess);
    // process this guess
    // note: reg plate length is always 7
    var guess = Array.from(req.body.guess);
    var todaysReg = Array.from(selectReg())
    var hint = [0,0,0,0,0,0,0] // blank hint to write to
    // green pass
    for (var i = 0; i < 7; i++) {
        if (guess[i] == todaysReg[i]) {
            hint[i] = 2
            // remove letter from answer and guess to prevent double counting
            todaysReg[i] = '#'
            guess[i] = '_'
        }
    }
    // yellow pass
    for (var i = 0; i < 7; i++) {
        indexof = todaysReg.indexOf(guess[i]);
        if (indexof != -1) {
            hint[i] = 1
            // remove letter from answer and guess to prevent double counting
            todaysReg[indexof] = '#'
            guess[i] = '_'
        }
    }
    // remaining is yellow
    res.send(hint.join(''));
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