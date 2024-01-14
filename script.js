let set = document.getElementById("set");
let hh = document.getElementById("span1");
let mm = document.getElementById("span2");
let ss = document.getElementById("span3");
let timerList = document.getElementById("timerDisplay");
let noTimer = document.getElementById("noTimer");
let timerEnd = document.getElementById("timerEnd");
const audio = document.getElementById("audio");

hh.addEventListener("input", function () {
    console.log(hh.value);
    if (!(hh.value >= 0 && hh.value <= 99) || isNaN(parseInt(hh.value))) {
        alert("Please enter a valid number between 0 and 9.");
        hh.value = ""; // Clear the input value
        return;
    }
    
    if (hh.value.length >= 2) {
        console.log("2");
        mm.innerText = ""; // Clear existing content
        mm.contentEditable = "true";
        mm.focus();
    }

});

mm.addEventListener("input",function(){
     console.log("mm");
     if (!(mm.value >= 0 && mm.value <= 99) || isNaN(parseInt(mm.value))) {
        alert("Please enter a valid number between 0 and 9.");
        mm.value = ""; // Clear the input value
        return;
    }
     if(mm.value.length >=2){
        ss.innerText = '';
        ss.isContentEditable = "true";
        ss.focus();
     }
})

ss.addEventListener("input",function(){
    if (!(ss.value >= 0 && ss.value <= 99) || isNaN(parseInt(ss.value))) {
        alert("Please enter a valid number between 0 and 9.");
        ss.value = ""; // Clear the input value
        return;
    }
     if(ss.value.length >=2){
         set.focus();
     }
})

let timers = {};  // Create an object to store timers

set.addEventListener("click", function () {
    console.log("set");
  
  // Get the values of hours, minutes, and seconds
    let hoursValue = document.getElementById("span1").value || 0;
    let minutesValue = document.getElementById("span2").value || 0;
    let secondsValue = document.getElementById("span3").value || 0;

    // Calculate the total time in seconds
    let totalTimeInSeconds = (parseInt(hoursValue, 10) * 3600) + (parseInt(minutesValue, 10) * 60) + parseInt(secondsValue, 10);

    let timerId = `timer_${Date.now()}`;

    // Store the timer information in the 'timers' object
    timers[timerId] = {
        totalTimeInSeconds: totalTimeInSeconds,
        intervalId: null,  // Placeholder for the interval ID
        displayTimer: createDisplayTimer(timerId)  // Function to create and return displayTimer
    };

    // Start the timer
    startTimer(timerId);

     hh.value = "";
     mm.value = "";
     ss.value = "";
});

function createDisplayTimer(timerId) {
    let displayTimer = document.createElement("div");
    displayTimer.setAttribute("id", timerId);
    displayTimer.innerHTML = `
        <p>time left :</p>
        <div id="timerDisplay_${timerId}">${hh.value}:${mm.value}:${ss.value}</div>
        <button id="delete_${timerId}">Delete</button>
    `;
    timerList.appendChild(displayTimer);
    noTimer.style.display = "none";

    // Add event listener to the delete button
    let deleteBtn = document.getElementById(`delete_${timerId}`);
    deleteBtn.setAttribute("class","deleteButton");
    deleteBtn.addEventListener("click", function () {
        // Find the closest parent div (displayTimer) and hide it
        let displayTimer = document.getElementById(timerId);
        if (displayTimer) {
           // displayTimer.style.display = "none";
          // displayTimer.remove();
            clearInterval(timers[timerId].intervalId);  // Stop the associated interval
            delete timers[timerId];
            displayTimer.style.display = "none";
        }
        if (Object.keys(timers).length === 0) {
            noTimer.style.display = "block";
        }
        
    });

    return displayTimer;
}

function startTimer(timerId) {
    let timer = timers[timerId];

    timer.intervalId = setInterval(function () {
        if (timer.totalTimeInSeconds > 0) {
            timer.totalTimeInSeconds--;
            document.getElementById(`timerDisplay_${timerId}`).innerHTML = `
                <div>${formatTime(timer.totalTimeInSeconds)}</div>
            `;
        } else {
            clearInterval(timer.intervalId);  // Stop the timer when it reaches 0
            let timerUp = document.createElement("div");
            let stop = document.createElement("button");
            stop.innerText = "stop";
            stop.setAttribute("id","stop");
        
            timerUp.innerText = "Timer Is Up !";
            timerUp.appendChild(stop);
            timerUp.setAttribute("id", "timerUp");
            timerEnd.appendChild(timerUp);
           
            audio.play();
            // Corrected line for setting display to "none"

            timer.displayTimer.style.display = "none";

            stop.addEventListener("click",function(){
                audio.pause();
            })
        }
    }, 1000);
}

// Function to format time in HH:mm:ss format
function formatTime(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let remainingSeconds = seconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
   //String(hours), String(minutes), String(remainingSeconds): Convert the numerical values of hours, minutes, and remaining seconds to strings. This is done to ensure that each part of the time is represented as a string.

  //.padStart(2, '0'): The padStart method is used to ensure that each part (hours, minutes, and seconds) is at least two characters long. If the string length is less than 2, it pads the string with '0' characters at the beginning. This ensures that each part is displayed with two digits. For example, '5' becomes '05'.
}
