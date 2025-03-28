let tempUnit = "F";
let temp = 96.1;

let start = false;
let isClock = false;

const clockEmojiArr = [['🕛','🕧'],['🕐','🕜'],['🕑','🕝'],['🕒','🕞'],['🕓','🕟'],['🕔','🕠'],['🕕','🕡'],['🕖','🕢'],['🕗','🕣'],['🕘','🕤'],['🕙','🕥'],['🕚','🕦'] ];

let d = new Date();
const clock ={
    hour:d.getHours(),
    minute:d.getMinutes(),
    amORpm :d.getHours() <= 12 ? "am" : "pm",
    toUSA : d.getHours()===0 ? 12 : d.getHours() % 12,

    hourDisplay : "",
    minuteDisplay : "",
    emote:""
}
clock.hourDisplay = clock.toUSA < 10 ? "0" + clock.toUSA: clock.toUSA,
clock.minuteDisplay = clock.minute < 10 ? "0" + clock.minute : clock.minute


const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const tempEl = document.getElementById("tempature");
const modeEl = document.getElementById("mode");
const ampmEl = document.getElementById("Am/Pm");
const modeEmoteEl = document.getElementById("modeEmote");
const screenEl = document.getElementById("screen");

let ticker = setInterval(tick,1000);

const timer = {
    minutes:0,
    seconds:0
}

tempEl.innerHTML = temp;

let alarmSound = new Audio("./clock-alarm-8761.mp3");

function toggleTempatureUnit(){
    if(tempUnit==="F"){
        tempUnit="C";
        temp = ((5/9) * (temp - 32)).toFixed(1);
        document.getElementById("tempature_unit").innerHTML= tempUnit;
    }
    else{
        tempUnit="F";
        temp = ((9/5) * temp + 32).toFixed(1);
        document.getElementById("tempature_unit").innerHTML= tempUnit;
    }
    tempEl.innerHTML = temp;
    seconds.innerHTML= timer.seconds < 10 ? "0" + timer.seconds : timer.seconds;
}

function addMinute(){
    if(isClock) return;
    if(timer.minutes<59){
        timer.minutes++;
    }else{
        timer.minutes=0;
    }
    minutes.innerHTML= timer.minutes < 10 ? "0" + timer.minutes : timer.minutes;
    clearInterval(ticker);
    ticker = setInterval(tick,1000);
}

function addSecond(){
    if(isClock) return;
    if(timer.seconds<59){
        timer.seconds++;
    }else{
        timer.seconds=0;
    }

    seconds.innerHTML= timer.seconds < 10 ? "0" + timer.seconds : timer.seconds;
    clearInterval(ticker);
    ticker = setInterval(tick,1000);
}

function Start(){
    start = !start;    
}

function FormatClock(){
    clock.amORpm = clock.hour <= 12 ? "am" : "pm";
    clock.toUSA = clock.hour===0 ? 12 : clock.hour % 12;

    clock.emote = clockEmojiArr[clock.hour % 12][Math.floor(clock.minute/30)];
    clock.hourDisplay = clock.toUSA < 10 ? "0" + clock.toUSA: clock.toUSA;
    clock.minuteDisplay = clock.minute < 10 ? "0" + clock.minute : clock.minute;
}



function toggleClock(){
    isClock = !isClock;
    if(isClock){
        d = new Date();
        clock.hour = d.getHours();
        clock.minute = d.getMinutes();
        FormatClock();
        modeEmoteEl.innerHTML = clock.emote;
        minutes.innerHTML=clock.hourDisplay;
        seconds.innerHTML=clock.minuteDisplay;
        modeEl.innerHTML = "Clock";
    }else{
        minutes.innerHTML= timer.minutes < 10 ? "0" + timer.minutes : timer.minutes;
        seconds.innerHTML= timer.seconds < 10 ? "0" + timer.seconds : timer.seconds;
        modeEl.innerHTML = "Timer";
        modeEmoteEl.innerHTML = '⏰';
    }
}


function tick(){
    d = new Date();
    clock.amORpm = d.getHours() <= 12 ? "AM" : "PM";
    ampmEl.innerHTML = clock.amORpm;
    if(!isClock){
        minutes.innerHTML= timer.minutes < 10 ? "0" + timer.minutes : timer.minutes;
        seconds.innerHTML= timer.seconds < 10 ? "0" + timer.seconds : timer.seconds;

        if(start){
        if(timer.minutes===0 && timer.seconds===0){
            // Alarm
            screenEl.classList.add("LEDs");
            alarmSound.play();
            setTimeout(()=>{
                alarmSound.load();
                alarmSound.play();
            },5500)

            setTimeout(()=>{
                alarmSound.load();
                screenEl.classList.remove("LEDs");
            }, 12000)
            start = !start;
        }
        else if(timer.minutes!=0 || (timer.minutes===0 && timer.seconds!=0)){
            timer.seconds--;
                
            if(timer.seconds===-1 && timer.minutes!=0){
                timer.seconds=59;
                timer.minutes--;
            }
        }

    
        minutes.innerHTML= timer.minutes < 10 ? "0" + timer.minutes : timer.minutes;
        seconds.innerHTML= timer.seconds < 10 ? "0" + timer.seconds : timer.seconds;
    
    }}

    if(isClock){
        minutes.innerHTML=clock.hourDisplay;
        seconds.innerHTML=clock.minuteDisplay;
        modeEmoteEl.innerHTML = clock.emote;

        d = new Date();
        clock.hour = d.getHours();
        clock.minute = d.getMinutes();
        FormatClock();
    }

}


