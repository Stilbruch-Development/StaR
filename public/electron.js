const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("path");
const isDev = require("electron-is-dev");
const log = require("electron-log");

//-------------------------------------------------------------------
// Main Window
//
//
//-------------------------------------------------------------------
let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: {
      devTools: true,
      nodeIntegration: true,
      preload: __dirname + "/preload.js"
    }
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000/"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  mainWindow.on("closed", () => (mainWindow = null));

  mainWindow.once("ready-to-show", () => {
    autoUpdater.checkForUpdatesAndNotify();
  });
};

app.on("ready", () => {
  createWindow();
  app.focus();
  autoUpdater.checkForUpdatesAndNotify();
});

app.on("window-all-closed", () => {
  app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

//-------------------------------------------------------------------
// AutoUpdater
//
//
//-------------------------------------------------------------------

ipcMain.on("app_version", event => {
  event.sender.send("app_version", { version: app.getVersion() });
});

ipcMain.on("restart_app", () => {
  autoUpdater.quitAndInstall();
});

autoUpdater.on("checking-for-update", () => {
  mainWindow.webContents.send("Checking for update...");
});

autoUpdater.on("update-available", () => {
  mainWindow.webContents.send("update_available");
});

autoUpdater.on("update-not-available", info => {
  mainWindow.webContents.send("Update not available.");
});

autoUpdater.on("update-downloaded", () => {
  mainWindow.webContents.send("update_downloaded");
});

autoUpdater.on("download-progress", progressObj => {
  let log_message = "Download speed: " + progressObj.bytesPerSecond;
  log_message = log_message + " - Downloaded " + progressObj.percent + "%";
  log_message =
    log_message +
    " (" +
    progressObj.transferred +
    "/" +
    progressObj.total +
    ")";
  mainWindow.webContents.send(log_message);
});

autoUpdater.on("update-downloaded", info => {
  mainWindow.webContents.send("Update downloaded");
});

autoUpdater.on("error", err => {
  mainWindow.webContents.send("Error in auto-updater. " + err);
});

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = "info";
log.info("App starting...");

//-------------------------------------------------------------------
// Menu
//
//
//-------------------------------------------------------------------
// let template = [];
// if (process.platform === "darwin") {
//   // OS X
//   const name = app.getName();
//   template.unshift({
//     label: name,
//     submenu: [
//       {
//         label: "About " + name,
//         role: "about"
//       },
//       {
//         label: "Quit",
//         accelerator: "Command+Q",
//         click() {
//           app.quit();
//         }
//       }
//     ]
//   });
// }

// app.on("ready", () => {
//   const menu = Menu.buildFromTemplate(template);
//   Menu.setApplicationMenu(menu);
// });
