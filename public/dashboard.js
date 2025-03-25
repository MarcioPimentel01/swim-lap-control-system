const socket = io();

socket.on("lapUpdate", (data) => {
    document.getElementById("lap").innerText = `Lap ${data.lap}: ${data.time}`;
    console.log("got lap Update", data)
})