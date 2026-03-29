import Phaser from 'phaser'
import levels from '../levels'

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const n = parseInt(hex.replace('#', ''), 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

function rgbToCss(r: number, g: number, b: number): string {
  return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`
}

function hexToNumberDark(hex: string): number {
  const { r, g, b } = hexToRgb(hex)
  return Phaser.Display.Color.GetColor(
    Math.round(r * 0.25),
    Math.round(g * 0.25),
    Math.round(b * 0.25),
  )
}

export default class StoryScene extends Phaser.Scene {
  levelIndex = 0
  score = 0

  constructor() {
    super({ key: 'StoryScene' })
  }

  init(data: { levelIndex?: number; score?: number }) {
    this.levelIndex = data.levelIndex ?? 0
    this.score = data.score ?? 0
  }

  create() {
    const level = levels[this.levelIndex]
    if (!level) {
      this.scene.start('ExploreScene', { levelIndex: 0, score: this.score })
      return
    }

    const { r, g, b } = hexToRgb(level.skyColor)
    this.cameras.main.setBackgroundColor('#1a0a20')

    const w = this.scale.width
    const h = this.scale.height
    const cx = w * 0.5

    const headerWash = this.add.graphics()
    const topTint = hexToNumberDark(level.skyColor)
    headerWash.fillGradientStyle(topTint, topTint, 0x1a0a20, 0x1a0a20, 0.4, 0.4, 1, 1)
    headerWash.fillRect(0, 0, w, h * 0.42)
    headerWash.setScrollFactor(0, 0)

    this.add
      .text(cx, 48, `AY ${level.month}`, {
        font: '10px "Press Start 2P", monospace',
        color: '#fff',
        backgroundColor: rgbToCss(r * 0.45, g * 0.45, b * 0.45),
        padding: { x: 10, y: 6 },
      })
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0, 0)

    this.add
      .text(cx, 88, level.city, {
        font: '14px "Press Start 2P", monospace',
        color: '#ecf0f1',
        align: 'center',
      })
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0, 0)

    this.add
      .text(cx, 130, level.title, {
        font: '12px "Press Start 2P", monospace',
        color: '#f1c40f',
        align: 'center',
      })
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0, 0)

    this.add
      .text(cx, 188, level.emoji, {
        font: '64px Arial',
      })
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0, 0)

    const fullText = level.story
    let charIndex = 0
    let typingComplete = false
    const storyText = this.add
      .text(cx, h * 0.5 + 20, '', {
        font: '16px Georgia, "Times New Roman", serif',
        color: '#ffffff',
        align: 'center',
        wordWrap: { width: 300 },
        lineSpacing: 6,
      })
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0, 0)

    const continueButton = this.add
      .text(cx, h - 72, '[ KEŞFET → ]', {
        font: '12px "Press Start 2P", monospace',
        color: '#2ecc71',
      })
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0, 0)
      .setVisible(false)

    let continueShown = false
    const showContinueButton = () => {
      if (continueShown) return
      continueShown = true
      continueButton.setVisible(true)
      continueButton.setInteractive({ useHandCursor: true })
      continueButton.once('pointerdown', () => {
        this.scene.start('ExploreScene', { levelIndex: this.levelIndex, score: this.score })
      })
      this.tweens.add({
        targets: continueButton,
        scaleX: 1.06,
        scaleY: 1.06,
        duration: 700,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      })
    }

    const typeTimer = this.time.addEvent({
      delay: 30,
      repeat: fullText.length > 0 ? fullText.length - 1 : 0,
      callback: () => {
        charIndex++
        storyText.setText(fullText.substring(0, charIndex))
        if (charIndex >= fullText.length) {
          typingComplete = true
          typeTimer.remove()
          showContinueButton()
        }
      },
    })

    if (fullText.length === 0) {
      typingComplete = true
      typeTimer.remove()
      showContinueButton()
    }

    const onSkipTyping = () => {
      if (typingComplete) return
      typingComplete = true
      typeTimer.remove()
      storyText.setText(fullText)
      showContinueButton()
    }

    this.input.on('pointerdown', onSkipTyping)

    this.add
      .text(w - 16, 16, `❤️ × ${this.score}`, {
        font: '10px "Press Start 2P", monospace',
        color: '#e74c3c',
      })
      .setOrigin(1, 0)
      .setScrollFactor(0, 0)

    const dotY = h - 28
    const dotSpacing = 22
    const totalDots = 12
    const dotsWidth = (totalDots - 1) * dotSpacing
    const startX = cx - dotsWidth * 0.5
    for (let i = 0; i < totalDots; i++) {
      const filled = i < level.month
      this.add
        .circle(startX + i * dotSpacing, dotY, 4, filled ? 0xe74c3c : 0x444444, filled ? 1 : 0.6)
        .setStrokeStyle(1, 0xffffff, filled ? 0.5 : 0.2)
        .setScrollFactor(0, 0)
    }
  }
}
