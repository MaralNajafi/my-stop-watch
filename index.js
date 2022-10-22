// variables
const lightSwitchArea = document.getElementsByClassName("lightSwitchArea")[0];
const container = document.getElementsByClassName("container")[0];
const secCounter = document.getElementById("secCounter");
const minCounter = document.getElementById("minCounter");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const clearBtn = document.getElementById("clearBtn");
const lapBtn = document.getElementById("lapBtn");
const timer = document.getElementById("timer");
const lapResultsWrapper = document.getElementById("lapResultsWrapper");
const lapResultBody = document.getElementById("lapResultBody");

let counter = 0;
let counterMin = 1;
let counterLap = 1;
let timerInterval;

// functions

// Handling the display of the timer
function counterFixFn(theCounter, theOutput) {
    if (theCounter >= 10) {
        theOutput.textContent = theCounter;
    }else{
        theOutput.textContent = `0${theCounter}`;
    }
};


lapBtn.disabled = true;

// "start" function

function startFn() {
    
    lapResultsWrapper.style.height = "10rem";
    lapResultsWrapper.style.visibility = "visible";
    lapResultsWrapper.style.opacity = "1";

    //timeInterval function inside the start function
        timerInterval = setInterval(() => {
            counter++;

            // Handling the display of the timer
            counterFixFn(counter, secCounter);
            
            if (counter == 59) {
                counter = 0;
                secCounter.textContent = "0" + counter;
                counterMin++;
                // Handling the display of the timer
                counterFixFn(counterMin, minCounter); 
            }
        }, 1000);


    // Handling lap btn activity //lap == track btn

        lapBtn.disabled = false;
       
    // Timer's style due to start function
        timer.classList.add("started");
        timer.classList.remove("stopped");

    // Buttons's style due to start function
        startBtn.style.display = "none";
        startBtn.textContent = "Resume";
        stopBtn.style.display = "inline";
}


// "stop" function

function stopFn() {
    clearInterval(timerInterval);

    // Buttons's style due to stop function
    startBtn.style.display = "inline";
    stopBtn.style.display = "none";

    // Timer's style due to stop function
    timer.classList.add("stopped");
    timer.classList.remove("started");
}

// "clear" function

function clearFn() {
    clearInterval(timerInterval);

    counter = 0;
    secCounter.textContent = "0" + counter;
    minCounter.textContent = "00";

    // Buttons' style due to clear function
    startBtn.style.display = "inline";
    startBtn.textContent = "Start";
    stopBtn.style.display = "none";
    lapBtn.disabled = true;

    // Timer's style due to clear function
    timer.classList.remove("started");
    timer.classList.remove("stopped");

    //clearing the results
    lapResultsWrapper.style.height = "0";

    let lapResultsArr = document.querySelectorAll(".lapResults");
    lapResultsArr.forEach(lapResult => {
        lapResult.parentNode.removeChild(lapResult);
    });

    lapResultsWrapper.style.height = "0";
    lapResultsWrapper.style.visibility = "hidden";
    lapResultsWrapper.style.opacity = "0";

    counterLap = 1;
}

// "lap" function

function lapFn(){

    let lapNumberValue;
    let lapTimeValue = timer.textContent;

    // Handling the display of the timer
    if (counterLap >= 10) {
        lapNumberValue = counterLap;
    }else{
        lapNumberValue = `0${counterLap}`;
    }
    // appending a lapResults , lapNumber and lapTime
    lapResults = document.createElement('div');
    lapResults.classList.add("lapResults");
    lapResultBody.appendChild(lapResults);
    
    lapNumber = document.createElement('div');
    lapNumber.classList.add("lapNumber");
    lapNumber.appendChild(document.createTextNode(lapNumberValue));
    lapResults.appendChild(lapNumber);

    lapTime = document.createElement('div');
    lapTime.classList.add("lapTime");
    lapTime.appendChild(document.createTextNode(lapTimeValue));
    lapResults.appendChild(lapTime);
    counterLap++;

   
}
// Event listeners
startBtn.addEventListener("click", startFn);
stopBtn.addEventListener("click", stopFn);
clearBtn.addEventListener("click", clearFn);
lapBtn.addEventListener("click", lapFn);

