import Phaser from 'phaser'

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' })
  }

  create(): void {
    const g = this.make.graphics({ x: 0, y: 0 }, false)

    // 1. tile_grass
    g.fillStyle(0x7cba5c, 1)
    g.fillRect(0, 0, 16, 16)
    g.fillStyle(0x6aaa4a, 1)
    g.fillRect(0, 4, 16, 1)
    g.fillRect(0, 8, 16, 1)
    g.fillRect(0, 12, 16, 1)
    g.generateTexture('tile_grass', 16, 16)
    g.clear()

    // 2. tile_wall
    g.fillStyle(0x555555, 1)
    g.fillRect(0, 0, 16, 16)
    g.fillStyle(0x666666, 1)
    g.fillRect(0, 0, 1, 16)
    g.fillRect(8, 0, 1, 16)
    g.fillRect(0, 0, 16, 1)
    g.fillRect(0, 8, 16, 1)
    g.fillStyle(0x777777, 1)
    g.fillRect(2, 2, 1, 1)
    g.generateTexture('tile_wall', 16, 16)
    g.clear()

    // 3. tile_water
    g.fillStyle(0x4a90d9, 1)
    g.fillRect(0, 0, 16, 16)
    g.fillStyle(0x6ab0f9, 1)
    g.fillRect(0, 5, 4, 2)
    g.fillRect(4, 6, 4, 2)
    g.fillRect(8, 5, 4, 2)
    g.fillRect(12, 6, 4, 2)
    g.generateTexture('tile_water', 16, 16)
    g.clear()

    // 4. tile_sand
    g.fillStyle(0xe8d5a3, 1)
    g.fillRect(0, 0, 16, 16)
    g.fillStyle(0xd4c090, 1)
    const sandDots: readonly [number, number][] = [
      [2, 3],
      [7, 11],
      [12, 5],
      [4, 9],
      [14, 2],
      [6, 14],
    ]
    for (const [sx, sy] of sandDots) {
      g.fillRect(sx, sy, 1, 1)
    }
    g.generateTexture('tile_sand', 16, 16)
    g.clear()

    // 5. tile_wood
    g.fillStyle(0xb8860b, 1)
    g.fillRect(0, 0, 16, 16)
    g.fillStyle(0xa07008, 1)
    g.fillRect(0, 3, 16, 1)
    g.fillRect(0, 7, 16, 1)
    g.fillRect(0, 11, 16, 1)
    g.generateTexture('tile_wood', 16, 16)
    g.clear()

    // 6. tile_road
    g.fillStyle(0x444444, 1)
    g.fillRect(0, 0, 16, 16)
    g.fillStyle(0xffd700, 1)
    g.fillRect(2, 7, 4, 2)
    g.fillRect(10, 7, 4, 2)
    g.generateTexture('tile_road', 16, 16)
    g.clear()

    // 7. tile_stone
    g.fillStyle(0xc4a97a, 1)
    g.fillRect(0, 0, 16, 16)
    g.fillStyle(0xd4b98a, 1)
    g.fillRect(0, 0, 1, 16)
    g.fillRect(8, 0, 1, 16)
    g.fillRect(0, 0, 16, 1)
    g.fillRect(0, 8, 16, 1)
    g.generateTexture('tile_stone', 16, 16)
    g.clear()

    // 8. tile_tree
    g.fillStyle(0x7cba5c, 1)
    g.fillRect(0, 0, 16, 16)
    g.fillStyle(0x6b4226, 1)
    g.fillRect(6, 8, 4, 4)
    g.fillStyle(0x2d7a2d, 1)
    g.fillCircle(8, 5, 5)
    g.generateTexture('tile_tree', 16, 16)
    g.clear()

    // 9. tile_exit_locked
    g.fillStyle(0x444444, 1)
    g.fillRect(0, 0, 16, 16)
    g.fillStyle(0x888888, 1)
    g.fillRect(5, 4, 6, 8)
    g.fillCircle(8, 4, 3)
    g.generateTexture('tile_exit_locked', 16, 16)
    g.clear()

    // 10. tile_exit_open
    g.fillStyle(0x4caf50, 1)
    g.fillRect(0, 0, 16, 16)
    g.fillStyle(0x66bb6a, 1)
    g.fillRect(4, 2, 8, 12)
    g.fillStyle(0x2e7d32, 1)
    g.beginPath()
    g.moveTo(12, 6)
    g.lineTo(8, 8)
    g.lineTo(12, 10)
    g.closePath()
    g.fillPath()
    g.generateTexture('tile_exit_open', 16, 16)
    g.clear()

    // 11. tile_snow
    g.fillStyle(0xf0f0f0, 1)
    g.fillRect(0, 0, 16, 16)
    g.fillStyle(0xe0e8f0, 1)
    const snowDots: readonly [number, number][] = [
      [3, 4],
      [10, 2],
      [6, 9],
      [13, 12],
      [1, 11],
      [8, 6],
    ]
    for (const [nx, ny] of snowDots) {
      g.fillRect(nx, ny, 1, 1)
    }
    g.generateTexture('tile_snow', 16, 16)
    g.clear()

    // 12. player_down
    g.fillStyle(0xffd5b8, 1)
    g.fillCircle(8, 5, 4)
    g.fillStyle(0x4a3728, 1)
    g.fillRect(4, 1, 8, 3)
    g.fillStyle(0xe74c3c, 1)
    g.fillRect(4, 8, 8, 6)
    g.fillStyle(0x333333, 1)
    g.fillRect(5, 14, 2, 2)
    g.fillRect(9, 14, 2, 2)
    g.generateTexture('player_down', 16, 16)
    g.clear()

    // 13. player_up
    g.fillStyle(0x4a3728, 1)
    g.fillCircle(8, 5, 4)
    g.fillStyle(0xe74c3c, 1)
    g.fillRect(4, 8, 8, 6)
    g.fillStyle(0x333333, 1)
    g.fillRect(5, 14, 2, 2)
    g.fillRect(9, 14, 2, 2)
    g.generateTexture('player_up', 16, 16)
    g.clear()

    // 14. player_left
    g.fillStyle(0xffd5b8, 1)
    g.fillCircle(7, 5, 4)
    g.fillStyle(0x4a3728, 1)
    g.fillRect(10, 2, 4, 5)
    g.fillStyle(0xe74c3c, 1)
    g.fillRect(4, 8, 7, 6)
    g.fillStyle(0x333333, 1)
    g.fillRect(5, 14, 2, 2)
    g.fillRect(8, 14, 2, 2)
    g.generateTexture('player_left', 16, 16)
    g.clear()

    // 15. player_right
    g.fillStyle(0xffd5b8, 1)
    g.fillCircle(9, 5, 4)
    g.fillStyle(0x4a3728, 1)
    g.fillRect(2, 2, 4, 5)
    g.fillStyle(0xe74c3c, 1)
    g.fillRect(5, 8, 7, 6)
    g.fillStyle(0x333333, 1)
    g.fillRect(6, 14, 2, 2)
    g.fillRect(9, 14, 2, 2)
    g.generateTexture('player_right', 16, 16)
    g.clear()

    // 16. interact_glow
    g.lineStyle(2, 0xffd700, 0.8)
    g.strokeCircle(12, 12, 10)
    g.generateTexture('interact_glow', 24, 24)
    g.clear()

    // 17. heart
    g.fillStyle(0xe74c3c, 1)
    g.fillCircle(3, 3, 3)
    g.fillCircle(9, 3, 3)
    g.beginPath()
    g.moveTo(0, 4)
    g.lineTo(6, 11)
    g.lineTo(12, 4)
    g.closePath()
    g.fillPath()
    g.generateTexture('heart', 12, 12)
    g.clear()

    // 18. joystick_base
    g.fillStyle(0x000000, 0.2)
    g.fillCircle(40, 40, 38)
    g.lineStyle(2, 0xffffff, 0.3)
    g.strokeCircle(40, 40, 38)
    g.generateTexture('joystick_base', 80, 80)
    g.clear()

    // 19. joystick_thumb
    g.fillStyle(0xffffff, 0.4)
    g.fillCircle(20, 20, 18)
    g.generateTexture('joystick_thumb', 40, 40)
    g.clear()

    g.destroy()
    this.scene.start('MenuScene')
  }
}
