import Phaser from 'phaser'
import levels, { type InteractiveObject } from '../levels'

const TILE = 16
const MAP_ROWS = 12
const MAP_COLS = 16
const PLAYER_SPEED = 100

type InteractEntry = {
  sprite: Phaser.GameObjects.Text
  glow: Phaser.GameObjects.Image
  data: InteractiveObject
  found: boolean
}

function tileTextureForValue(value: number): string {
  switch (value) {
    case 0:
      return 'tile_grass'
    case 1:
      return 'tile_wall'
    case 2:
      return 'tile_water'
    case 3:
      return 'tile_sand'
    case 4:
      return 'tile_wood'
    case 5:
      return 'tile_road'
    case 6:
      return 'tile_stone'
    case 7:
      return 'tile_tree'
    case 8:
      return 'tile_exit_locked'
    case 9:
      return 'tile_snow'
    default:
      return 'tile_grass'
  }
}

export default class ExploreScene extends Phaser.Scene {
  levelIndex = 0
  score = 0
  player!: Phaser.GameObjects.Image
  cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined
  foundCount = 0
  totalObjects = 0
  dialogActive = false
  exitOpen = false

  joystickBase!: Phaser.GameObjects.Image
  joystickThumb!: Phaser.GameObjects.Image
  joystickPointer: Phaser.Input.Pointer | null = null

  interactObjects: InteractEntry[] = []

  dialogBox: Phaser.GameObjects.Graphics | null = null
  dialogText: Phaser.GameObjects.Text | null = null
  dialogEmoji: Phaser.GameObjects.Text | null = null
  dialogHint: Phaser.GameObjects.Text | null = null
  dialogCloseListener: (() => void) | null = null

  exitSprite!: Phaser.GameObjects.Image
  hudText!: Phaser.GameObjects.Text
  foundText!: Phaser.GameObjects.Text

  proximityHint!: Phaser.GameObjects.Text

  private levelCompleting = false

  constructor() {
    super({ key: 'ExploreScene' })
  }

  init(data: { levelIndex?: number; score?: number }): void {
    this.levelIndex = data.levelIndex ?? 0
    this.score = data.score ?? 0
    this.foundCount = 0
    this.dialogActive = false
    this.exitOpen = false
    this.levelCompleting = false
  }

  create(): void {
    const level = levels[this.levelIndex]
    if (!level) {
      this.scene.start('EndScene', { score: this.score })
      return
    }

    this.totalObjects = level.objects.length
    this.cameras.main.setBackgroundColor(level.skyColor)

    for (let row = 0; row < MAP_ROWS; row++) {
      for (let col = 0; col < MAP_COLS; col++) {
        const value = level.map[row]![col]!
        const key = tileTextureForValue(value)
        const x = col * TILE + TILE / 2
        const y = row * TILE + TILE / 2
        this.add.image(x, y, key)
      }
    }

    this.interactObjects = []
    for (const obj of level.objects) {
      const ox = obj.x * TILE + TILE / 2
      const oy = obj.y * TILE + TILE / 2
      const sprite = this.add
        .text(ox, oy, obj.emoji, { fontSize: '14px' })
        .setOrigin(0.5, 0.5)
      const found = obj.found ?? false
      const glow = this.add.image(ox, oy, 'interact_glow').setScale(0.8).setAlpha(0.6)
      if (!found) {
        this.tweens.add({
          targets: glow,
          scaleX: 1.0,
          scaleY: 1.0,
          alpha: 1.0,
          duration: 800,
          yoyo: true,
          repeat: -1,
        })
      }
      this.interactObjects.push({
        sprite,
        glow,
        data: obj,
        found,
      })
    }

    for (const entry of this.interactObjects) {
      if (entry.found) {
        entry.glow.destroy()
        entry.sprite.setAlpha(0.4)
      }
    }

    this.foundCount = this.interactObjects.filter((e) => e.found).length

    this.exitSprite = this.add.image(
      level.exitX * TILE + TILE / 2,
      level.exitY * TILE + TILE / 2,
      'tile_exit_locked',
    )
    if (this.totalObjects === 0 || this.foundCount >= this.totalObjects) {
      this.exitOpen = true
      this.exitSprite.setTexture('tile_exit_open')
    }

    this.player = this.add
      .image(level.spawnX * TILE + TILE / 2, level.spawnY * TILE + TILE / 2, 'player_down')
      .setDepth(10)

    this.joystickBase = this.add
      .image(70, this.scale.height - 70, 'joystick_base')
      .setScrollFactor(0)
      .setDepth(50)
      .setAlpha(0.6)
    this.joystickThumb = this.add
      .image(70, this.scale.height - 70, 'joystick_thumb')
      .setScrollFactor(0)
      .setDepth(51)
      .setAlpha(0.6)
    this.joystickPointer = null

    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (pointer.x < this.scale.width / 2) {
        this.joystickPointer = pointer
      } else {
        this.tryInteract()
      }
    })
    this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
      if (this.joystickPointer === pointer) {
        this.joystickPointer = null
        this.joystickThumb.setPosition(this.joystickBase.x, this.joystickBase.y)
      }
    })

    this.cursors = this.input.keyboard?.createCursorKeys()
    this.input.keyboard?.on('keydown-SPACE', () => {
      this.tryInteract()
    })
    this.input.keyboard?.on('keydown-ENTER', () => {
      this.tryInteract()
    })

    this.hudText = this.add
      .text(12, 12, `AY ${level.month} — ${level.city}`, {
        fontFamily: '"Press Start 2P", monospace',
        fontSize: '8px',
        color: '#ffffff',
      })
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setDepth(100)

    this.foundText = this.add
      .text(this.scale.width - 12, 12, `❤️ ${this.foundCount} / ${this.totalObjects}`, {
        fontFamily: '"Press Start 2P", monospace',
        fontSize: '8px',
        color: '#ffffff',
      })
      .setOrigin(1, 0)
      .setScrollFactor(0)
      .setDepth(100)

    this.proximityHint = this.add
      .text(0, 0, '!', {
        fontFamily: '"Press Start 2P", monospace',
        fontSize: '10px',
        color: '#f1c40f',
      })
      .setOrigin(0.5, 1)
      .setDepth(11)
      .setAlpha(0)

    const mapW = MAP_COLS * TILE
    const mapH = MAP_ROWS * TILE
    this.cameras.main.centerOn(mapW / 2, mapH / 2)

    const introEmoji = this.add
      .text(this.scale.width / 2, this.scale.height / 2 - 24, level.emoji, {
        fontSize: '56px',
      })
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(120)
    const introTitle = this.add
      .text(this.scale.width / 2, this.scale.height / 2 + 40, `AY ${level.month}: ${level.title}`, {
        fontFamily: '"Press Start 2P", monospace',
        fontSize: '12px',
        color: '#ffffff',
        align: 'center',
        wordWrap: { width: this.scale.width - 32 },
      })
      .setOrigin(0.5)
      .setScrollFactor(0)
      .setDepth(120)

    this.time.delayedCall(2000, () => {
      this.tweens.add({
        targets: [introEmoji, introTitle],
        alpha: 0,
        duration: 400,
        onComplete: () => {
          introEmoji.destroy()
          introTitle.destroy()
        },
      })
    })
  }

  update(): void {
    if (this.dialogActive) return

    let dx = 0
    let dy = 0
    const speed = PLAYER_SPEED

    if (this.cursors?.left?.isDown) dx = -1
    else if (this.cursors?.right?.isDown) dx = 1
    if (this.cursors?.up?.isDown) dy = -1
    else if (this.cursors?.down?.isDown) dy = 1

    if (this.joystickPointer && this.joystickPointer.isDown) {
      const jx = this.joystickPointer.x - this.joystickBase.x
      const jy = this.joystickPointer.y - this.joystickBase.y
      const dist = Math.sqrt(jx * jx + jy * jy)
      const maxDist = 35

      const clampDist = Math.min(dist, maxDist)
      const angle = Math.atan2(jy, jx)
      this.joystickThumb.setPosition(
        this.joystickBase.x + Math.cos(angle) * clampDist,
        this.joystickBase.y + Math.sin(angle) * clampDist,
      )

      if (dist > 10) {
        dx = Math.cos(angle)
        dy = Math.sin(angle)
      }
    }

    if (dx !== 0 && dy !== 0) {
      const len = Math.sqrt(dx * dx + dy * dy)
      dx /= len
      dy /= len
    }

    const delta = this.game.loop.delta / 1000
    const newX = this.player.x + dx * speed * delta
    const newY = this.player.y + dy * speed * delta

    if (this.canWalk(newX, this.player.y)) this.player.x = newX
    if (this.canWalk(this.player.x, newY)) this.player.y = newY

    if (Math.abs(dx) > Math.abs(dy)) {
      this.player.setTexture(dx > 0 ? 'player_right' : 'player_left')
    } else if (dy !== 0) {
      this.player.setTexture(dy > 0 ? 'player_down' : 'player_up')
    }

    let showHint = false
    let hintX = this.player.x
    let hintY = this.player.y - TILE * 0.9
    for (const entry of this.interactObjects) {
      if (entry.found) continue
      const d = Phaser.Math.Distance.Between(this.player.x, this.player.y, entry.sprite.x, entry.sprite.y)
      if (d < TILE * 1.5) {
        showHint = true
        hintX = entry.sprite.x
        hintY = entry.sprite.y - TILE * 0.75
        break
      }
    }
    if (showHint) {
      this.proximityHint.setPosition(hintX, hintY)
      this.proximityHint.setAlpha(0.85)
    } else {
      this.proximityHint.setAlpha(0)
    }

    if (this.exitOpen && !this.levelCompleting) {
      const levelNow = levels[this.levelIndex]
      if (levelNow) {
        const pc = Math.floor(this.player.x / TILE)
        const pr = Math.floor(this.player.y / TILE)
        if (pc === levelNow.exitX && pr === levelNow.exitY) {
          this.levelCompleting = true
          this.completeLevel()
        }
      }
    }
  }

  canWalk(px: number, py: number): boolean {
    const half = 5
    const checks: [number, number][] = [
      [px - half, py - half],
      [px + half, py - half],
      [px - half, py + half],
      [px + half, py + half],
    ]
    const level = levels[this.levelIndex]
    if (!level) return false
    const walkable = new Set([0, 3, 4, 5, 6, 8, 9])
    for (const [cx, cy] of checks) {
      const col = Math.floor(cx / TILE)
      const row = Math.floor(cy / TILE)
      if (row < 0 || row >= 12 || col < 0 || col >= 16) return false
      if (!walkable.has(level.map[row]![col]!)) return false
    }
    return true
  }

  tryInteract(): void {
    if (this.dialogActive) return
    if (this.levelCompleting) return
    const level = levels[this.levelIndex]
    if (!level) return

    let nearest: InteractEntry | null = null
    let bestDist = TILE * 2 + 1

    for (const entry of this.interactObjects) {
      if (entry.found) continue
      const d = Phaser.Math.Distance.Between(this.player.x, this.player.y, entry.sprite.x, entry.sprite.y)
      if (d <= TILE * 2 && d < bestDist) {
        bestDist = d
        nearest = entry
      }
    }

    if (!nearest) return

    nearest.found = true
    this.foundCount++
    this.foundText.setText(`❤️ ${this.foundCount} / ${this.totalObjects}`)
    nearest.glow.destroy()
    nearest.sprite.setAlpha(0.4)
    this.showDialog(nearest.data.emoji, nearest.data.text)

    if (this.foundCount === this.totalObjects) {
      this.exitOpen = true
      this.exitSprite.setTexture('tile_exit_open')
      const cx = this.scale.width / 2
      const cy = this.scale.height * 0.35
      const unlockMsg = this.add
        .text(cx, cy, 'Çıkış açıldı!', {
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '10px',
          color: '#2ecc71',
        })
        .setOrigin(0.5)
        .setScrollFactor(0)
        .setDepth(150)
      this.tweens.add({
        targets: unlockMsg,
        alpha: 0,
        delay: 1200,
        duration: 500,
        onComplete: () => unlockMsg.destroy(),
      })
    }
  }

  showDialog(emoji: string, text: string): void {
    this.dialogActive = true

    const w = this.scale.width
    const h = this.scale.height
    const panelH = Math.min(220, h * 0.42)
    const panelY = h - panelH - 8
    const panelX = 12
    const panelW = w - 24
    const radius = 12

    const g = this.add.graphics()
    g.fillStyle(0x000000, 0.85)
    g.fillRoundedRect(panelX, panelY, panelW, panelH, radius)
    g.setScrollFactor(0)
    g.setDepth(200)
    this.dialogBox = g

    this.dialogEmoji = this.add
      .text(panelX + 36, panelY + panelH / 2, emoji, { fontSize: '42px' })
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0)
      .setDepth(201)

    this.dialogText = this.add
      .text(panelX + 88, panelY + 24, text, {
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontSize: '15px',
        color: '#ffffff',
        wordWrap: { width: panelW - 100 },
        lineSpacing: 4,
      })
      .setOrigin(0, 0)
      .setScrollFactor(0)
      .setDepth(201)

    this.dialogHint = this.add
      .text(w / 2, panelY + panelH - 18, 'Dokunarak kapat', {
        fontFamily: '"Press Start 2P", monospace',
        fontSize: '8px',
        color: '#aaaaaa',
      })
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0)
      .setDepth(201)
      .setAlpha(0.5)

    const closeDialog = () => {
      this.dialogBox?.destroy()
      this.dialogText?.destroy()
      this.dialogEmoji?.destroy()
      this.dialogHint?.destroy()
      this.dialogBox = null
      this.dialogText = null
      this.dialogEmoji = null
      this.dialogHint = null
      const fn = this.dialogCloseListener
      if (fn) {
        this.input.off('pointerdown', fn)
        this.dialogCloseListener = null
      }
      this.dialogActive = false
    }

    this.dialogCloseListener = closeDialog
    this.time.delayedCall(80, () => {
      if (this.dialogCloseListener) {
        this.input.on('pointerdown', this.dialogCloseListener)
      }
    })
  }

  completeLevel(): void {
    const nextIndex = this.levelIndex + 1
    if (nextIndex >= levels.length) {
      this.scene.start('EndScene', { score: this.score })
    } else {
      this.scene.start('StoryScene', { levelIndex: nextIndex, score: this.score })
    }
  }
}
