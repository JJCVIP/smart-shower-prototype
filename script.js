let tempUnit = "F";
let temp = 96.1;

let start = false;
let isClock = false;

let d = new Date();
const clock ={
    hour:d.getHours(),
    minute:d.getMinutes()
}


const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");

const tempEl = document.getElementById("tempature");

const timer = {
    minutes:0,
    seconds:0
}

tempEl.innerHTML = temp;

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
    if(timer.minutes<59){
        timer.minutes++;
    }else{
        timer.minutes=0;
    }
    minutes.innerHTML= timer.minutes < 10 ? "0" + timer.minutes : timer.minutes;

}

function addSecond(){
    if(timer.seconds<59){
        timer.seconds++;
    }else{
        timer.seconds=0;
    }

    seconds.innerHTML= timer.seconds < 10 ? "0" + timer.seconds : timer.seconds;
}

function Start(){
    start = !start;    
}


function toggleClock(){
    isClock = !isClock;
    if(isClock){
        clock.hour = d.getHours();
        clock.minute = d.getMinutes();
        minutes.innerHTML=clock.hour;
        seconds.innerHTML=clock.minute;
    }else{
        minutes.innerHTML= timer.minutes < 10 ? "0" + timer.minutes : timer.minutes;
        seconds.innerHTML= timer.seconds < 10 ? "0" + timer.seconds : timer.seconds;
    }
}


setInterval(()=>{
    if(!isClock){
        if(start){
        if(timer.minutes===0 && timer.seconds===0){
            // Alarm
        }
        else if(timer.minutes!=0){
            timer.seconds--;
        }
    
        if(timer.seconds===0 && timer.minutes!=0){
            timer.minutes--;
        }
    
    
        if(timer.minutes != 0 && timer.seconds===-1){
            timer.seconds=59;
        }
    
        minutes.innerHTML= timer.minutes < 10 ? "0" + timer.minutes : timer.minutes;
        seconds.innerHTML= timer.seconds < 10 ? "0" + timer.seconds : timer.seconds;
    
    }}

    if(isClock){
        minutes.innerHTML=clock.hour;
        seconds.innerHTML=clock.minute;

        clock.hour = d.getHours();
        clock.minute = d.getMinutes();
    }

}, 10)
