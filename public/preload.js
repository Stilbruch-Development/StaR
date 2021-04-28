const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  requestVersion: () => ipcRenderer.send('app_version_request'),
  receiveVersion: (fn) =>
    ipcRenderer.on('app_version_respond', (event, ...args) => fn(...args)),
  sendClipboard: (content) => ipcRenderer.send('copy_clipboard', content),
  openLink: (link) => ipcRenderer.send('open_external_link', link),
  receiveLogout: (fn) =>
    ipcRenderer.on('logout', (event, ...args) => fn(...args))
});
