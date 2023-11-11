const { app, BrowserWindow } = require('electron');
const path = require('node:path');
const dotenv = require('dotenv');

dotenv.config();

const createWindow = () => {
    const win = new BrowserWindow({
      width: 1080,
      height: 720,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    });

    win.webContents.openDevTools();

    process.env.NODE_ENV === 'production'
      ? win.loadFile(__dirname + '/app/build/index.html')
      : win.loadURL('http://localhost:3000');
};

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
