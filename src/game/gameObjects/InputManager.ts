import { MenuScene } from "../scenes/menu-scene";

import { cursorPosition } from "./Periferics/MouseEvents";
import calculateGridPosition from "../utils/Map/grid";
// import { calculateGridPosition } from "./Periferics/KeyboardEvents";
let u_exist = false;
export default function inputHandler(scene: MenuScene): void {
  scene.input.keyboard.addKeys("UP,DOWN,RIGHT,LEFT");
  scene.input.keyboard.on("keydown-A", () => {
    console.log("A presionado");
  });
  scene.input.keyboard.on("keydown-LEFT", () => {
    console.log("LEFT presionado");
    scene.character.pixelX -= 16;
  });
  scene.input.keyboard.on("keydown-RIGHT", () => {
    console.log("RIGHT presionado");
    scene.character.pixelX += 16;
  });
  scene.input.keyboard.on("keydown-UP", () => {
    console.log("UP presionado");
    scene.character.pixelY -= 16;
  });
  scene.input.keyboard.on("keydown-DOWN", () => {
    console.log("UP presionado");
    scene.character.pixelY += 16;
  });
  scene.input.on("pointerdown", (e: any) => {
    if (e.button === 0) {
      // let { x, y } = e.position;
      // let { gridMoveX, gridMoveY } = this.calculateGridPosition(x, y)
      // console.log("left clickdown", e);
      // console.log(this);
      // let copyTile = this.map.grid.copy(7, 9, 1, 1, gridMoveX, gridMoveY, undefined, "World");
    }
  });
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
    cursorPosition(e, scene.sprite);
    let { x, y } = e.position;
    let { gridMoveX, gridMoveY } = calculateGridPosition(x, y);
    let unit_x = gridMoveX * 32 + 16;
    let unit_y = gridMoveY * 32 + 16;

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
