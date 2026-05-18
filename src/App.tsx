import bg from './assets/background.png'
import bg2 from './assets/Adobe Express - file.png'
import DesktopFile from './component/desktopFile'
import Tab from './component/tab'

import './App.css'
import { useState } from 'react'

function App() {
  type AppTab = {
    id: string;
    heading: string;
  };

  const [tabs, setTabs] = useState<AppTab[]>([]);

  const newTab = (id: string, active: boolean, heading: string) => {
    setTabs((prevTabs) => {
      const existingTab = prevTabs.find((tab) => tab.id === id);
      if (active) {
        if (existingTab) {
          return prevTabs.map((tab) => (tab.id === id ? { id, heading } : tab));
        }
        return [...prevTabs, { id, heading }];
      }
      return prevTabs.filter((tab) => tab.id !== id);
    });
  };

  return (
    <>
      <div className="ticks" style={{ backgroundImage: `url(${bg2}), url(${bg})`, backgroundSize: 'cover', backgroundPosition:'center', height: '100%', width: '100%', position: 'fixed' }}>
        <DesktopFile newTab={newTab} tabs={tabs} />
        {tabs.map((tab) => (
          <Tab key={tab.id} heading={tab.heading} id={tab.id} newTab={newTab} />
        ))}
      </div>
    </>

  )
}

export default App
