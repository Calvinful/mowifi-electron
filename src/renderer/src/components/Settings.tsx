import { useEffect, useState } from 'react'
import { Switch } from '@radix-ui/react-switch'
//import Store from 'electron-store'
//import { app, ipcMain, BrowserWindow } from 'electron'

interface SettingsState {
  theme: string
  notifications: boolean
  autoLaunch: boolean
}

const Settings = (): JSX.Element => {
  const [settings, setSettings] = useState<SettingsState>({
    theme: 'dark',
    notifications: true,
    autoLaunch: false
  })

  useEffect(() => {
    const loadSettings = async (): Promise<void> => {
      const theme = (await window['store'].get('theme')) as string
      const notifications = (await window['store'].get('notifications')) as boolean
      const autoLaunch = (await window['store'].get('autoLaunch')) as boolean
      setSettings({ theme, notifications, autoLaunch })
    }
    loadSettings()
  }, [])

  const handleSettingChange = async (
    key: keyof SettingsState,
    value: string | boolean
  ): Promise<void> => {
    await window['store'].set(key, value)
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Theme</h3>
            <p className="text-sm text-gray-500">Choose your preferred theme</p>
          </div>
          <select
            value={settings.theme}
            onChange={(e) => handleSettingChange('theme', e.target.value)}
            className="bg-gray-700 rounded-md p-2"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Notifications</h3>
            <p className="text-sm text-gray-500">Enable or disable notifications</p>
          </div>
          <Switch
            checked={settings.notifications}
            onCheckedChange={(checked) => handleSettingChange('notifications', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Auto Launch</h3>
            <p className="text-sm text-gray-500">Start app when system boots</p>
          </div>
          <Switch
            checked={settings.autoLaunch}
            onCheckedChange={(checked) => handleSettingChange('autoLaunch', checked)}
          />
        </div>
      </div>
    </div>
  )
}

export default Settings
