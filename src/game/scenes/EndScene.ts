import Phaser from 'phaser'

const CONFETTI_COLORS = [0xff6b6b, 0xffd93d, 0x6bcb77, 0x4d96ff, 0xffa8a8, 0xe74c3c, 0xa29bfe]

export default class EndScene extends Phaser.Scene {
  private totalScore = 0

  constructor() {
    super({ key: 'EndScene' })
  }

  init(data: { score?: number }): void {
    this.totalScore = data?.score ?? 0
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#1a0a20')

    const cx = this.scale.width / 2
    const cy = this.scale.height / 2
    const w = this.scale.width
    const h = this.scale.height

    for (let i = 0; i < 30; i++) {
      const burstHeart = this.add.image(cx, cy, 'heart').setDepth(0)
      const angle = Phaser.Math.FloatBetween(0, Math.PI * 2)
      const dist = Phaser.Math.Between(120, 280)
      this.tweens.add({
        targets: burstHeart,
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        alpha: 0,
        duration: Phaser.Math.Between(1200, 2000),
        ease: 'Cubic.easeOut',
      })
    }

    for (let i = 0; i < 40; i++) {
      const rect = this.add
        .rectangle(
          Phaser.Math.Between(0, w),
          -30,
          Phaser.Math.Between(4, 7),
          Phaser.Math.Between(6, 12),
          Phaser.Math.RND.pick(CONFETTI_COLORS),
        )
        .setDepth(1000)

      this.tweens.add({
        targets: rect,
        y: h + 40,
        angle: Phaser.Math.Between(-180, 180),
        duration: Phaser.Math.Between(2200, 4800),
        ease: 'Linear',
        repeat: -1,
        delay: Phaser.Math.Between(0, 2500),
        onRepeat: () => {
          rect.setX(Phaser.Math.Between(0, w))
          rect.setY(-30)
          rect.setAngle(0)
        },
      })
    }

    const title = this.add
      .text(cx, cy - 100, 'Seninle Her Yol Güzel', {
        fontFamily: '"Press Start 2P", monospace',
        fontSize: '18px',
        color: '#ffd700',
      })
      .setOrigin(0.5)
      .setAlpha(0)
      .setDepth(5)

    this.tweens.add({
      targets: title,
      alpha: 1,
      delay: 500,
      duration: 800,
      ease: 'Sine.easeIn',
    })

    const scoreText = this.add
      .text(cx, cy - 50, `❤️ × ${this.totalScore}`, {
        fontFamily: '"Press Start 2P", monospace',
        fontSize: '14px',
        color: '#e74c3c',
      })
      .setOrigin(0.5)
      .setAlpha(0)
      .setDepth(5)

    this.tweens.add({
      targets: scoreText,
      alpha: 1,
      delay: 1000,
      duration: 800,
      ease: 'Sine.easeIn',
    })

    const message = this.add
      .text(cx, cy + 20, '12 ay, 12 şehir, 1 aşk.\nSeni çok seviyorum 🤍', {
        fontFamily: '"Press Start 2P", monospace',
        fontSize: '10px',
        color: '#ffffff',
        align: 'center',
        wordWrap: { width: 300 },
        lineSpacing: 8,
      })
      .setOrigin(0.5)
      .setAlpha(0)
      .setDepth(5)

    this.tweens.add({
      targets: message,
      alpha: 1,
      delay: 1500,
      duration: 800,
      ease: 'Sine.easeIn',
    })

    const meetY = cy + 100
    const p1 = this.add.image(cx - 220, meetY, 'player').setScale(3).setDepth(4)
    const p2 = this.add
      .image(cx + 220, meetY, 'player')
      .setScale(3)
      .setFlipX(true)
      .setTint(0xffb6c1)
      .setDepth(4)

    let metCount = 0
    const onWalkerDone = () => {
      metCount += 1
      if (metCount < 2) return

      const loveHeart = this.add.image(cx, cy + 75, 'heart').setScale(2).setAlpha(0).setDepth(6)
      this.tweens.add({
        targets: loveHeart,
        alpha: 1,
        duration: 450,
        ease: 'Sine.easeOut',
      })
      this.tweens.add({
        targets: loveHeart,
        scale: 2.25,
        duration: 550,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      })
    }

    this.tweens.add({
      targets: p1,
      x: cx - 20,
      duration: 1400,
      ease: 'Power2',
      onComplete: onWalkerDone,
    })
    this.tweens.add({
      targets: p2,
      x: cx + 20,
      duration: 1400,
      ease: 'Power2',
      onComplete: onWalkerDone,
    })

    const backBtn = this.add
      .text(cx, cy + 180, 'Haritaya Dön', {
        fontFamily: '"Press Start 2P", monospace',
        fontSize: '10px',
        color: '#ffd700',
      })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .setDepth(10)

    backBtn.on('pointerdown', () => {
      this.game.events.emit('gameComplete')
    })
  }
}
