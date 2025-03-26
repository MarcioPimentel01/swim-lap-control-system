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
    
});


