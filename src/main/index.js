/* eslint-disable prettier/prettier */
import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
const path = require('path');
const { autoUpdater } = require('electron-updater');
function createWindow() {
  autoUpdater.checkForUpdatesAndNotify();
 // Define the icon path based on the platform
 let iconPath;
 switch (process.platform) {
   case 'win32':
     iconPath = path.join(__dirname, '../../resources/hat.ico'); // Windows
     break;
   default:
     iconPath = path.join(__dirname, '../../resources/hat.png'); // Linux
 }

  // Create the browser window.
   const mainWindow = new BrowserWindow({
    width: 360,
    height: 580,
    icon: iconPath, // Use the platform-specific icon
    resizable: false,
    fullscreenable: false,
    show: false,
    autoHideMenuBar: true,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true // false during development
    }
  });

  // Load the React app (development or production)
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  //To deccide if window should always be on top
  mainWindow.setAlwaysOnTop(false, 'screen')

  // Show the window when ready
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // Handle external links
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // Close the window when the renderer process is closed 
  ipcMain.on('close-window', () => {
    const focusedWindow = BrowserWindow.getFocusedWindow()
    if (focusedWindow) {
      focusedWindow.close()
    }
  })
//minimize the window
  ipcMain.on('minimize-window', () => {
    const focusedWindow = BrowserWindow.getFocusedWindow()
    if (focusedWindow) {
      focusedWindow.minimize()
    }
  })

}

// App Initialization
app.whenReady().then(() => {
  // Set app user model ID (for Windows)
  electronApp.setAppUserModelId('com.electron')

  // Optimize shortcuts: F12 for DevTools in development, disable Cmd+R in production
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // Create the main window
  createWindow()

  // Reactivate window when app icon is clicked (macOS)
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
