import { useState } from 'react'
import content from '../data/content.json'
import './MusicPlayer.css'

interface MusicPlayerProps {
  active: boolean
  onToggle: () => void
}

export default function MusicPlayer({ active }: MusicPlayerProps) {
  const [minimized, setMinimized] = useState(false)

  if (!active) return null

  const playlistUrl = content.couple.spotifyPlaylist

  return (
    <div className={`music-player ${minimized ? 'minimized' : ''}`}>
      <div className="music-header" onClick={() => setMinimized(prev => !prev)}>
        <span className="music-label">🎵 Müziksiz olmaz</span>
        <button className="music-toggle">
          {minimized ? '▲' : '▼'}
        </button>
      </div>
      <div className="music-body">
        <iframe
          style={{ borderRadius: 12 }}
          src={`${playlistUrl}?utm_source=generator&theme=0&autoplay=1`}
          width="100%"
          height="80"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="eager"
          title="Spotify Player"
        />
      </div>
    </div>
  )
}
