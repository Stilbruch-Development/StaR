const {
  app,
  BrowserWindow,
  Menu,
  ipcMain,
  clipboard,
  shell,
  screen,
  dialog
} = require('electron');
const { autoUpdater } = require('electron-updater');
const {
  default: installExtension,
  REACT_DEVELOPER_TOOLS
} = require('electron-devtools-installer');
const path = require('path');
const isDev = require('electron-is-dev');
const log = require('electron-log');

const isMac = process.platform === 'darwin';

//-------------------------------------------------------------------
// Main Window
//
//
//-------------------------------------------------------------------
let mainWindow;
let aboutWindow;

let tools = false;

if (isDev) {
  tools = true;
}

const createWindow = () => {
  const mainScreen = screen.getPrimaryDisplay();
  const dimensions = mainScreen.size;

  const width = Math.floor(dimensions.width * 0.8);
  const height = Math.floor(dimensions.height * 0.8);

  mainWindow = new BrowserWindow({
    title: 'StaR',
    width: width,
    height: height,
    minWidth: width,
    minHeight: height,
    resizable: true,
    show: false,
    webPreferences: {
      devTools: tools,
      nodeIntegration: true,
      preload: `${__dirname}/preload.js`,
      worldSafeExecuteJavaScript: true,
      enableRemoteModule: true
    }
  });

  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000/'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  mainWindow.on('closed', () => (mainWindow = null));
};

//-------------------------------------------------------------------
// About Window
//
//
//-------------------------------------------------------------------

const createAboutWindow = () => {
  const mainScreen = screen.getPrimaryDisplay();
  const dimensions = mainScreen.size;

  const width = Math.floor(dimensions.width * 0.3);
  const height = Math.floor(dimensions.height * 0.3);

  aboutWindow = new BrowserWindow({
    title: 'About StaR',
    width: width,
    height: height,
    resizable: false,
    backgroundColor: 'rgb(220, 220, 220)',
    webPreferences: {
      devTools: false,
      nodeIntegration: true,
      preload: `${__dirname}/preload.js`,
      worldSafeExecuteJavaScript: true
    }
  });
  aboutWindow.loadURL(
    isDev
      ? `file://${path.join(__dirname, '/about.html')}`
      : `file://${path.join(__dirname, '../build/about.html')}`
  );
};

//-------------------------------------------------------------------
// Menu
//
//
//-------------------------------------------------------------------
const menu = [
  ...(isMac
    ? [
        {
          label: 'StaR',
          submenu: [
            {
              label: 'Über StaR',
              click: createAboutWindow
            },
            {
              label: 'Neu laden',
              role: 'reload'
            },
            {
              label: 'DevTools',
              role: 'toggledevtools'
            },
            {
              label: 'Beenden',
              // accelerator: isMac ? "Command+Q" : "Ctl+Q",
              accelerator: 'CmdOrCtrl+Q',
              click: () => app.quit()
            }
          ]
        },
        {
          label: 'Bearbeiten',
          submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            { role: 'delete' },
            { role: 'selectAll' }
          ]
        }
      ]
    : []),
  ...(!isMac
    ? [
        {
          label: 'StaR',
          submenu: [
            {
              label: 'Über StaR',
              click: createAboutWindow
            },
            {
              label: 'Neu laden',
              role: 'reload'
            },
            {
              label: 'DevTools',
              role: 'toggledevtools'
            },
            {
              label: 'Beenden',
              // accelerator: isMac ? "Command+Q" : "Ctl+Q",
              accelerator: 'CmdOrCtrl+Q',
              click: () => app.quit()
            }
          ]
        },
        {
          label: 'Bearbeiten',
          submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            { role: 'delete' },
            { type: 'separator' },
            { role: 'selectAll' }
          ]
        }
      ]
    : [])
];

//-------------------------------------------------------------------
// app.on('ready', ()=>{})
//
//
//-------------------------------------------------------------------

app.on('ready', async () => {
  try {
    const mainMenu = Menu.buildFromTemplate(menu);
    // const macExtensionPath =
    //   '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.12.3_0';

    // const winExtensionPath =
    //   '%LOCALAPPDATA%GoogleChromeUser DataDefaultExtensions\\fmkadmapgofadopljbjfkapdkoienihi\\4.12.3_0';

    // await session.defaultSession.loadExtension(
    //   path.join(os.homedir(), macExtensionPath || winExtensionPath)
    // );

    await Menu.setApplicationMenu(mainMenu);
    await createWindow();
    await autoUpdater.checkForUpdatesAndNotify();

    await mainWindow.once('ready-to-show', () => {
      mainWindow.show();
    });

    await app.focus();
    await installExtension(REACT_DEVELOPER_TOOLS);
  } catch (e) {
    console.log("Error from  app.on('ready', () => {}) catch block:");
    console.log(e);
  }
});

app.allowRendererProcessReuse = true;

app.on('before-quit', () => {
  mainWindow.webContents.send('loggout');
});

app.on('window-all-closed', () => {
  app.quit();
});

// -------------------------------------------------------------------
// ipcMain Processes

// -------------------------------------------------------------------

ipcMain.on('app_version', (event) => {
  event.sender.send('app_version', { version: app.getVersion() });
  console.log(`log`);
  console.log(app.getVersion());
});

ipcMain.on('copy_to_clipboard', (event, content) => {
  clipboard.writeText(content);
});

ipcMain.on('open_external_link', (event, link) => {
  shell.openExternal(link).catch(() => {
    event.reply(
      'open_external_link_error',
      'Fehlerhafter oder inkompletter Link. Bitte immer "http://" oder "https://" anführen!'
    );
  });
});

// -------------------------------------------------------------------
// AutoUpdater

// -------------------------------------------------------------------

ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});

autoUpdater.on('checking-for-update', () => {
  mainWindow.webContents.send('checking_for_update');
});

autoUpdater.on('update-available', () => {
  mainWindow.webContents.send('update_available');
});

autoUpdater.on('update-not-available', () => {
  mainWindow.webContents.send('update_not_available');
  console.log('update not available');
});

autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded');
});

autoUpdater.on('error', (message) => {
  mainWindow.webContents.send('error');
  console.error('Es gab ein Problem mit dem automatischen Update!');
  console.error(message);
});

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

//-------------------------------------------------------------------
// Toggle Dev Tools
//
//
//-------------------------------------------------------------------
ipcMain.on('toggle-dev-tools', (event, arg) => {
  tools = arg;
  if (tools === true) {
    mainWindow = null;
    createWindow();
    mainWindow.once('ready-to-show', () => {
      mainWindow.show();
    });
  }
});

//-------------------------------------------------------------------
// Handle Errors
//
//
//-------------------------------------------------------------------

process.on('uncaughtException', (error) => {
  const messageBoxOptions = {
    type: 'error',
    title: 'Unerwarteter Fehler',
    message:
      'Unerwarteten Fehler im Hauptprozess. StaR wird abgebrochen. Bitte kontaktieren Sie den Administrator.',
    detail: `Fehlernachricht: ${error.message}`
  };
  dialog.showMessageBox(messageBoxOptions);
  throw error;
});
