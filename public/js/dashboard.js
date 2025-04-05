console.log("Dashboard JS loaded ✅")

const socket = io(); //! 👈 connects to the server
console.log("Socket connected", socket);

import { initPasswordVisibilityToggle } from './utils-html.js';


document.addEventListener("DOMContentLoaded", () => {
    initPasswordVisibilityToggle();
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
        if (poolSizeValid === true) {
            
            poolSizeSelect.classList.add("d-none");
            const lapDisplay = document.querySelector(".lap-display");
            lapDisplay.classList.remove("d-none");
            
            lapsSimulation();
        }
        
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

    function generateFakeTime() {
        const min = Math.floor(Math.random() * 2);
        const sec = Math.floor(Math.random() * 60);
        const ms = Math.floor(Math.random() * 100);
        return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}.${String(ms).padStart(2, "0")}`;
        }
        
        function lapAverage() {
        if (lapTimes.length === 0) {
            console.log("⚠️ No laps recorded yet.");
            return "--:--.--"
        }
        const totalMs = lapTimes.reduce((acc, lap) => {
            return acc + lap.ms;
          }, 0); //! 👈 THIS is the initial value for the accumulator
        
        const averageMS = totalMs / lapTimes.length
        const formatted = msToTime(averageMS);
        
        console.log("📊 Lap average:", formatted);
        
        //! return formatted;
        displayAverage.textContent = `${formatted}`;
        }
        
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
    
    // ! Event listeners
    startButton.addEventListener("click", startSession);
    stopButton.addEventListener("click", stopSession);
    resetButton.addEventListener("click", resetSession);
})





