import { GameMap } from "../../scenes/gameMap";
import calculateGridPosition from "../../utils/Map/grid";
import { drawCursor } from "../../utils/Map/grid";
import { playSFX } from "../../utils/Music/sfx";

let u_exist = false;

/*custom methods*/
let prevx = 0;
let prevy = 0;

export function mouseBehavior(scene: GameMap): void {
  scene.input.on("pointerup", (e: Phaser.Input.Pointer) => {
    if (e.button === 0) {
      let { x, y } = e.position;
      let { gridMoveX, gridMoveY } = calculateGridPosition(x, y);
      let unit_x = gridMoveX * 32 + 16;
      let unit_y = gridMoveY * 32 + 16;

      console.log(unit_x, unit_y);
      if (!u_exist) {
        let unit = scene.add.sprite(unit_x, unit_y, "idle");
        unit.setScale(2);
        unit.play("idle");
        scene.units.push(unit);
        console.log("Unit created at position:", unit_x, unit_y);
        u_exist = true;
      }
    }
  });
  scene.input.on("pointermove", (e: any) => {
    cursorPosition(e, scene.sprite, scene);
    let { x, y } = e.position;
    let { gridMoveX, gridMoveY } = calculateGridPosition(x, y);
    let unit_x = gridMoveX * 32 + 16;
    let unit_y = gridMoveY * 32 + 16;

    drawCursor(scene, unit_x, unit_y);

    scene.units.forEach((unit: Phaser.GameObjects.Sprite) => {
      if (unit.x === unit_x && unit.y === unit_y) {
        console.log("Unit already exists at this position");
        u_exist = true;
      } else {
        u_exist = false;
      }
    });
  });
}

function cursorPosition(
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
