const poolSizeSelect = document.getElementById("pool-size-select");
console.log("pool size input", poolSizeSelect);
const customPoolSize = document.getElementById("custom-pool-size");
console.log("Custom input was added", customPoolSize);

poolSizeSelect.addEventListener("change", () => {
    if (poolSizeSelect.value === "custom") {
        customPoolSize.classList.remove("d-none");
    } else {
        customPoolSize.classList.add("d-none");
    }
});

function validatePoolSize() {
    let poolSize;
    if (poolSizeSelect.value === "custom") {
        poolSize = Number(customPoolSize.value);
        if (!poolSize || poolSize <= 0) {
            alert("Please add a number bigger than 0");
            return null;
        }
    } else {
        poolSize = Number(poolSizeSelect.value);
    }
    return poolSize;
}


function msToTime(ms) {
const min = Math.floor(ms / 60000);
const sec = Math.floor((ms % 60000) / 1000);
const msRemain = Math.floor((ms % 1000) / 10);
return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}.${String(msRemain).padStart(2, "0")}`;
}

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