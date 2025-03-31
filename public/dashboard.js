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

const displayLastPartial = document.querySelector(".display-last-partial")
console.log("Logs every last partial", displayLastPartial);

const displayLastLap = document.querySelector(".display-last-lap");
console.log("Display always the last lap", displayLastLap);

const displayAverage = document.querySelector(".display-average")
console.log("Display the average of all laps inside the lapTimes[]", displayAverage)

//! lap simulation

let lap = 0;
let lapIntervalHalf = null;
let lapIntervalFinal = null;
let fastestLap = null;

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
    
    // const setUpPoolSize = document.querySelector("pool-size-select")
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


function lapsSimulation() {
    lap = 0;

    lapIntervalHalf = setInterval(() => {
        console.log(`⏱️ Partial (half-lap) triggered`);

        const partialTime = generateFakeTime();
        partialTimes.push(partialTime);
        console.log("📥 Partial Times:", partialTimes);

        displayLastPartial.textContent = partialTimes[partialTimes.length - 1];

    }, 2000);


    lapIntervalFinal = setInterval(() => {
        lap++;
        const raw = generateFakeTime();
        const ms = timeToMs(raw);
        const lapObj = {raw, ms};
        lapTimes.push(lapObj);
        console.log("Fake lap times pushed to the array", lapTimes);

        lapCounter.textContent = `Lap ${lap}`
        lapTime.textContent = lapObj.raw;
        displayLastLap.textContent = lapTimes[lapTimes.length - 1].raw;

        lapAverage();

        if (fastestLap === null || ms < fastestLap) {
            fastestLap = ms
            document.querySelector(".display-record").textContent = raw
        }

        console.log(`🏁 Lap ${lap} - Time: ${raw}`);
    }, 4000);

    stopSession.addEventListener("click", () => {
        clearInterval(lapIntervalFinal);
        clearInterval(lapIntervalHalf);
        console.log("🛑 Simulation stopped.");
    });      
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
lap