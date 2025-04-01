function validatePoolSize() {
        let poolSize;
        if (poolSizeSelect.value === "custom") {
            poolSize = Number(customPoolSize.value)
            if (!poolSize || poolSize <= 0) {
                alert("Please add a number bigger than 0");
                return null;
            }
        } else {
            poolSize = Number(poolSizeSelect.value)
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