const evaluatorEndpoint = 'http://localhost:5000/guess';

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

    if (hintString == [2,2,2,2,2,2,2]) {
        // all correct, end game
        console.log("End game. Score:")
        console.log(currentRow-1)
        // trigger popup
        var endmsg = document.getElementById("endmsg");
        endmsg.innerHTML = currentLetters+"<br>Score: "+(currentRow-1).toString();
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

function sharetoclipboard() {
    console.log("pain");
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
    xhr.send(JSON.stringify(data));
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