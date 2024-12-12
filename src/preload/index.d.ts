import { ElectronAPI } from '@electron-toolkit/preload'

type ValidStoreValue = string | number | boolean | null | undefined | object | Array<ValidStoreValue>

declare global {
  interface Window {
    electron: ElectronAPI
    store: {
      get: (key: string) => Promise<ValidStoreValue>
      set: (key: string, value: ValidStoreValue) => Promise<void>
    }
    api: unknown
  }
}

export {}
