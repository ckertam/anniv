import Phaser from 'phaser'

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' })
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#1a0a20')

    const cx = this.scale.width / 2
    const cy = this.scale.height / 2

    const heartCount = Phaser.Math.Between(8, 10)
    for (let i = 0; i < heartCount; i++) {
      const hx = Phaser.Math.Between(24, this.scale.width - 24)
      const hy = Phaser.Math.Between(-40, this.scale.height)
      const bgHeart = this.add.image(hx, hy, 'heart').setAlpha(0.35).setDepth(-10)
      this.tweens.add({
        targets: bgHeart,
        y: this.scale.height + 60,
        duration: Phaser.Math.Between(10000, 18000),
        ease: 'Linear',
        repeat: -1,
        delay: Phaser.Math.Between(0, 4000),
        onRepeat: () => {
          bgHeart.setX(Phaser.Math.Between(24, this.scale.width - 24))
          bgHeart.setY(Phaser.Math.Between(-80, -20))
        },
      })
    }

    this.add
      .text(cx, cy - 120, 'Seninle 365 Gün', {
        fontFamily: '"Press Start 2P", monospace',
        fontSize: '28px',
        color: '#ffffff',
      })
      .setOrigin(0.5)

    this.add
      .text(cx, cy - 70, 'Bir Aşk Macerası', {
        fontFamily: '"Press Start 2P", monospace',
        fontSize: '12px',
        color: '#e74c3c',
      })
      .setOrigin(0.5)

    this.add
      .text(cx, cy - 30, '❤️ 💕 ❤️', {
        fontFamily: 'monospace',
        fontSize: '24px',
        color: '#ffffff',
      })
      .setOrigin(0.5)

    const player = this.add.image(cx, cy + 20, 'player_down').setScale(3)
    this.tweens.add({
      targets: player,
      y: cy + 40,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    })

    const startBtn = this.add
      .text(cx, cy + 120, '[ BAŞLA ]', {
        fontFamily: '"Press Start 2P", monospace',
        fontSize: '14px',
        color: '#ffd700',
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })

    startBtn.on('pointerover', () => {
      startBtn.setTint(0xff6b6b)
    })
    startBtn.on('pointerout', () => {
      startBtn.clearTint()
    })
    startBtn.on('pointerdown', () => {
      this.scene.start('StoryScene', { levelIndex: 0, score: 0 })
    })

    this.tweens.add({
      targets: startBtn,
      scale: 1.1,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    })
  }
}
