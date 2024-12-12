// src/main/index.ts
import { app, ipcMain, BrowserWindow } from 'electron'
import { StoreSchema} from './store'
//import { fileURLToPath } from 'url'
import { join } from 'path'

//const __filename = fileURLToPath(import.meta.url)
//const __dirname = dirname(__filename)
function createWindow(): void {
  console.log('Preload path:', join(__dirname, '../preload/index.js'))

  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'), // __dirname should be `out/main`
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  if (process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL)
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  // IPC handlers
  ipcMain.handle('store:get', (_event, key: keyof StoreSchema) => {
    return window.store.get(key)
  })

  ipcMain.handle('store:set', (_event, key: keyof StoreSchema, value: StoreSchema[typeof key]) => {
    window.store.set(key, value)
    return undefined
  })

  ipcMain.on('ping', () => {
    console.log('pong')
  })

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
