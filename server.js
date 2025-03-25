const express = require("express");
console.log("calling express", typeof express)

const app = express(); //!This creates an instance of an Express app, kind of like saying "hey, here’s my web server."
console.log("hey, here is my web server", typeof app)
console.log("is .listen a function?", typeof app.listen === "function")
console.log("is .get a function?", typeof app.get === "function")

app.use(express.static("public"));


app.listen(3000, () => {
    console.log("Server running on http://localhost:3000/dashboard.html");
});

//? requiring socketIO - fast communication for sensors

const http = require("http");
console.log("calling http", typeof http)

const server = http.createServer(app) // !👈 manually creates the HTTP server

const socketIO = require("socket.io");
console.log("calling socketIO", typeof socketIO)

const io = socketIO(server) //! 👈 bind Socket.IO to it