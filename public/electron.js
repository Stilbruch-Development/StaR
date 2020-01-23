const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");

let loadingScreen;
const createLoadingScreen = () => {
  loadingScreen = new BrowserWindow(
    Object.assign({
      width: 200,
      height: 400,
      frame: false
    })
  );
  loadingScreen.setResizable(false);
  loadingScreen.loadURL(
    isDev
      ? `file://${path.join(__dirname, "/loading.html")}`
      : `file://${path.join(__dirname, "../build/loading.html")}`
  );
  loadingScreen.on("closed", () => (loadingScreen = null));
  loadingScreen.on("did-finish-load", () => {
    loadingScreen.show();
  });
};

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    show: false,
    webPreferences: {
      devTools: false
    }
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000/"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  mainWindow.webContents.on("did-finish-load", () => {
    setTimeout(() => {
      if (loadingScreen) {
        loadingScreen.close();
      }
      mainWindow.show();
      app.focus();
    }, 5000);
  });
  mainWindow.on("closed", () => (mainWindow = null));
};

app.on("ready", () => {
  createWindow();
  createLoadingScreen();
  app.focus();
});

app.on("window-all-closed", () => {
  app.quit();
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
