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
let sessionRecords =[]; //? information stored for future user consult, even after reset button

// ! wire up the Start Session button to detect when it’s clicked and grab the pool size input.

startButton.addEventListener("click", () => {
    
    // ! validation pool size
    let poolSize;

    if (poolSizeSelect.value === "custom") {
        poolSize = Number(customPoolSize.value);
    
        if (!poolSize || poolSize <= 0) {
        alert("Please insert a number bigger than 0.");
        return;
        }
    } else {
        poolSize = Number(poolSizeSelect.value);
    }
    
    //! remove and add values after function validation
    poolSizeSelect.classList.add("hidden");
    console.log("👋 Hiding setup section:", poolSizeSelect);

    const lapDisplay = document.querySelector(".lap-display");
    lapDisplay.classList.remove("hidden");
    console.log("👋 Showing lap display:", lapDisplay);

    lapsSimulation();

});

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

function generateFakeTime() {
    const min = Math.floor(Math.random() * 2);
    const sec = Math.floor(Math.random() * 60);
    const ms = Math.floor(Math.random() * 100);

    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}.${String(ms).padStart(2, "0")}`;


};

// function storeSessionRecords() {

// };

//! destructuring lapTimes array into ms.

function timeToMs(timeString) {
    console.log("⏱️ Raw time string:", timeString);

    const [minSec, ms]  = timeString.split(".");
    console.log("🧩 After splitting by '.':", "minSec =", minSec, "| ms =", ms);

    const [min, sec] = minSec.split(":");
    console.log("🔍 After splitting by ':':", "min =", min, "| sec =", sec);

    const totalMs = (Number(min) * 60 * 1000) + (Number(sec) * 1000) + Number(ms);
    console.log("Total in ms", totalMs);

    return totalMs;
};

function msToTime(ms) {
    const min = Math.floor(ms / 60000);
    const sec = Math.floor((ms % 60000) / 1000);
    const msRemain = Math.floor((ms % 1000) / 10);
    console.log(min, sec, msRemain);

    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}.${String(msRemain).padStart(2, "0")}`;
};

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
    // return formatted;
    
    displayAverage.textContent = `${formatted}`;
}

