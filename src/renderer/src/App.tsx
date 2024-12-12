import NavBar from './components/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './components/Home'
import Applications from './components/Applications'
import Providers from './components/Providers'
import Logs from './components/Logs'
import Settings from './components/Settings'
function App(): JSX.Element {
  return (
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
  )
}

export default App
