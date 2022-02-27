const evaluatorEndpoint = 'http://www.dailyvehicle.tech/guess';
const imgEndpoint='http://www.dailyvehicle.tech/image'

var currentRow=1;
currentLetter=1;
currentLetters = ""

document.onkeydown = function(evt) {
    if (currentRow > 6) { return; }
    evt = evt || window.event;
    var char = evt.key;
    if(char=="Backspace" && currentLetter>1){
        currentLetter-=1;
        currentDiv = document.getElementById("box"+currentRow.toString()+currentLetter.toString())
        currentDiv.innerHTML="";
        currentLetters = currentLetters.slice(0,-1);
    }else if(currentLetter<8 &&  "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".includes(char.toUpperCase())){
        currentLetters+=char.toUpperCase();
        currentDiv = document.getElementById("box"+currentRow.toString()+currentLetter.toString())
        currentDiv.innerHTML="<p class='submitted-letter'>"+char.toUpperCase()+"</p>";
        currentLetter+=1;

    }else if(char=="Enter" && currentLetter==8){
        currentRow+=1;
        // evaluate guess
        load(evaluatorEndpoint, {'guess': currentLetters}, showHint);
        currentLetters="";
        currentLetter=1;
        // check for lose condition
        if (currentRow == 7) {
            // lost
            endmsg.innerHTML = "Nope. Score: 0"
            getImg();
            displayPopup()
        }
    }

    
};

function showHint(hintString) {
    // states contains class names to assign to boxes
    var states = ['incorrect', 'present', 'correct'];
    // change class of each cell for css
    for (var i = 1; i < 8; i++) {
        var boxname = "box"+(currentRow-1).toString()+i.toString();
        var box = document.getElementById(boxname);
        box.classList.add(states[hintString[i-1]]);
    }

    if (hintString == "2222222") {
        // all correct, end game
        // trigger popup
        var endmsg = document.getElementById("endmsg");
        endmsg.innerHTML = "Yep. Score: "+(7-(currentRow-1)).toString();
        displayPopup()
    }
}

function displayPopup() {
    // show popup at end of game
    var popup = document.getElementById("overlay");
    popup.style.display = "block";
    doTimer(document.getElementById("countdown"));
}

function closeoverlay() {
    var popup = document.getElementById("overlay");
    popup.style.display = "none";
}

function createShareString(){
    s=""
    for(let i =1;i<7;i++){
        for(let j=1;j<8;j++){
            u = document.getElementById("box"+i.toString()+j.toString()).classList;
            if(u.contains("correct")){
                s+="🟩"
            }else if (u.contains("present")){
                s+="🟨"
            }else if (u.contains("incorrect")){
                s+="⬛"
            }else{
                return ("www.dailyvehicle.tech  "+(i-1).toString()+"/6 \n"+s)
            }
        }
        s+="\n"
    }
    if(s.includes("🟩🟩🟩🟩🟩🟩🟩")){ // we found the correct number plate
        return ("www.dailyvehicle.tech  "+(6).toString()+"/6 \n"+s)
    } 
    //the number palte was not guessed
    return ("www.dailyvehicle.tech  X/6 \n"+s)
}


function sharetoclipboard() {
    console.log(createShareString())
    navigator.clipboard.writeText(createShareString())
}

function load(url, data, callback) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            callback(xhr.response);
        }
    }

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Access-Control-Allow-Origin','*') // i care alot

    xhr.send(JSON.stringify(data));
}
function loadImageToPopUp(s){
    imgEl = document.getElementById("rewardImg");
    imgEl.src=s;
}
function getImg(){
    imgUrl = load(imgEndpoint, {'image': "10"}, loadImageToPopUp)
}

function doTimer(timerelement) {
    var countDownDate = new Date("Jan 1, 2000 00:00:00").getTime();
    var x = setInterval(function() {
        var now = new Date().getTime();

        var distance = countDownDate - now;

        var hours = 24 + Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = 60 + Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = 60 + Math.floor((distance % (1000 * 60)) / 1000);

        timerelement.innerHTML = hours + ":" + minutes + ":" + seconds;
    }, 1000);
}


