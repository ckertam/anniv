import { useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Envelope from './components/Envelope'
import WorldMap from './components/WorldMap'
import MusicPlayer from './components/MusicPlayer'
import Month01Story from './components/months/Month01Story'
import Month02Quiz from './components/months/Month02Quiz'
import Month03Timeline from './components/months/Month03Timeline'
import Month04Letters from './components/months/Month04Letters'
import Month05Music from './components/months/Month05Music'
import Month06Adventure from './components/months/Month06Adventure'
import Month07Memory from './components/months/Month07Memory'
import Month08WishTree from './components/months/Month08WishTree'
import Month09Leo from './components/months/Month09Leo'
import Month10Room from './components/months/Month10Room'
import Month11Garden from './components/months/Month11Garden'
import Month12Escape from './components/months/Month12Escape'
import Finale from './components/months/Finale'

export default function App() {
  const [entered, setEntered] = useState(false)
  const [musicActive, setMusicActive] = useState(false)

  if (!entered) {
    return <Envelope onOpen={() => { setEntered(true); setMusicActive(true) }} />
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<WorldMap />} />
        <Route path="/month/1" element={<Month01Story />} />
        <Route path="/month/2" element={<Month02Quiz />} />
        <Route path="/month/3" element={<Month03Timeline />} />
        <Route path="/month/4" element={<Month04Letters />} />
        <Route path="/month/5" element={<Month05Music />} />
        <Route path="/month/6" element={<Month06Adventure />} />
        <Route path="/month/7" element={<Month07Memory />} />
        <Route path="/month/8" element={<Month08WishTree />} />
        <Route path="/month/9" element={<Month10Room />} />
        <Route path="/month/10" element={<Month09Leo />} />
        <Route path="/month/11" element={<Month11Garden />} />
        <Route path="/month/12" element={<Month12Escape />} />
        <Route path="/finale" element={<Finale />} />
      </Routes>
      <MusicPlayer active={musicActive} onToggle={() => setMusicActive(prev => !prev)} />
    </HashRouter>
  )
}
