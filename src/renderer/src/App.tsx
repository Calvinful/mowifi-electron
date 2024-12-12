import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'
import NavBar from './components/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Applications from './components/Applications';
import Providers from './components/Providers';
import Logs from './components/Logs';
import Settings from './components/Settings';
function App(): JSX.Element {
  const ipcHandle = (): void => window.api.ping()

  return (
    <>
      <NavBar />
      <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Applications" element={<Applications />} />
        <Route path="/Providers" element={<Providers />} />
        <Route path="/Logs" element={<Logs />} />
        <Route path="/Settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
      <main className="pt-16">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <img alt="logo" className="logo" src={electronLogo} />
          <div className="creator">Powered by electron-vite</div>
          <div className="text">
            Build an Electron app with <span className="react">React</span>
            &nbsp;and <span className="ts">TypeScript</span>
          </div>
          <p className="tip">
            Please try pressing <code>F12</code> to open the devTool
          </p>
          <div className="actions">
            <div className="action">
              <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
                Documentation
              </a>
            </div>
            <div className="action">
              <a onClick={ipcHandle}>
                Send IPC
              </a>
            </div>
          </div>
          <Versions />
        </div>
      </main>
    </>
  )
}

export default App
