console.log("Dashboard JS loaded ✅")

const socket = io(); //! 👈 connects to the server

const poolSizeSelect = document.getElementById("pool-size-select");
console.log("pool size input", poolSizeSelect);
const customPoolSize = document.getElementById("custom-pool-size");
console.log("Custom input was added", customPoolSize);
const startButton = document.querySelector(".start-button");
console.log("Start Button", startButton);
const lapDisplay = document.querySelector(".lap-display");
console.log("lap Display", lapDisplay);
const lapCounter = document.querySelector(".lap-counter");
console.log("Lap counter", lapCounter);
const lapTime = document.querySelector(".lap-time");
console.log("Display lap time", lapTime);
const stopButton = document.querySelector(".stop-session");
console.log("Stop Session button", stopButton);
const displayLastPartial = document.querySelector(".display-last-partial");
console.log("Logs every last partial", displayLastPartial);
const displayLastLap = document.querySelector(".display-last-lap");
console.log("Display always the last lap", displayLastLap);
const displayAverage = document.querySelector(".display-average");
console.log("Display the average of all laps inside the lapTimes[]", displayAverage);
const resetButton = document.querySelector(".restore-session");
console.log("Reset all information about last session", resetButton)

let lap = 0;
let lapIntervalHalf = null;
let lapIntervalFinal = null;
let fastestLap = null;
let fastPartial = null;

//! storing the laps on local (in-memory)
let partialTimes = []; //? information cleared after reset button
let lapTimes = []; //? information cleared after reset button
let sessionRecords = []; //? information stored for future user consult, even after reset button

// ! Event listeners
startButton.addEventListener("click", startSession);
stopButton.addEventListener("click", stopSession);
resetButton.addEventListener("click", resetSession);


// ?? Transforming the code into modular sections.
// TODO Sections roadmap for now.
    //TODO [x] startSession
    //TODO [x] stoptSession
    //TODO [x] resetSession
    //TODO [] storeSession

const startSession = () => {
    const poolSizeValid = validatePoolSize();
    if (!poolSizeValid) return;
    
    console.log("Pool size confirmed:", poolSizeValid);
    
    poolSizeSelect.classList.add("hidden");
    const lapDisplay = document.querySelector(".lap-display");
    lapDisplay.classList.remove("hidden");
    
    lapsSimulation();
}

const stopSession = () => {
    clearInterval(lapIntervalFinal);
    clearInterval(lapIntervalHalf);
    console.log("🛑 Simulation stopped.");
}

const resetSession = () => {
    partialTimes.splice(0, partialTimes.length);
    lapTimes.splice(0, lapTimes.length);
    
    lapTime.textContent = "--:--.--"
    displayLastLap.textContent = "--:--.--"
    displayAverage.textContent = "--:--.--"
    displayLastPartial.textContent = "--:--.--"
    document.querySelector(".display-partial-record").textContent = "--:--.--";
    document.querySelector(".display-record").textContent = "--:--.--";
    
    //! Reset color scheme
    displayLastPartial.style.color = "inherit";
    displayLastLap.style.color = "inherit";
    
    //! Reset fastest values
    fastestLap = null;
    fastPartial = null;
    
    console.log("🔄 Session reset complete.");
}



const storeSessionRecords = () => {

};



