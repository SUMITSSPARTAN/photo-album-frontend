import bg from './assets/background.png'
import bg2 from './assets/Adobe Express - file.png'
import DesktopFile from './component/desktopFile'
import Tab from './component/tab'

import './App.css'
import { useState } from 'react'

function App() {
  const [isTabOpen, setIsTabOpen] = useState(false)
  const toggleTab = (value: boolean) => {
    setIsTabOpen(value)
  }

  return (
    <>
      <div className="ticks" style={{ backgroundImage: `url(${bg2}), url(${bg})`, width: '100%', height: '100%', backgroundSize: 'cover' }}>
        <DesktopFile toggleTab={toggleTab} />
        <Tab isOpen={isTabOpen} toggleTab={toggleTab} />
      </div>
    </>

  )
}

export default App
