import calculateGridPosition from "../../utils/Map/grid";
import { playSFX } from "../../utils/Music/sfx";
/*custom methods*/
let prevx = 0;
let prevy = 0;
export function cursorPosition(
  { x, y }: Phaser.Input.Pointer,
  sprite: Phaser.Tilemaps.Tilemap,
  scene: Phaser.Scene
): void {
  let { gridMoveX, gridMoveY } = calculateGridPosition(x, y);

  if (sprite === undefined) {
    if (prevx === gridMoveX && prevy === gridMoveY) {
      return;
    } else {
      console.log(`gridMoveX:${gridMoveX}, gridMoveY:${gridMoveY}`);
      playSFX(scene, "cursor_sfx", {
        volume: 0.1,
        rate: 1.0, // Velocidad de reproducción
        detune: 0, // Afinación
        loop: false, // Para efectos
        delay: 0, // Retraso en milisegundos
      });
    }

    prevy = gridMoveY;
    prevx = gridMoveX;

    // this.add.sprite()
    // this.sprite = this.map.grid.copy(7, 9, 1, 1, gridMoveX, gridMoveY, undefined, "World")

    // this.text = this.make.text({ text: "hola mundo", x, y, style: { color: "black" } })
    // this.sprite = this.add.rectangle(gridMoveX, gridMoveY, 16, 16, 12)
  } else {
    console.log("xd");
    // console.log(this.sprite)

    // this.sprite.setDisplayOrigin(gridMoveX, gridMoveY)
    // this.sprite.x = gridMoveX;
    // this.sprite.y = gridMoveY;
  }
}
