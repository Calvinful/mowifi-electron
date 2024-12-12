// Extend the global Window interface to include our APIs
type ValidStoreValue = string | number | boolean | null | undefined | object | Array<ValidStoreValue>

interface StoreAPI {
  get: (key: string) => Promise<ValidStoreValue>
  set: (key: string, value: ValidStoreValue) => Promise<void>
}

interface API {
  ping: () => void
}

declare global {
    interface Window {
      env: {
        versions: NodeJS.ProcessVersions
      }
      
      store: {
        get: (key: string) => Promise<unknown>
        set: (key: string, value: unknown) => Promise<void>
      }
      api: {
        ping: () => void
      }
    }
  }
  

export {}
