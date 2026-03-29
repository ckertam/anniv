import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import PhaserGame from '../../game/PhaserGame'

export default function Month08CityQuest() {
  const navigate = useNavigate()
  const [playing, setPlaying] = useState(true)

  const handleBack = useCallback(() => {
    setPlaying(false)
    navigate('/')
  }, [navigate])

  if (!playing) return null

  return <PhaserGame onBack={handleBack} />
}
