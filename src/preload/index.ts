import { contextBridge, ipcRenderer } from 'electron'
import process from 'process'

contextBridge.exposeInMainWorld('env', {
  versions: process.versions
})
/*
contextBridge.exposeInMainWorld('store', {
  get: (key: string) => ipcRenderer.invoke('store:get', key),
  set: (key: string, value: unknown) => ipcRenderer.invoke('store:set', key, value)
})

contextBridge.exposeInMainWorld('api', {
  ping: () => ipcRenderer.send('ping')
})
  */
interface API {
  ping: () => void
}

type ValidStoreValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | object
  | Array<ValidStoreValue>

interface StoreSettings {
  theme: string
  notifications: boolean
  autoLaunch: boolean
  getTheme: () => Promise<string>
  getNotifications: () => Promise<boolean>
  getAutoLaunch: () => Promise<boolean>
}
const storeSettings: StoreSettings = {
  getTheme: (): Promise<string> => ipcRenderer.invoke("settingStore:getTheme"),
  getNotifications: (): Promise<boolean> => ipcRenderer.invoke("settingStore:getNotifications"),
  getAutoLaunch: (): Promise<boolean> => ipcRenderer.invoke("settingStore:getAutoLaunch"),
  theme: 'dark',
  notifications: true,
  autoLaunch: false
}
contextBridge.exposeInMainWorld('settingStore', storeSettings)

interface StoreAPI {
  get: (key: string) => Promise<ValidStoreValue>
  set: (key: string, value: ValidStoreValue) => Promise<void>
}

// Define the store API with explicit return types
const storeAPI: StoreAPI = {
  get: (key: string): Promise<ValidStoreValue> => ipcRenderer.invoke('store:get', key),
  set: (key: string, value: ValidStoreValue): Promise<void> =>
    ipcRenderer.invoke('store:set', key, value)
}

// Define the additional API with explicit return types
const api: API = {
  ping: (): void => {
    ipcRenderer.send('ping')
  }
}

// Expose the APIs to the renderer process
contextBridge.exposeInMainWorld('store', storeAPI)
contextBridge.exposeInMainWorld('api', api)
