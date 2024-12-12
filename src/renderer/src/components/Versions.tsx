import { useState } from 'react'

function Versions(): JSX.Element {
  // Now we can safely use the versions exposed by preload:
  //const [versions] = useState(window.env.versions)
  const [versions] = useState(() => window.env.versions)
  return (
    <ul className="versions">
      <li className="electron-version">Electron v{versions.electron}</li>
      <li className="chrome-version">Chromium v{versions.chrome}</li>
      <li className="node-version">Node v{versions.node}</li>
    </ul>
  )
}

export default Versions