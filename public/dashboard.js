console.log("Dashboard JS loaded ✅")

const socket = io(); //! 👈 connects to the server

const poolSizeInput = document.getElementById("pool-size");
console.log("pool size input", poolSizeInput);

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

//! lap simulation

let lap = 0;
let lapIntervalHalf = null;
let lapIntervalFinal = null;

//! storing the laps on local (in-memory)

let partialTimes = []; //? information cleared after reset button
let lapTimes = []; //? information cleared after reset button
let sessionRecords =[]; //? information stored for future user consult, even after reset button

// ! wire up the Start Session button to detect when it’s clicked and grab the pool size input.

startButton.addEventListener("click", () => {
    const poolSize = Number(poolSizeInput.value);
    console.log("Pool Size entered", poolSize);
    
    
    // ! validation pool size
    if (!poolSize || poolSize <= 0) {
        alert("Please enter a valid pool size greater than 0.");
        return;
    }
    console.log("✅ Valid pool size was added", poolSize);


    //! remove and add values after function validation
    
    const setupSection = document.querySelector(".setup-pool-size")
    setupSection.classList.add("hidden");
    console.log("👋 Hiding setup section:", setupSection);

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
        const fakeTime = generateFakeTime();
        lapTimes.push(fakeTime);
        console.log("Fake lap times pushed to the array", lapTimes);

        lapCounter.textContent = `Lap ${lap}`
        lapTime.textContent = fakeTime;

        displayLastLap.textContent = lapTimes[lapTimes.length - 1];

        console.log(`🏁 Lap ${lap} - Time: ${fakeTime}`);
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
};
