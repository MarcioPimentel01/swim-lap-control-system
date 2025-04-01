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
const stopSession = document.querySelector(".stop-session");
console.log("Stop Session button", stopSession);
const displayLastPartial = document.querySelector(".display-last-partial");
console.log("Logs every last partial", displayLastPartial);
const displayLastLap = document.querySelector(".display-last-lap");
console.log("Display always the last lap", displayLastLap);
const displayAverage = document.querySelector(".display-average");
console.log("Display the average of all laps inside the lapTimes[]", displayAverage);
const restoreSession = document.querySelector(".restore-session");
console.log("Reset all information about last session", restoreSession)

let lap = 0;
let lapIntervalHalf = null;
let lapIntervalFinal = null;
let fastestLap = null;
let fastPartial = null;

//! storing the laps on local (in-memory)
let partialTimes = []; //? information cleared after reset button
let lapTimes = []; //? information cleared after reset button
let sessionRecords = []; //? information stored for future user consult, even after reset button

// ?? Transforming the code into modular sections.
// TODO Sections roadmap for now.
    //TODO [x] startSession
    //TODO [] stoptSession
    //TODO [] resetSession
    //TODO [] storeSession

    function startSession() {
        startButton.addEventListener("click", () => {
    
            const poolSizeValid = validatePoolSize();
            if (!poolSizeValid) return;
    
            // You can optionally use it now
            console.log("Pool size confirmed:", poolSizeValid);
    
            poolSizeSelect.classList.add("hidden");
            const lapDisplay = document.querySelector(".lap-display");
            lapDisplay.classList.remove("hidden");
    
            lapsSimulation();
        });
    }
    


stopSession.addEventListener("click", () => {
    clearInterval(lapIntervalFinal);
    clearInterval(lapIntervalHalf);
    console.log("🛑 Simulation stopped.");
});

restoreSession.addEventListener("click", () => {
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
});

//! lap simulation - to be removed when modules UWB DWM1001 arrives
function lapsSimulation() {
    lap = 0;

    lapIntervalHalf = setInterval(() => {
        console.log(`⏱️ Partial (half-lap) triggered`);
    
        const raw = generateFakeTime();
        const ms = timeToMs(raw);
        const partialObj = { raw, ms };
        partialTimes.push(partialObj);
        console.log("Fast Partial entry ok", partialObj);
    
        displayLastPartial.textContent = raw;
    
        //! Check if this is not the first partial
        if (partialTimes.length > 1) {
            const previous = partialTimes[partialTimes.length - 2].ms;
    
            if (ms < previous) {
                displayLastPartial.style.color = "lightgreen";
            } else {
                displayLastPartial.style.color = "crimson";
            }
        } else {
            //! First partial → neutral color
            displayLastPartial.style.color = "inherit";
        }
    
        if (fastPartial === null || ms < fastPartial) {
            fastPartial = ms;
            document.querySelector(".display-partial-record").textContent = raw;
            document.querySelector(".display-partial-record").style.color = "lightgreen";
        }
    }, 2000);
    


    lapIntervalFinal = setInterval(() => {
        lap++;
        const raw = generateFakeTime();
        const ms = timeToMs(raw);
        const lapObj = { raw, ms };
        lapTimes.push(lapObj);
        console.log("Fake lap times pushed to the array", lapTimes);
    
        lapCounter.textContent = `Lap ${lap}`;
        lapTime.textContent = lapObj.raw;
        displayLastLap.textContent = raw;
    
        // 🟢 Lap comparison logic
        if (lapTimes.length > 1) {
            const previous = lapTimes[lapTimes.length - 2].ms;
            if (ms < previous) {
                displayLastLap.style.color = "lightgreen";
            } else {
                displayLastLap.style.color = "crimson";
            }
        } else {
            displayLastLap.style.color = "inherit"; // First lap = neutral
        }
    
        // 🏁 Fastest lap record
        if (fastestLap === null || ms < fastestLap) {
            fastestLap = ms;
            document.querySelector(".display-record").textContent = raw;
            document.querySelector(".display-record").style.color = "lightgreen";
        }
    
        lapAverage();
    
        console.log(`🏁 Lap ${lap} - Time: ${raw}`);
    }, 4000);
    
}
// function storeSessionRecords() {

// };



