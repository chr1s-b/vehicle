console.log("Loaded client.js");

load('http://localhost:5000/guess', {'guess': 'CU57ABC'}, console.log)

var currentRow=1;
currentLetter=1;
currentLetters = ""

document.onkeydown = function(evt) {
    evt = evt || window.event;
    var char = evt.key;
    //console.log(char.toUpperCase(),currentLetter,currentLetters, "ABCDEFGHIJKLMNOPQRSTUVWXYZ".includes(char.toUpperCase()))
    if(char=="Backspace" && currentLetter>0){
        currentDiv = document.getElementById("box"+currentRow.toString()+currentLetter.toString())
        currentDiv.innerHTML="";
        currentLetter-=1;
        currentLetter=Math.max(1,currentLetter)
        currentLetters.slice(0,-1);
    }else if(currentLetter<8 &&  "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".includes(char.toUpperCase())){
        
        currentLetters+=char.toUpperCase();
        currentDiv = document.getElementById("box"+currentRow.toString()+currentLetter.toString())
        console.log(currentDiv);
        //console.log("Box"+currentRow.toString()+currentLetter.toString())
        currentDiv.innerHTML="<p class='submitted-letter'>"+char.toUpperCase()+"</p>";
        currentLetter+=1;
        currentLetter = Math.min(currentLetter,7)

    }else if(char=="Enter" && currentLetter==7){
        currentRow=Math.min(currentRow+1,7);
        currentLetters=""
        currentLetter=1;
    }
    
};

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