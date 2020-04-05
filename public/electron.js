const { app, BrowserWindow, Menu, ipcMain, clipboard } = require("electron");
const { autoUpdater } = require("electron-updater");
const path = require("path");
const isDev = require("electron-is-dev");
const log = require("electron-log");
const os = require("os");

//-------------------------------------------------------------------
// Main Window
//
//
//-------------------------------------------------------------------
let mainWindow;

let tools = false;

if (isDev) {
  tools = true;
}

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    resizable: false,
    webPreferences: {
      devTools: tools,
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
};

app.on("ready", () => {
  createWindow();
  app.focus();
  autoUpdater.checkForUpdatesAndNotify();

  isDev &&
    BrowserWindow.addDevToolsExtension(
      path.join(
        os.homedir(),
        "/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.6.0_0"
      )
    );
});

app.on("before-quit", () => {
  mainWindow.webContents.send("loggout");
});

app.on("window-all-closed", () => {
  app.quit();
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

ipcMain.on("copy_to_clipboard", (event, content) => {
  clipboard.writeText(content);
});

autoUpdater.on("checking-for-update", () => {
  mainWindow.webContents.send("checking_for_update");
});

autoUpdater.on("update-available", () => {
  mainWindow.webContents.send("update_available");
});

autoUpdater.on("update-not-available", info => {
  mainWindow.webContents.send("update_not_available");
  console.log("update not available");
});

autoUpdater.on("update-downloaded", () => {
  mainWindow.webContents.send("update_downloaded");
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
// Toggle Dev Tools
//
//
//-------------------------------------------------------------------
ipcMain.on("toggle-dev-tools", (event, arg) => {
  tools = arg;
  if (tools === true) {
    mainWindow = null;
    createWindow();
  }
});
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
