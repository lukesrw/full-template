import { app, BrowserWindow, ipcMain } from "electron";
import { createWindow } from "./lib/electron";

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
});

app.whenReady().then(() => {
    createWindow("main");

    app.on("activate", () => {
        if (!BrowserWindow.getAllWindows().length) {
            createWindow("main");
        }
    });
});

ipcMain.on("from-script", (event, args) => {
    console.log("received " + args);

    event.reply("from-main", "pong");
});
