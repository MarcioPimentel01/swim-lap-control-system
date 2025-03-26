const socket = io(); //! 👈 connects to the server

const poolSizeInput = document.getElementById("pool-size");
const start = document.querySelector(".start");
const lapDisplay = document.querySelector(".lap-display");
const lapCounter = document.querySelector(".lap-counter");
const lapTime = document.querySelector(".lap-time");

