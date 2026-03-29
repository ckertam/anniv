import Phaser from 'phaser'
import levels from '../levels'

const TILE = 16
const GRAVITY = 1000
const JUMP_VEL = -450
const BASE_SPEED = 120
const GROUND_Y_OFFSET = 80

function hexToNumber(hex: string): number {
  return parseInt(hex.replace('#', ''), 16)
}

export default class RunnerScene extends Phaser.Scene {
  levelIndex = 0
  score = 0
  player!: Phaser.Physics.Arcade.Sprite
  ground!: Phaser.Physics.Arcade.StaticGroup
  platforms!: Phaser.Physics.Arcade.StaticGroup
  obstacles!: Phaser.Physics.Arcade.StaticGroup
  hearts!: Phaser.Physics.Arcade.StaticGroup
  flag!: Phaser.Physics.Arcade.Sprite
  cursors: any
  isJumping = false
  isDead = false
  levelComplete = false
  respawnX = 50
  lastCheckpointX = 0
  heartsCollected = 0
  levelText!: Phaser.GameObjects.Text
  heartText!: Phaser.GameObjects.Text
  speed = 0
  groundY = 0
  progressBar!: Phaser.GameObjects.Graphics
  private levelLength = 0

  constructor() {
    super({ key: 'RunnerScene' })
  }

  init(data: { levelIndex?: number; score?: number }) {
    this.levelIndex = data.levelIndex ?? 0
    this.score = data.score ?? 0
    this.isJumping = false
    this.isDead = false
    this.levelComplete = false
    this.respawnX = 50
    this.lastCheckpointX = 0
    this.heartsCollected = 0
  }

  create() {
    const level = levels[this.levelIndex]
    if (!level) {
      this.scene.start('EndScene', { score: this.score })
      return
    }

    this.groundY = this.scale.height - GROUND_Y_OFFSET
    this.levelLength = level.length
    this.physics.world.setBounds(0, 0, level.length, this.scale.height)
    this.speed = BASE_SPEED * level.speed

    const skyTop = hexToNumber(level.skyTop)
    const skyBottom = hexToNumber(level.skyBottom)
    const sky = this.add.graphics()
    sky.fillGradientStyle(skyTop, skyTop, skyBottom, skyBottom, 1, 1, 1, 1)
    sky.fillRect(0, 0, this.scale.width, this.scale.height)
    sky.setScrollFactor(0, 0)

    const seed = level.month * 1000
    let rng = seed
    const rand = () => {
      rng = (rng * 16807 + 0) % 2147483647
      return (rng & 0x7fffffff) / 0x7fffffff
    }

    const groundTint = hexToNumber(level.groundColor)
    const platformTint = hexToNumber(level.platformColor)

    this.ground = this.physics.add.staticGroup()
    const groundSet = new Set<number>()
    const safeEndX = level.length - TILE * 12

    let gx = 0
    while (gx < level.length) {
      const inStart = gx < TILE * 8
      const inEnd = gx >= safeEndX
      if (inStart || inEnd) {
        groundSet.add(gx)
        const tile = this.ground.create(gx, this.groundY, 'ground') as Phaser.Physics.Arcade.Sprite
        tile.setOrigin(0, 1)
        tile.setTint(groundTint)
        tile.refreshBody()
        gx += TILE
        continue
      }
      if (rand() < level.gapChance && gx + TILE * 2 < safeEndX) {
        gx += TILE * 2
        continue
      }
      groundSet.add(gx)
      const gTile = this.ground.create(gx, this.groundY, 'ground') as Phaser.Physics.Arcade.Sprite
      gTile.setOrigin(0, 1)
      gTile.setTint(groundTint)
      gTile.refreshBody()
      gx += TILE
    }

    this.platforms = this.physics.add.staticGroup()
    let px = TILE * 10
    while (px < safeEndX - TILE * 5) {
      px += 200 + rand() * 200
      if (px >= safeEndX) break
      if (rand() >= level.platformChance) continue
      if (!groundSet.has(px)) continue
      const widthTiles = 3 + Math.floor(rand() * 3)
      const py = this.groundY - (48 + Math.floor(rand() * 49))
      for (let t = 0; t < widthTiles; t++) {
        const platX = px + t * TILE
        const pTile = this.platforms.create(platX, py, 'ground') as Phaser.Physics.Arcade.Sprite
        pTile.setOrigin(0, 1)
        pTile.setTint(platformTint)
        pTile.refreshBody()
      }
    }

    this.obstacles = this.physics.add.staticGroup()
    for (let ox = TILE * 8; ox < safeEndX; ox += TILE) {
      if (!groundSet.has(ox)) continue
      if (rand() >= level.obstacleChance) continue
      const spike = this.obstacles.create(ox, this.groundY - TILE, 'spike') as Phaser.Physics.Arcade.Sprite
      spike.setOrigin(0.5, 1)
      spike.refreshBody()
    }

    this.hearts = this.physics.add.staticGroup()
    const innerStart = TILE * 10
    const innerEnd = level.length - TILE * 14
    const span = Math.max(innerEnd - innerStart, TILE)
    for (let h = 0; h < level.heartCount; h++) {
      const t = level.heartCount > 1 ? (h + 1) / (level.heartCount + 1) : 0.5
      const hx = innerStart + t * span
      const hy = this.groundY - (32 + Math.floor(rand() * 49))
      const heart = this.hearts.create(hx, hy, 'heart') as Phaser.Physics.Arcade.Sprite
      heart.setOrigin(0.5, 0.5)
      heart.refreshBody()
      this.tweens.add({
        targets: heart,
        y: hy + 5,
        duration: 800,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      })
    }

    // Big level intro banner (visible at start)
    const banner = this.add.text(this.scale.width / 2, this.scale.height / 2 - 40, level.emoji, {
      fontSize: '64px',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(50).setAlpha(0.9)
    const bannerTitle = this.add.text(this.scale.width / 2, this.scale.height / 2 + 20, `AY ${level.month}: ${level.title}`, {
      font: '12px "Press Start 2P", monospace',
      color: '#fff',
      align: 'center',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(50).setAlpha(0.9)
    const bannerCity = this.add.text(this.scale.width / 2, this.scale.height / 2 + 45, level.city, {
      font: '9px "Press Start 2P", monospace',
      color: '#ffd700',
      align: 'center',
    }).setOrigin(0.5).setScrollFactor(0).setDepth(50).setAlpha(0.7)
    this.time.delayedCall(2000, () => {
      this.tweens.add({ targets: [banner, bannerTitle, bannerCity], alpha: 0, duration: 800 })
    })

    // Themed decorations along the level
    const decoEmojis = [level.emoji, level.specialEmoji]
    for (let d = 0; d < 10; d++) {
      const dx = TILE * 15 + (d * (level.length - TILE * 30)) / 10
      const dy = this.groundY - 100 - rand() * 60
      const emoji = decoEmojis[d % decoEmojis.length]
      this.add.text(dx, dy, emoji, { fontSize: '24px' })
        .setOrigin(0.5).setAlpha(0.4 + rand() * 0.3)
    }

    this.flag = this.physics.add.sprite(level.length - TILE * 6, this.groundY - 32, 'flag')
    this.flag.setImmovable(true)
    const flagBody = this.flag.body as Phaser.Physics.Arcade.Body
    flagBody.allowGravity = false

    this.player = this.physics.add.sprite(50, this.groundY - 40, 'player')
    this.player.setCollideWorldBounds(false)
    const body = this.player.body as Phaser.Physics.Arcade.Body
    body.setGravityY(GRAVITY)
    body.setSize(12, 22)
    this.player.setDepth(10)

    this.cameras.main.setBounds(0, 0, level.length, this.scale.height)
    this.cameras.main.startFollow(this.player, false, 0.1, 0)
    this.cameras.main.setDeadzone(this.scale.width * 0.3, 0)

    this.physics.add.collider(this.player, this.ground)
    this.physics.add.collider(this.player, this.platforms)
    this.physics.add.overlap(this.player, this.obstacles, () => this.die())
    this.physics.add.overlap(this.player, this.hearts, (_p, heart) =>
      this.collectHeart(heart as Phaser.Physics.Arcade.Sprite),
    )
    this.physics.add.overlap(this.player, this.flag, () => this.completeLevel())

    this.input.on('pointerdown', () => this.jump())
    this.cursors = this.input.keyboard?.createCursorKeys()

    this.levelText = this.add
      .text(16, 16, `AY ${level.month} — ${level.city}`, {
        font: '10px "Press Start 2P", monospace',
        color: '#fff',
      })
      .setScrollFactor(0, 0)
      .setDepth(100)

    this.heartText = this.add
      .text(16, 36, `❤️ ${this.heartsCollected}`, {
        font: '10px "Press Start 2P", monospace',
        color: '#e74c3c',
      })
      .setScrollFactor(0, 0)
      .setDepth(100)

    this.progressBar = this.add.graphics().setScrollFactor(0, 0).setDepth(100)

    const cloudCount = 5 + Math.floor(rand() * 4)
    for (let c = 0; c < cloudCount; c++) {
      const cx = rand() * (level.length - 200) + 100
      const cy = 40 + rand() * (this.groundY - 120)
      const cloud = this.add.image(cx, cy, 'cloud')
      cloud.setScrollFactor(0.1 + rand() * 0.3, 1)
    }

    this.updateProgress()
  }

  update() {
    if (this.levelComplete || this.isDead) return

    this.player.setVelocityX(this.speed)

    if (this.cursors?.up?.isDown || this.cursors?.space?.isDown) {
      this.jump()
    }

    const body = this.player.body as Phaser.Physics.Arcade.Body
    const onGround = body.blocked.down || body.touching.down
    if (onGround) {
      this.isJumping = false
      this.player.setTexture('player')
    }

    if (this.player.y > this.scale.height + 50) {
      this.die()
    }

    const checkpoint = Math.floor(this.player.x / 800) * 800
    if (checkpoint > 0 && checkpoint > this.lastCheckpointX) {
      this.lastCheckpointX = checkpoint
      this.respawnX = this.player.x
    }

    this.updateProgress()
  }

  jump() {
    const body = this.player.body as Phaser.Physics.Arcade.Body
    const onGround = body.blocked.down || body.touching.down
    if (!onGround || this.isJumping || this.levelComplete || this.isDead) return
    this.isJumping = true
    this.player.setVelocityY(JUMP_VEL)
    this.player.setTexture('player_jump')
  }

  die() {
    if (this.isDead) return
    this.isDead = true
    this.player.setVelocityX(0)
    this.player.setVelocityY(0)
    this.player.setTint(0xff0000)
    this.time.delayedCall(500, () => {
      this.isDead = false
      this.player.clearTint()
      this.player.setPosition(this.respawnX, this.groundY - 40)
      this.player.setVelocity(0, 0)
    })
  }

  collectHeart(heart: Phaser.Physics.Arcade.Sprite) {
    heart.destroy()
    this.heartsCollected++
    this.score++
    this.heartText.setText(`❤️ ${this.heartsCollected}`)
    this.tweens.add({
      targets: this.heartText,
      scaleX: 1.3,
      scaleY: 1.3,
      duration: 100,
      yoyo: true,
    })
  }

  completeLevel() {
    if (this.levelComplete) return
    this.levelComplete = true
    this.player.setVelocityX(0)
    this.player.setVelocityY(0)

    this.cameras.main.flash(300, 255, 215, 0)

    this.time.delayedCall(800, () => {
      const nextIndex = this.levelIndex + 1
      if (nextIndex >= levels.length) {
        this.scene.start('EndScene', { score: this.score })
      } else {
        this.scene.start('StoryScene', { levelIndex: nextIndex, score: this.score })
      }
    })
  }

  updateProgress() {
    const w = this.scale.width
    const h = this.scale.height
    const barH = 4
    const pad = 8
    const y = h - pad - barH
    const ratio = this.levelLength > 0 ? Phaser.Math.Clamp(this.player.x / this.levelLength, 0, 1) : 0

    this.progressBar.clear()
    this.progressBar.fillStyle(0x000000, 0.45)
    this.progressBar.fillRect(pad, y, w - pad * 2, barH)
    this.progressBar.fillStyle(0xe74c3c, 1)
    this.progressBar.fillRect(pad, y, (w - pad * 2) * ratio, barH)
  }
}
