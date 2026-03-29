import { useEffect, useRef } from 'react'
import Phaser from 'phaser'
import BootScene from './scenes/BootScene'
import MenuScene from './scenes/MenuScene'
import StoryScene from './scenes/StoryScene'
import RunnerScene from './scenes/RunnerScene'
import EndScene from './scenes/EndScene'

interface PhaserGameProps {
  onBack: () => void
}

export default function PhaserGame({ onBack }: PhaserGameProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<Phaser.Game | null>(null)

  useEffect(() => {
    if (!containerRef.current || gameRef.current) return

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: containerRef.current,
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
      backgroundColor: '#1a0a20',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 },
          debug: false,
        },
      },
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      scene: [BootScene, MenuScene, StoryScene, RunnerScene, EndScene],
      input: {
        activePointers: 2,
      },
      render: {
        pixelArt: true,
        antialias: false,
      },
    }

    const game = new Phaser.Game(config)
    gameRef.current = game

    game.events.on('gameComplete', () => {
      onBack()
    })

    return () => {
      game.events.off('gameComplete')
      game.destroy(true)
      gameRef.current = null
    }
  }, [onBack])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9000,
        background: '#1a0a20',
        touchAction: 'none',
      }}
    />
  )
}
