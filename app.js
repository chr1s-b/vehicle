require("dotenv").config()

const express = require('express')
const path = require('path')
const app = express()
var bodyParser = require('body-parser')
const res = require("express/lib/response")
const port = process.env.PORT || 3000;

const regs = ["SL08CFO","MA66XME","KP65NNT","WU63YZV","AE51VRR","OY20ZKS","YX67VDJ","YT70FON","GJ13BUE","KW69JTU","VE60JYY","YG60MFN","YE18TBV","DU64MYY","GN03UYG","KS09FJF","NL03EHM","GL11ZBP"]
const imgs = ["https://i.ytimg.com/vi/cjNfaoQT_Vw/maxresdefault.jpg","https://collectingcars.imgix.net/005440/16-ww-4.jpg","https://static.wikia.nocookie.net/hotwheels/images/c/c7/Mercedes_500SL_grey_purple_interior_glass_5sp_europe_only.JPG/revision/latest/scale-to-width-down/2000?cb=20120213234954","https://static.wikia.nocookie.net/hotwheels/images/c/c7/Mercedes_500SL_grey_purple_interior_glass_5sp_europe_only.JPG/revision/latest/scale-to-width-down/2000?cb=20120213234954","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiI0Gi1ivXxNvl07orSTVZGE1yY-nioLQVMA&usqp=CAU","https://images.cdn.circlesix.co/image/1/640/0/uploads/posts/2017/02/83ffa640cbaef3b4b27a6181faca0db3.jpg","https://static.wikia.nocookie.net/hotwheels/images/f/fa/Donkey_Kong_HW.jpg/revision/latest?cb=20200506184117","https://cdn.images.express.co.uk/img/dynamic/1/590x/car-1003652.jpg","https://i.pinimg.com/originals/1b/90/4e/1b904eeb88a4aead34f36cc3b41b3a70.jpg","https://cdn.images.express.co.uk/img/dynamic/24/590x/secondary/Vauxhall-corsa-fire-engulf-car-749252.jpg","https://imganuncios.mitula.net/medium/toyota_venza_2012_toyota_venza_2012_6720133644767261155.jpg","https://m.media-amazon.com/images/I/81vYTfC-MDL._AC_SY355_.jpg","https://cae8b291f7a009bc3e401054-wceel7psqz6.netdna-ssl.com/wp-content/uploads/2019/10/Charli-XCX-1.jpg?x40218","https://9.cdn.ekm.net/ekmps/shops/wickedartz/images/vauxhall-corsa-vxr-white-2103-p.jpg","https://cdn.images.autoexposure.co.uk/AETA45352/AETV48402654_1e.jpg","https://m.atcdn.co.uk/a/media/w375/c59561093c7947d09c27b38435e488f2.jpg","https://preview.redd.it/wzlmc0qgwq861.jpg?auto=webp&s=17cda5de7a653d5eea889333ed270fa00626a131","https://www.silvertime.co.uk/images/jewellery/1549/union-flag-mini-car-charm.jpg"]




function selectReg() {
    var day = Math.floor(+new Date() / 86400000);
    return regs[day % regs.length];
}
function selectImg(){
    var day = Math.floor(+new Date() / 86400000);
    return imgs[Math.min(day % regs.length,imgs.length-1)];
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

app.post('/image',(req,req)=>{
    res.send(selectImg())
});

app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, '/style.css'))
  })

app.get('/client.js', (req, res) => {
    res.sendFile(path.join(__dirname, '/client.js'))
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})