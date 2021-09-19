const { ipcRenderer } = require("electron");

let button = document.querySelector("button");

button.addEventListener("click", function () {
    ipcRenderer.on("from-main", function (event, args) {
        console.log("received " + args);
    });

    ipcRenderer.send("from-script", "ping");

    console.log("sent ping");
});
