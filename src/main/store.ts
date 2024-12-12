// src/main/store.ts
import Store from 'electron-store'

export interface StoreSchema {
  theme: string
  notifications: boolean
  autoLaunch: boolean
}

export const store = new Store<StoreSchema>({
  defaults: {
    theme: 'dark',
    notifications: true,
    autoLaunch: false
  }
})

// Now store.get('theme') will be strongly typed as string.
//